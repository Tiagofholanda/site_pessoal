"use client";

import { useEffect } from "react";
import { getAssetPath } from "@/lib/utils";

export default function RootPage() {
  useEffect(() => {
    window.location.replace(getAssetPath("/pt"));
  }, []);

  return (
    <html lang="pt">
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          background: "#becad1",
          color: "#1a2e4a",
          display: "grid",
          placeItems: "center",
          minHeight: "100vh",
          margin: 0,
        }}
      >
        Redirecionando…
      </body>
    </html>
  );
}
