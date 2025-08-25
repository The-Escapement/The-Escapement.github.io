import { LayoutElement } from "./layout.js";
import "./box.css";

/**
 * @module box-l
 * @description
 * A custom element for generic boxes/containers
 * @property {string} padding=var(--s1) A CSS `padding` value
 * @property {string} borderWidth=var(--border-thin) A CSS `border-width` value
 * @property {boolean} invert=false Whether to apply an inverted theme. Only recommended for greyscale designs.
 */
export default class Box extends LayoutElement {
  static override register(): void {
    LayoutElement.register("box-l", Box);
  }

  protected override get elementName(): string {
    return "box";
  }

  get padding(): string {
    return this.getAttribute("padding") ?? "var(--s1)";
  }

  set padding(value: string) {
    this.setAttribute("padding", value);
  }

  get borderWidth(): string {
    return this.getAttribute("borderWidth") ?? "var(--border-thin)";
  }

  set borderWidth(value: string) {
    this.setAttribute("borderWidth", value);
  }

  static get observedAttributes(): string[] {
    return ["borderWidth", "padding", "invert"];
  }

  get invert(): boolean {
    return this.hasAttribute("invert");
  }

  set invert(value: boolean) {
    if (value) {
      this.setAttribute("invert", "");
    } else {
      this.removeAttribute("invert");
    }
  }

  protected override getPropsForId(): Array<string | number | boolean> {
    return [this.padding, this.borderWidth, this.invert];
  }

  protected override instanceStyle(): string {
    return `
      [data-i="${this.i}"] {
        padding: ${this.padding};
        border: ${this.borderWidth} solid;
        ${
          this.invert
            ? `background-color: var(--color-light);
        filter: invert(100%);`
            : ""
        }
      }

      [data-i="${this.i}"] {
        background-color: inherit;
      }
    `;
  }
}
