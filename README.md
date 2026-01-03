# Margaret Bewley Portfolio

A static portfolio website with an optimized image gallery.

## Quick Start

The entire website is in the `static-site/` directory.

To test locally:
```bash
cd static-site
python3 -m http.server 8000
```

Then visit http://localhost:8000

## Features

- Responsive masonry image gallery
- Light/dark theme toggle
- Mobile-friendly navigation
- Optimized WebP images (5.9MB total)
- Modal image viewer

## Deployment

See [static-site/README.md](static-site/README.md) for detailed deployment instructions for Netlify, Vercel, GitHub Pages, and other hosting platforms.

## Customization

### Update Email Address
Edit `static-site/contact.html` line 127:
```html
<a href="mailto:your-email@example.com" class="btn btn-primary btn-lg gap-2">
```

### Add Social Media Links
Uncomment the social links section in `static-site/contact.html` (lines 136-149) and update the URLs.

### Update About Page
Edit the bio text in `static-site/about.html` (lines 121-128).

### Add More Images
1. Convert images to WebP format:
   ```bash
   cwebp -q 85 your-image.jpg -o static-site/images/gallery/16.webp
   ```
2. Add image tags to `static-site/index.html` following the existing pattern.

## File Structure

```
margaretbewley/
├── README.md
└── static-site/
    ├── index.html
    ├── about.html
    ├── contact.html
    ├── 404.html
    ├── js/
    │   ├── navbar.js
    │   └── gallery.js
    └── images/
        └── gallery/
```

## Technologies

- HTML5
- Tailwind CSS (CDN)
- DaisyUI (CDN)
- Vanilla JavaScript
- WebP images
