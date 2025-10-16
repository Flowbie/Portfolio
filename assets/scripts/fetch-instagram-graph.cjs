#!/usr/bin/env node
import fs from "fs";
import path from "path";
import fetch from "node-fetch";

const IG_USER_ID = process.env.IG_USER_ID;
const APP_ID = process.env.FB_APP_ID;
const APP_SECRET = process.env.FB_APP_SECRET;
let ACCESS_TOKEN = process.env.FB_PAGE_TOKEN; // Fallback if no cache

const CACHE_PATH = path.resolve("assets/.cache/ig_token.json");

// Load cached token if available
if (fs.existsSync(CACHE_PATH)) {
  try {
    const data = JSON.parse(fs.readFileSync(CACHE_PATH, "utf8"));
    if (data.access_token) ACCESS_TOKEN = data.access_token;
  } catch (err) {
    console.warn("Warning: Unable to parse cached token file.", err);
  }
}

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
    return fetchInstagram(); // Retry once after refresh
  }

  if (json.error) {
    throw new Error(JSON.stringify(json.error));
  }

  fs.mkdirSync("assets/data", { recursive: true });
  fs.writeFileSync("assets/data/instagram.json", JSON.stringify(json, null, 2));
  console.log("Instagram data saved to assets/data/instagram.json");
}

fetchInstagram().catch((err) => {
  console.error("Error:", err.message || err);
  process.exit(1);
});
