import { LayoutElement } from "./layout.js";
import "./container.css";

/**
 * @module container-l
 * @description
 * A custom element for defining containment contexts
 * @property {string} name The name of the container, used as the CSS `container-name` value (optional)
 */
export default class Container extends LayoutElement {
  static override register(): void {
    LayoutElement.register("container-l", Container);
  }

  protected override get elementName(): string {
    return "container";
  }

  get name(): string | undefined {
    return this.getAttribute("name") ?? undefined;
  }

  set name(value: string | undefined) {
    if (value) {
      this.setAttribute("name", value);
    } else {
      this.removeAttribute("name");
    }
  }

  static get observedAttributes(): string[] {
    return ["name"];
  }

  protected override getPropsForId(): Array<string | number | boolean> {
    return [this.name ?? "default"];
  }

  protected override instanceStyle(): string {
    return `
      [data-i="${this.i}"] {
        display: block;
        container-type: inline-size;
        ${this.name ? `container-name: ${this.name};` : ""}
      }
    `;
  }
}
