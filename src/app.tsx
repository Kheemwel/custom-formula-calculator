import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense, onMount } from "solid-js";
import "./app.css";

import KeyboardDrawer from "./components/KeyboardDrawer";
import { initFormulas } from "./lib/store";

export default function App() {
  onMount(() => {
    initFormulas();
  });
  return (
    <Router
      root={(props) => (
        <Suspense>
          {props.children}
          <KeyboardDrawer />
        </Suspense>
      )}
    >
      <FileRoutes />
    </Router>
  );
}