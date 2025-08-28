import { LayoutElement } from "./layout.js";
import "./center.css";

/**
 * @module center-l
 * @description
 * A custom element for centering a block-level element horizontally,
 * with a max-width value representing the typographic measure
 * @property {string} max=var(--measure) A CSS `max-width` value
 * @property {boolean} andText=false Center align the text too (`text-align: center`)
 * @property {boolean} gutters=0 The minimum space on either side of the content
 * @property {boolean} intrinsic=false Center child elements based on their content width
 */
export default class Center extends LayoutElement {
  static override register(): void {
    LayoutElement.register("center-l", Center);
  }

  protected override get elementName(): string {
    return "center";
  }

  get max(): string {
    return this.getAttribute("max") ?? "var(--measure)";
  }

  set max(value: string) {
    this.setAttribute("max", value);
  }

  get andText(): boolean {
    return this.hasAttribute("and-text");
  }

  set andText(value: boolean) {
    if (value) {
      this.setAttribute("and-text", "");
    } else {
      this.removeAttribute("and-text");
    }
  }

  get gutters(): string | undefined {
    return this.getAttribute("gutters") ?? undefined;
  }

  set gutters(value: string | undefined) {
    if (value) {
      this.setAttribute("gutters", value);
    } else {
      this.removeAttribute("gutters");
    }
  }

  get intrinsic(): boolean {
    return this.hasAttribute("intrinsic");
  }

  set intrinsic(value: boolean) {
    if (value) {
      this.setAttribute("intrinsic", "");
    } else {
      this.removeAttribute("intrinsic");
    }
  }

  static get observedAttributes(): string[] {
    return ["max", "and-text", "gutters", "intrinsic"];
  }

  protected override getPropsForId(): Array<string | number | boolean> {
    return [this.max, this.andText, this.gutters ?? "none", this.intrinsic];
  }

  protected override instanceStyle(): string {
    return `
      [data-i="${this.i}"] {
        max-width: ${this.max};
        ${
          this.gutters
            ? `
        padding-inline-start: ${this.gutters};
        padding-inline-end: ${this.gutters};`
            : ""
        }
        ${this.andText ? `text-align: center;` : ""}
        ${
          this.intrinsic
            ? `
        display: flex;
        flex-direction: column;
        align-items: center;`
            : ""
        }
      }
    `;
  }
}
