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

5. Test locally
   - Direct load: open `blog/<slug>/index.html`
   - Index behavior: open `index.html`, ensure card still displays correctly

Notes
- Do not change slugs after publishing; add redirects if necessary.
- Keep content semantics and class names consistent to avoid CSS regressions.
