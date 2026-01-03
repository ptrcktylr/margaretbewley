// Cloudflare Pages Function to list all images
interface Env {
  GALLERY_BUCKET: R2Bucket;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const listed = await context.env.GALLERY_BUCKET.list();

    const images = listed.objects.map(obj => ({
      name: obj.key,
      url: `/api/images/${obj.key}`,
      size: obj.size,
      uploaded: obj.uploaded,
    }));

    return new Response(JSON.stringify(images), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('List error:', error);
    return new Response('Failed to list images', { status: 500 });
  }
};
