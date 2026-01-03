# Margaret Bewley Portfolio - Static Site

This is a static HTML/CSS/JS version of the Margaret Bewley portfolio site, converted from Next.js for easy deployment to any static hosting platform.

## Features

- **Image Gallery**: Masonry layout with 16 optimized WebP images (5.9MB total, reduced from 27MB)
- **Modal Viewer**: Click any image to view it in a responsive modal
- **Theme Toggle**: Light/dark mode with cookie persistence
- **Responsive Design**: Mobile-friendly navigation with dropdown menu
- **Fast Loading**: Uses CDN for Tailwind CSS and DaisyUI

## File Structure

```
static-site/
├── index.html          # Gallery homepage
├── about.html          # About page (Coming Soon)
├── contact.html        # Contact page (Coming Soon)
├── 404.html           # Custom 404 error page
├── css/               # (empty - using CDN)
├── js/
│   ├── navbar.js      # Theme toggle & mobile navigation
│   └── gallery.js     # Modal functionality
├── images/
│   └── gallery/       # 16 optimized WebP images
└── README.md          # This file
```

## Deployment Options

### Option 1: Netlify (Recommended)

1. Create a new site in Netlify
2. Upload the entire `static-site` folder or connect to your Git repository
3. Set the publish directory to `static-site`
4. Deploy!

**Custom 404 Page**: Netlify will automatically use `404.html` for error pages.

### Option 2: Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to the `static-site` directory
3. Run `vercel` and follow the prompts
4. Your site will be deployed!

### Option 3: GitHub Pages

1. Push the `static-site` directory to a GitHub repository
2. Go to Settings > Pages
3. Select the branch and set folder to `/static-site` (or move files to root)
4. Save and your site will be live at `https://yourusername.github.io/repo-name`

### Option 4: Any Static Host

Simply upload the contents of the `static-site` directory to any web server or static hosting service (Cloudflare Pages, AWS S3, Firebase Hosting, etc.).

## Local Testing

To test locally, you can use any simple HTTP server:

**Python 3:**
```bash
cd static-site
python3 -m http.server 8000
```

**Node.js (http-server):**
```bash
npx http-server static-site -p 8000
```

Then visit `http://localhost:8000` in your browser.

## Technologies Used

- **HTML5**: Semantic markup
- **Tailwind CSS** (v3.4.1): Utility-first CSS framework via CDN
- **DaisyUI** (v4.12.22): Component library via CDN
- **Vanilla JavaScript**: No frameworks, just clean ES6+
- **Google Fonts**: Geist Sans & Geist Mono
- **WebP Images**: Modern image format for smaller file sizes

## Performance Optimizations

1. **Image Optimization**: All 16 gallery images converted from JPG to WebP at 85% quality
   - Original total: 27MB
   - Optimized total: 5.9MB
   - **~78% size reduction**

2. **Lazy Loading**: Images use `loading="lazy"` attribute

3. **CDN Usage**: Tailwind and DaisyUI loaded from fast CDNs

4. **Minimal JavaScript**: Only ~200 lines of vanilla JS, no frameworks

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (WebP supported in Safari 14+)
- Mobile browsers: Full support

## Original Next.js Site

The original Next.js source code is still available in the parent directory if you want to compare or make future changes.

## License

Private portfolio site. All rights reserved.
