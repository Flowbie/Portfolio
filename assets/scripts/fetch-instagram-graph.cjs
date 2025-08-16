// scripts/fetch-instagram-graph.cjs
const fs = require('fs').promises;
const path = require('path');

const PAGE_TOKEN = process.env.FB_PAGE_TOKEN;
const IG_USER_ID = process.env.IG_USER_ID;

if (!PAGE_TOKEN || !IG_USER_ID) {
  console.error('Missing FB_PAGE_TOKEN or IG_USER_ID');
  process.exit(1);
}

const FIELDS = 'id,caption,media_type,media_url,thumbnail_url,permalink,children{media_type,media_url}';

async function run() {
  const url = `https://graph.facebook.com/v20.0/${IG_USER_ID}/media?fields=${encodeURIComponent(FIELDS)}&limit=1&access_token=${PAGE_TOKEN}`;
  const resp = await fetch(url);
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Graph ${resp.status}: ${text}`);
  }
  const json = await resp.json();
  const item = json?.data?.[0];

  const payload = item ? {
    caption: item.caption || '',
    permalink: item.permalink || '',
    media: (item.media_type === 'CAROUSEL_ALBUM' && item.children?.data?.length)
      ? item.children.data.map(c => ({
          type: c.media_type === 'VIDEO' ? 'video' : 'image',
          url: c.media_url || item.thumbnail_url
        }))
      : [{
          type: item.media_type === 'VIDEO' ? 'video' : 'image',
          url: item.media_url || item.thumbnail_url
        }]
  } : { caption: '', permalink: '', media: [] };

  const outPath = path.join('assets', 'data', 'instagram.json');
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, JSON.stringify(payload, null, 2));
  console.log('Wrote', outPath);
}

run().catch(e => { console.error(e); process.exit(1); });
