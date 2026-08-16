import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Vietnam national-capacity map", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Việt Nam 2026–2036 — Bản đồ năng lực quốc gia<\/title>/i);
  assert.match(html, /BẢN ĐỒ HỆ THỐNG/);
  assert.match(html, /Mạng lưới/);
  assert.match(html, /Lộ trình 10 năm/);
  assert.match(html, /Chỉ dấu sớm/);
  assert.match(html, /Nguồn nghiên cứu/);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site|react-loading-skeleton/);
});

test("the map keeps evidence language and research source visible", async () => {
  const [html, page] = await Promise.all([
    (await render()).text(),
    readFile(new URL("../src/app/page.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(html, /Dữ liệu, suy luận và giả thuyết được tách rõ/);
  assert.match(html, /https:\/\/app\.notion\.com\/p\/3bd0f51ede8b803c87c8c26bcbe4def2/);
  assert.match(page, /Bản đồ quan hệ năng lực quốc gia/);
  assert.match(page, /Không chỉ tăng sản lượng/);
});
