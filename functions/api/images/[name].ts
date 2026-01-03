// Cloudflare Pages Function to get or delete a specific image
interface Env {
  GALLERY_BUCKET: R2Bucket;
}

// GET - Serve image
export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const name = context.params.name as string;
    const object = await context.env.GALLERY_BUCKET.get(name);

    if (!object) {
      return new Response('Image not found', { status: 404 });
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('etag', object.httpEtag);
    headers.set('Cache-Control', 'public, max-age=31536000');

    return new Response(object.body, { headers });
  } catch (error) {
    console.error('Get image error:', error);
    return new Response('Failed to get image', { status: 500 });
  }
};

// DELETE - Delete image
export const onRequestDelete: PagesFunction<Env> = async (context) => {
  try {
    const name = context.params.name as string;
    await context.env.GALLERY_BUCKET.delete(name);

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Delete error:', error);
    return new Response('Failed to delete image', { status: 500 });
  }
};
