// Cloudflare Pages Function to handle image uploads
interface Env {
  GALLERY_BUCKET: R2Bucket;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const formData = await context.request.formData();
    const image = formData.get('image') as File;

    if (!image) {
      return new Response('No image provided', { status: 400 });
    }

    // Generate unique filename with timestamp
    const timestamp = Date.now();
    const ext = image.name.split('.').pop() || 'jpg';
    const filename = `${timestamp}.${ext}`;

    // Upload to R2
    await context.env.GALLERY_BUCKET.put(filename, image.stream(), {
      httpMetadata: {
        contentType: image.type,
      },
    });

    return new Response(JSON.stringify({
      success: true,
      filename
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Upload error:', error);
    return new Response('Upload failed', { status: 500 });
  }
};
