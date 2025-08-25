import Box from "./box.ts";
import Center from "./center.ts";
import Cluster from "./cluster.ts";
import Container from "./container.ts";
import Cover from "./cover.ts";
import Frame from "./frame.ts";
import Grid from "./grid.ts";
import Icon from "./icon.ts";
import Imposter from "./imposter.ts";
import Reel from "./reel.ts";
import Sidebar from "./sidebar.ts";
import Stack from "./stack.ts";
import Switcher from "./switcher.ts";

export function registerAllElements() {
  if ("customElements" in globalThis) {
    console.log("Registering web components...");

    const components = [
      Box,
      Center,
      Cluster,
      Container,
      Cover,
      Frame,
      Grid,
      Icon,
      Imposter,
      Reel,
      Sidebar,
      Stack,
      Switcher,
    ];

    for (const componentClass of components) {
      try {
        componentClass.register();
        console.log(`Registered component: ${componentClass.name}`);
      } catch (error) {
        console.error(
          `Failed to register component ${componentClass.name}:`,
          error,
        );
      }
    }
  } else {
    console.warn("Custom elements not supported in this browser");
  }
}
