# Blog slug rules

These rules ensure stable, SEO-friendly URLs and consistent content organization.

- Use lowercase letters only
- Use hyphens to separate words
- ASCII characters only (no spaces, punctuation, or diacritics)
- No leading or trailing hyphens
- Keep slugs short and descriptive
- Slugs are immutable after publish (treat as permanent IDs)

Examples
- hoonanihou
- ai-pixel-generation
- service-now-tips

Validation regex (conceptual)
- ^[a-z0-9]+(?:-[a-z0-9]+)*$

Collision policy
- If a slug collides, append a short disambiguator: -v2, -2025, etc.

Change policy
- If a slug absolutely must change, create a legacy file at the old path with a <meta http-equiv="refresh"> to the new canonical URL to avoid 404s.
