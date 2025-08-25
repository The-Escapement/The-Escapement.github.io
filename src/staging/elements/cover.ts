import { LayoutElement } from "./layout.js";
import "./cover.css";

/**
 * @module cover-l
 * @description
 * A custom element for covering a block-level element horizontally,
 * with a max-width value representing the typographic measure
 * @property {string} centered=h1 A simple selector such an element or class selector, representing the centered (main) element in the cover
 * @property {string} space=var(--s1) The minimum space between and around all of the child elements
 * @property {string} minHeight=100vh The minimum height (block-size) for the **Cover**
 * @property {boolean} noPad=false Whether the spacing is also applied as padding to the container element
 */
export default class Cover extends LayoutElement {
  static override register(): void {
    LayoutElement.register("cover-l", Cover);
  }

  protected override get elementName(): string {
    return "cover";
  }

  get centered(): string {
    return this.getAttribute("centered") ?? "h1";
  }

  set centered(value: string) {
    this.setAttribute("centered", value);
  }

  get space(): string {
    return this.getAttribute("space") ?? "var(--s1)";
  }

  set space(value: string) {
    this.setAttribute("space", value);
  }

  get minHeight(): string {
    return this.getAttribute("minHeight") ?? "100vh";
  }

  set minHeight(value: string) {
    this.setAttribute("minHeight", value);
  }

  get noPad(): boolean {
    return this.hasAttribute("noPad");
  }

  set noPad(value: boolean) {
    if (value) {
      this.setAttribute("noPad", "");
    } else {
      this.removeAttribute("noPad");
    }
  }

  static get observedAttributes(): string[] {
    return ["centered", "space", "minHeight", "noPad"];
  }

  protected override getPropsForId(): Array<string | number | boolean> {
    return [this.centered, this.space, this.minHeight, this.noPad];
  }

  protected override instanceStyle(): string {
    return `
      [data-i="${this.i}"] {
        min-height: ${this.minHeight};
        padding: ${this.noPad ? "0" : this.space};
      }

      [data-i="${this.i}"] > * {
        margin-block: ${this.space};
      }

      [data-i="${this.i}"] > :first-child:not(${this.centered}) {
        margin-block-start: 0;
      }

      [data-i="${this.i}"] > :last-child:not(${this.centered}) {
        margin-block-end: 0;
      }

      [data-i="${this.i}"] > ${this.centered} {
        margin-block: auto;
      }
    `;
  }
}
