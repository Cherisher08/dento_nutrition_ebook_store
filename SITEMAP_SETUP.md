# Sitemap Generation Setup

This project now includes automatic sitemap generation for SEO.

## What's Included

1. **generate-sitemap.js** - Node.js script that generates `sitemap.xml` by fetching books from your API
2. **public/sitemap.xml** - Generated sitemap (updated during build)
3. **public/robots.txt** - Robots.txt file that references the sitemap

## How It Works

1. The script fetches all books from `${VITE_API_URL}/public/books`
2. Generates URLs for:
   - Homepage (`/`)
   - Admin page (`/admin`)
   - Each book page (`/book/:id`)
3. Outputs to `public/sitemap.xml`
4. Automatically runs during `npm run build`

## Configuration

The generator uses these environment variables:

- `VITE_API_URL` - Your API base URL (default: `http://localhost:8000`)
- `SITE_URL` - Your site domain (default: `https://dentonutrition.com`)

Update these in your `.env` or `.env.production` files:

```
VITE_API_URL=https://api.dentonutrition.com
SITE_URL=https://www.dentonutrition.com
```

## Usage

### Generate sitemap manually:
```bash
npm run generate-sitemap
```

### Build with sitemap generation:
```bash
npm run build
```

The sitemap will be automatically generated and placed in `public/sitemap.xml`.

## SEO Setup

After deployment, ensure:

1. **Sitemap is accessible** at `https://dentonutrition.com/sitemap.xml`
2. **Robots.txt is accessible** at `https://dentonutrition.com/robots.txt`
3. **Submit to search engines:**
   - Google Search Console: https://search.google.com/search-console
   - Bing Webmaster Tools: https://www.bing.com/webmasters

## Notes

- The `/admin` route has priority 0.5 (can be excluded from sitemap if needed)
- Book pages have priority 0.8 and weekly changefreq
- Homepage has priority 1.0 (highest priority)
- If API is unreachable during build, sitemap will contain only static pages
