export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const key = url.pathname.split('/').pop();

  const obj = await context.env.BUCKET.get(key);

  if (!obj) {
    return new Response("Archivo no encontrado", { status: 404 });
  }

  const headers = new Headers();
  headers.set("Content-Type", obj.httpMetadata.contentType || "application/vnd.android.package-archive");
  headers.set("Content-Disposition", `attachment; filename="${key}"`);
  headers.set("etag", obj.httpEtag);

  return new Response(obj.body, { headers });
}