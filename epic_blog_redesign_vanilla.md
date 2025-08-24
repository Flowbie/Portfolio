# 🚀 Epic: Modular SEO‑Friendly Blog Redesign (Vanilla JavaScript)

**Goal:** Transition the blog from a single hidden/revealed content structure into a modular, per‑post page system that improves SEO, shareability, and analytics while maintaining smooth SPA‑like UX with the History API. Keep in mind site will be hosted with Github Pages so always adhere to best practices to keep site functional.

---

## 📦 Scope (Vanilla JS Only)
- No frameworks (no Next.js).  
- Static files served by any web server or GitHub Pages.  
- Uses `history.pushState`, `popstate`, and `fetch` to load posts.  
- Each post has its own real URL at `/blog/[slug]/` with an `index.html`.  
- Index can open posts in-place (instant) **and** direct loads to `/blog/[slug]/` fully render the page.

---

## ✅ Definition of Done (Epic)
- Each post is accessible at a unique URL (`/blog/[slug]/`).  
- Index renders from a manifest (`assets/data/posts.json`) and supports client‑side navigation with `pushState`.  
- Direct navigation to `/blog/[slug]/` works with full HTML (no reliance on index).  
- Per‑post SEO meta tags + JSON‑LD schema exist.  
- `sitemap.xml` and RSS/Atom feed include all posts.  
- Analytics track per‑URL pageviews.  
- Back/forward buttons behave correctly (`popstate`).  
- JS‑off fallback: index links to the standalone post page.

---

## Sprint 1: Foundations & Architecture
- [x] **Story 1.1: Define blog URL strategy**
  - [x] Decide on canonical pattern: `/blog/[slug]/`.
  - [x] Document slug rules: lowercase, hyphenated, ASCII only, frozen once published.
  - [x] Store rules in `docs/blog-slugging.md`.

- [x] **Story 1.2: Create per‑post folder structure**
  - [x] Add directory for posts: `/blog/<slug>/index.html` (public build output) or `/posts/<slug>/index.html` (source).
  - [x] Move one existing post (Ho’onani Hou) as a test post to `/blog/hoonanihou/index.html`.
  - [x] Ensure the post HTML uses your existing classes (`.blog-details`, etc.).

- [x] **Story 1.3: Implement manifest / metadata handling**
  - [x] Create `assets/data/posts.json` with fields: `slug`, `title`, `category`, `banner`, `dateISO`, `dateText`, `description`.
  - [x] Validate all banners resolve to correct paths.
  - [x] Add a short README describing how to add a new post (update JSON + add folder).

---

## Sprint 2: Rendering & Navigation
- [x] **Story 2.1: Render blog index dynamically**
  - [x] Replace hard‑coded <li> items with <ul class="blog-posts-list" data-blog-list></ul>.
  - [x] Load assets/data/posts.json via fetch, render cards with same .blog-post-item structure.
  - [x] Preserve existing CSS classes so styling is unchanged.

- [x] **Story 2.2: Implement client‑side navigation (pushState)**
  - [x] On card click, call history.pushState({}, '', '/blog/[slug]/').
  - [x] Lazy‑load the corresponding post HTML ('/blog/[slug]/index.html') and inject into .blog-details.
  - [x] Show back button and hide other cards (preserve your current behavior).
  - [x] On popstate, restore the index or show the appropriate post depending on location.pathname.

- [x] **Story 2.3: Support direct load of standalone pages**
  - [x] If `location.pathname` matches `/blog/:slug/`, render the post page in full (no index dependency).
  - [x] Include a link back to the main blog index.
  - [x] Ensure internal links open in new tabs where appropriate (re-apply after dynamic inject).

---

## Sprint 3: SEO & Metadata
- [x] **Story 3.1: Add per‑post head metadata**
  - [x] Unique <title> and <meta name="description"> per post.
  - [x] <link rel="canonical" href="…"> per post (root‑relative).
  - [x] Set language and charset appropriately.

- [x] **Story 3.2: Social sharing tags**
  - [x] Open Graph: og:title, og:description, og:image, og:url (root‑relative).
  - [x] Twitter Card: twitter:card, twitter:title, twitter:description, twitter:image.
  - [x] Verify previews via social debuggers.

- [x] **Story 3.3: Structured data (JSON‑LD)**
  - [x] Add Article schema with headline, datePublished, dateModified, author, image, mainEntityOfPage.
  - [x] Validate in Google Rich Results Test.

---

## Sprint 4: Analytics & Feeds
- [x] **Story 4.1: Analytics per post**
  - [x] Ensure pageviews fire per unique URL.
  - [x] Optional: custom event when opening post in-place from index.

- [x] **Story 4.2: Generate sitemap**
  - [x] Add static `sitemap.xml` including all `/blog/[slug]/` URLs with `<lastmod>`.
  - [x] Reference it in `robots.txt` and submit in Search Console.

- [x] **Story 4.3: RSS/Atom feed**
  - [x] Add `/feed.xml` (RSS) with `title`, `link`, `pubDate`, `description`, and per‑item GUIDs.
  - [x] Validate with an RSS/Atom validator.

---

## Sprint 5: Enhancements & Polish
- [ ] **Story 5.1: Prefetch on hover (optional)**
  - [ ] On mouseenter, `fetch('/blog/[slug]/index.html')` to warm cache.

- [ ] **Story 5.2: Progressive enhancement fallback**
  - [ ] Index cards have `<a href="/blog/[slug]/">` so JS‑off users navigate to the standalone page.
  - [ ] JS intercepts the click to use `pushState` for in‑place display.

- [ ] **Story 5.3: Backward compatibility**
  - [ ] If any legacy paths exist, add `<meta http-equiv="refresh">` or server‑side 301s to `/blog/[slug]/`.
  - [ ] Verify zero 404s in analytics and Search Console.

---

## 🧪 QA Checklist
- [ ] Back button behaves correctly from post → index and across multiple opens.
- [ ] Refresh on a post URL leaves you on that post.
- [ ] All links in injected content open in a new tab where expected.
- [ ] Images lazy‑load and are responsive.
- [ ] Lighthouse scores (SEO, Accessibility, Best Practices, Performance) at or above targets.
- [ ] `sitemap.xml` and feed discovered by bots/readers.
- [ ] No console errors.

---

## 📁 Example File Tree (Vanilla)
```
/assets/
  /css/...
  /js/script.js
  /images/Blogs/...
  /data/posts.json
/blog/
  /hoonanihou/
    index.html
  /another-post/
    index.html
index.html
sitemap.xml
feed.xml
robots.txt
```

---

## ✍️ Notes for Contributors
- Keep class names consistent with existing CSS/JS to avoid regressions.  
- Avoid changing slugs after publish; if necessary, add a redirect.  
- For new posts: create folder + update `posts.json` + add images.  
- Validate HTML, meta tags, and schema for each new post.

