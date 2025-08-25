# Adding a new blog post

1. Create a folder for the post
   - Path: `blog/<slug>/index.html`
   - Follow slug rules in `docs/blog-slugging.md`

2. Build the HTML page
   - Use classes from `index.html` (`.blog-post-item`, `.blog-details`, etc.)
   - Include a back link to `../../index.html`
   - Add per-post SEO: title, description, canonical, JSON-LD

3. Add images (if any)
   - Place under `assets/images/Blogs/...`
   - Reference with relative paths from the post folder

4. Update the manifest
   - Edit `assets/data/posts.json`
   - Fields: `slug`, `title`, `category`, `banner`, `dateISO`, `dateText`, `description`

5. Update discovery files (manual)
   - `sitemap.xml`
     - Add a `<url>` entry for `/blog/<slug>/`.
     - Include `<lastmod>` in `YYYY-MM-DD` format (publish date).
   - `feed.xml` (RSS)
     - Add an `<item>` with: `<title>`, `<link>/blog/<slug>/</link>`, `<guid isPermaLink="true">/blog/<slug>/</guid>`, `<pubDate>` (RFC‑822), and a short `<description>`.
   - `robots.txt`
     - Already points to `/sitemap.xml`; no change normally required.

6. Test locally
   - Direct load: open `blog/<slug>/index.html`
   - Index behavior: open `index.html`, ensure card still displays correctly
   - Validate: links open correctly, images render, metadata present

Notes
- Do not change slugs after publishing; add redirects if necessary.
- Keep content semantics and class names consistent to avoid CSS regressions.
- The homepage consumes `assets/data/posts.json` for cards and SPA metadata.
- Search engines and RSS readers consume `sitemap.xml` and `feed.xml` respectively.
