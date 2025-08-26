export async function onRequestGet(context) {
  const name = new URL(context.request.url).pathname.split("/").pop();
  const obj = await context.env.BUCKET.get(name);

  if (!obj) {
    return new Response("No encontrado", { status: 404 });
  }

  return new Response(obj.body, {
    headers: {
      "Content-Type": obj.httpMetadata.contentType || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${name}"`,
    },
  });
}
