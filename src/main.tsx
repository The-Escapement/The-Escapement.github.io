import { createRoot } from "react-dom/client";
import App from "./components/app.tsx";
import { registerAllElements } from "./elements/index.ts";

if (globalThis.window !== undefined) {
  registerAllElements();
}

const container = document.querySelector("#app");
if (container) {
  const root = createRoot(container);
  root.render(<App features={[]} env="production" />);
}
