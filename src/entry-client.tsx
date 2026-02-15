// @refresh reload
import { mount, StartClient } from "@solidjs/start/client";

// Register service worker and PWA
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // SW registration failed, but continue anyway
    });
  });
}

mount(() => <StartClient />, document.getElementById("app")!);
