# VivaSecuris Website

Professional website for VivaSecuris — healthcare security services and writing.

## Files

- **index.html** - Homepage (company-level: problem, solutions, contact)
- **blog.html** - Blog (research and development updates)
- **vivaos.html** - Draft platform page; **not linked publicly** (`noindex`, omitted from sitemap) until approval or pilot launch
- **styles.css** - All styling and design
- **script.js** - Interactive functionality
- **README.md** - This file

Product and company copy should be synced from the parent repo (`company/`, `product/docs/`, `pitch/`).

## Features

- **Modern Design** - Clean, professional layout with gradient accents
- **Responsive** - Works on desktop, tablet, and mobile
- **Smooth Animations** - Fade-in effects and smooth scrolling
- **Interactive Navigation** - Fixed navbar with active link highlighting
- **Contact Form** - Ready for backend integration
- **SEO Friendly** - Meta tags, Open Graph, Twitter Cards, JSON-LD, sitemap, canonical URLs

## Search engine visibility (SEO)

- **Canonical URLs** – Set on every page to avoid duplicate-content issues.
- **Open Graph & Twitter Card meta** – Better titles and descriptions when links are shared.
- **JSON-LD structured data** – Organization and WebSite on the homepage for rich results.
- **Sitemap** – `sitemap.xml` lists public pages for crawlers.
- **robots.txt** – Points crawlers to the sitemap and allows indexing.
- **Image alt text** – Logo uses descriptive alt for accessibility and image search.

**Domain:** Canonical URLs, `og:url`, `og:image`, and `sitemap.xml` use `https://vivasecuris.com`. If your live domain is different, search for `vivasecuris.com` in `index.html`, `blog.html`, `sitemap.xml`, and `robots.txt` and replace with your domain.

## Sections (index.html)

1. **Hero** - Main value proposition (services-focused)
2. **Problem** - The real problem in healthcare security
3. **Solutions** - Network monitoring plus consulting offerings (Security testing, Medical device security, AI security review, Security training)
4. **From our writing** - Links to published articles
5. **Mission** - Why this matters
6. **Contact** - Get in touch form

## Customization

### Colors
Edit CSS variables in `styles.css` (VivaSecuris brand: red, black, white):
```css
:root {
    --primary-gradient: linear-gradient(135deg, #c41e3a 0%, #8b1528 100%);
    --primary-color: #c41e3a;
    --primary-dark: #8b1528;
    --secondary-color: #1a1a1a;
}
```

### Contact Form
The contact form currently shows an alert. To connect to a backend:
1. Update the form submission handler in `script.js`
2. Add your API endpoint
3. Handle form validation and error states

### Content
All content is in `index.html`. Update text, add sections, or modify structure as needed.

## Deployment

### Static Hosting
This is a static site and can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront
- Any static hosting service

### Local Development
Just open `index.html` in a browser, or use a local server:
```bash
# Python
python3 -m http.server 8000
```

## VivaOS launch checklist

When approval or pilot starts:

1. Remove `noindex` from `vivaos.html`
2. Add `vivaos.html` back to `sitemap.xml`
3. Restore homepage/footer links if desired
4. Update meta copy and announce on blog
