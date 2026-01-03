# Admin Panel Setup Guide

This guide will help you set up the admin panel for Margaret to upload and manage gallery images.

## Features

- Upload multiple images at once
- Delete images from the gallery
- Images stored in Cloudflare R2 (free tier: 10GB storage)
- Password-protected admin page
- No GitHub account needed

## Setup Instructions

### Step 1: Create Cloudflare R2 Bucket

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click **R2** in the left sidebar
3. Click **Create bucket**
4. Name it: `margaretbewley-gallery`
5. Click **Create bucket**

### Step 2: Bind R2 Bucket to Pages

1. Go to **Workers & Pages** > **Pages**
2. Click on your **margaretbewley** project
3. Go to **Settings** > **Functions**
4. Scroll to **R2 bucket bindings**
5. Click **Add binding**
   - Variable name: `GALLERY_BUCKET`
   - R2 bucket: `margaretbewley-gallery`
6. Click **Save**

### Step 3: Set Up Access Protection for /admin

1. Still in your Pages project settings
2. Go to **Settings** > **Functions**
3. Scroll to **Access Policy**
4. Click **Add a policy**
5. Configure:
   - **Path**: `/admin*`
   - **Action**: Create a new Access application
   - **Application name**: `Margaret Gallery Admin`
   - **Session duration**: 24 hours
6. Click **Next**
7. Choose authentication method:
   - **One-time PIN** (Recommended - Margaret can use her email)
   - Or **Google** / **Microsoft** if she has an account
8. Add Margaret's email address to allowed users
9. Click **Save**

### Step 4: Deploy

The code is already pushed to GitHub. Cloudflare Pages will automatically deploy it.

1. Go to **Deployments** tab
2. Wait for the latest deployment to finish (should be automatic)
3. Once deployed, the admin panel will be at: `https://margaretbewley.com/admin`

### Step 5: Test

1. Go to `https://margaretbewley.com/admin`
2. Margaret will be prompted to enter her email
3. She'll receive a verification code
4. After logging in, she can upload/delete images
5. Changes appear on the main gallery instantly!

## How Margaret Uses It

### Upload Images:
1. Visit `https://margaretbewley.com/admin`
2. Login with email verification
3. Click "Choose File" and select one or more images
4. Click "Upload Images"
5. Images appear on the main site immediately!

### Delete Images:
1. In the admin panel, hover over any image
2. Click the "Delete" button that appears
3. Confirm deletion
4. Image is removed from the site

## Migration from Static Images

The current 16 static images will continue to work as a fallback. You can:

1. **Option A**: Upload all 16 existing images through the admin panel, then delete the static files
2. **Option B**: Keep static images as they are - new uploads will appear alongside them

The gallery is smart - it tries to load from R2 first, and falls back to static images if R2 isn't configured yet.

## Costs

- **Cloudflare R2**: Free tier includes 10GB storage (plenty for thousands of images)
- **Cloudflare Access**: Free for up to 50 users
- **Total**: $0/month

## Troubleshooting

### Admin page shows "error loading images"
- Make sure the R2 bucket is created and bound correctly
- Check that the binding variable name is exactly `GALLERY_BUCKET`

### Can't access /admin page
- Ensure Access Policy is configured for `/admin*` path
- Make sure Margaret's email is added to allowed users

### Images upload but don't show
- Wait a few seconds and refresh
- Check browser console for errors
- Verify R2 bucket binding is correct

## Need Help?

Contact me if you run into any issues during setup!
