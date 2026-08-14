"use client";

import { useEffect } from "react";

const chunkErrorPattern = /ChunkLoadError|Loading chunk|dynamically imported module|Failed to fetch/i;

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (!chunkErrorPattern.test(error?.message || "")) return;

    const retryKey = "huangjia-runtime-retry";
    const lastRetry = Number(sessionStorage.getItem(retryKey) || 0);
    if (Date.now() - lastRetry < 30_000) return;

    sessionStorage.setItem(retryKey, Date.now().toString());
    const url = new URL(window.location.href);
    url.searchParams.set("refresh", Date.now().toString());
    window.location.replace(url.toString());
  }, [error]);

  const retry = () => {
    sessionStorage.removeItem("huangjia-runtime-retry");
    reset();
  };

  return (
    <html lang="zh-CN">
      <body style={{ margin: 0, color: "#262624", background: "#fff", fontFamily: "Arial, sans-serif" }}>
        <main style={{ minHeight: "100vh", padding: "8vw", display: "grid", placeItems: "center" }}>
          <section style={{ width: "min(560px, 100%)", textAlign: "left" }}>
            <span style={{ color: "#f3a435", fontSize: 12, letterSpacing: ".12em" }}>HUANGJIA</span>
            <h1 style={{ margin: "18px 0 12px", fontSize: "clamp(32px, 6vw, 58px)", fontWeight: 400 }}>
              页面载入失败
            </h1>
            <p style={{ margin: "0 0 28px", color: "#666", fontSize: 16, lineHeight: 1.7 }}>
              网站可能刚刚完成更新，请重新载入最新页面。
              <br />The website may have just been updated. Please reload the latest version.
            </p>
            <button
              type="button"
              onClick={retry}
              style={{ minHeight: 48, padding: "0 24px", border: 0, color: "#202020", background: "#f3a435", cursor: "pointer", fontWeight: 600 }}
            >
              重新载入 / Reload
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}
