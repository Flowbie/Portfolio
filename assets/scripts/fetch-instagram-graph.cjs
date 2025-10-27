#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const sodium = require("libsodium-wrappers");

const IG_USER_ID = process.env.IG_USER_ID;
const APP_ID = process.env.FB_APP_ID;
const APP_SECRET = process.env.FB_APP_SECRET;
let ACCESS_TOKEN = process.env.FB_PAGE_TOKEN;

// Secret-rotation env
const GH_TOKEN = process.env.GH_SECRETS_TOKEN; // PAT with repo scope
const GH_REPO = process.env.GITHUB_REPOSITORY; // e.g. "Flowbie/Portfolio" (provided by Actions)
const SECRET_NAME = process.env.ROTATE_SECRET_NAME || "FB_PAGE_TOKEN";

const CACHE_PATH = path.resolve("assets/.cache/ig_token.json");

// Load cached token if available (runtime only)
if (fs.existsSync(CACHE_PATH)) {
  try {
    const data = JSON.parse(fs.readFileSync(CACHE_PATH, "utf8"));
    if (data.access_token) ACCESS_TOKEN = data.access_token;
  } catch (err) {
    console.warn("Warning: unable to parse cached token file.", err);
  }
}

// ---------------- GitHub Secret rotation helpers ----------------
async function getRepoPublicKey() {
  const url = `https://api.github.com/repos/${GH_REPO}/actions/secrets/public-key`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${GH_TOKEN}`,
      "User-Agent": "token-rotator",
      "X-GitHub-Api-Version": "2022-11-28",
      Accept: "application/vnd.github+json",
    },
  });
  if (!res.ok) throw new Error(`Failed to fetch repo public key: ${res.status} ${await res.text()}`);
  return res.json(); // { key, key_id }
}

// libsodium sealed box encryption
async function encryptForGitHub(publicKeyBase64, secretValue) {
  await sodium.ready;
  const publicKey = Buffer.from(publicKeyBase64, "base64");
  const messageBytes = Buffer.from(secretValue);
  const sealed = sodium.seal(messageBytes, publicKey);
  return Buffer.from(sealed).toString("base64");
}

async function putRepoSecret(secretName, encryptedValue, keyId) {
  const url = `https://api.github.com/repos/${GH_REPO}/actions/secrets/${encodeURIComponent(secretName)}`;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${GH_TOKEN}`,
      "User-Agent": "token-rotator",
      "X-GitHub-Api-Version": "2022-11-28",
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ encrypted_value: encryptedValue, key_id: keyId }),
  });
  if (!res.ok) throw new Error(`Failed to update secret ${secretName}: ${res.status} ${await res.text()}`);
}

async function rotateSecretIfConfigured(newToken) {
  if (!GH_TOKEN || !GH_REPO) {
    console.log("Secret rotation skipped (GH_SECRETS_TOKEN or GITHUB_REPOSITORY not set).");
    return;
  }
  const { key, key_id } = await getRepoPublicKey();
  const encrypted = await encryptForGitHub(key, newToken);
  await putRepoSecret(SECRET_NAME, encrypted, key_id);
  console.log(`Updated GitHub secret '${SECRET_NAME}' for ${GH_REPO}.`);
}
// ----------------------------------------------------------------

async function refreshToken() {
  const url = `https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${APP_ID}&client_secret=${APP_SECRET}&fb_exchange_token=${ACCESS_TOKEN}`;
  console.log("Refreshing long-lived token...");
  const res = await fetch(url);
  const json = await res.json();

  if (json.access_token) {
    fs.mkdirSync(path.dirname(CACHE_PATH), { recursive: true });
    fs.writeFileSync(CACHE_PATH, JSON.stringify(json, null, 2));
    ACCESS_TOKEN = json.access_token;
    console.log("Token refreshed and cached successfully.");
    // NEW: write back to GitHub Secrets so next runs start with the fresh token
    await rotateSecretIfConfigured(ACCESS_TOKEN);
    console.log(`New token saved at: ${new Date().toISOString()}`);
  } else {
    console.error("Failed to refresh token:", json);
    throw new Error("Token refresh failed.");
  }
}

async function fetchInstagram() {
  const url = `https://graph.facebook.com/v21.0/${IG_USER_ID}/media?fields=id,caption,media_url,permalink,timestamp&access_token=${ACCESS_TOKEN}`;
  const res = await fetch(url);
  const json = await res.json();

  // If token expired, refresh and retry once
  if (json.error && json.error.code === 190) {
    console.log("Access token expired. Attempting refresh...");
    await refreshToken();
    return fetchInstagram();
  }

  if (json.error) throw new Error(JSON.stringify(json.error));

  fs.mkdirSync("assets/data", { recursive: true });
  fs.writeFileSync("assets/data/instagram.json", JSON.stringify(json, null, 2));
  console.log("Instagram data saved to assets/data/instagram.json");
}

fetchInstagram().catch((err) => {
  console.error("Error:", err.message || err);
  process.exit(1);
});
