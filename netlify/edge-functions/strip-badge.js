// Netlify Edge Function
export default async (request, context) => {
  const BASE44_ORIGIN = "https://patoolafam.base44.app";
  const incomingUrl = new URL(request.url);
  const targetUrl = new URL(incomingUrl.pathname + incomingUrl.search, BASE44_ORIGIN);
  const upstreamResp = await fetch(targetUrl);
  const ct = upstreamResp.headers.get("content-type") || "";
  if (!ct.includes("text/html")) return upstreamResp;
  let html = await upstreamResp.text();
  html = html
    .replace(/<[^>]*>\s*Edit with Base44\s*<\/[^>]*>/gi, "")
    .replace(/<a[^>]*href=["'][^"']*base44[^"']*["'][^>]*>[\s\S]*?<\/a>/gi, "")
    .replace(/<div[^>]*class=["'][^"']*(badge|base44)[^"']*["'][^>]*>[\s\S]*?<\/div>/gi, "");
  html = html.replace(/<\/head>/i, `
    <style>
      a[href*="base44"] { display:none!important; }
      [class*="base44"], [id*="base44"] { display:none!important; }
    </style></head>`);
  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
    status: 200
  });
};
