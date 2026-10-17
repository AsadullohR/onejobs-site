import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App";

// Used only at build time by scripts/prerender.mjs.
export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
}
