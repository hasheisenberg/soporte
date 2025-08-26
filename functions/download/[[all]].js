export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const key = url.pathname.slice(1); // Elimina el primer "/"
  const obj = await context.env.BUCKET.get(key);

  if (!obj) {
    return new Response("Archivo no encontrado", { status: 404 });
  }

  const headers = new Headers();
  obj.writeHttpMetadata(headers);
  headers.set("etag", obj.httpEtag);

  return new Response(obj.body, { headers });
}
