import { LayoutElement } from "./layout.js";
import "./switcher.css";

/**
 * @module switcher-l
 * @description Switch directly between horizontal and vertical layouts at a given (container width-based) breakpoint or 'threshold'
 * @property {string} threshold=var(--measure) A CSS `width` value (representing the 'container breakpoint')
 * @property {string} space=var(--s1) A CSS `margin` value
 * @property {integer} limit=4 A number representing the maximum number of items permitted for a horizontal layout
 */
export default class Switcher extends LayoutElement {
  static override register(): void {
    LayoutElement.register("switcher-l", Switcher);
  }

  protected override get elementName(): string {
    return "switcher";
  }

  get threshold(): string {
    return this.getAttribute("threshold") ?? "var(--measure)";
  }

  set threshold(value: string) {
    this.setAttribute("threshold", value);
  }

  get space(): string {
    return this.getAttribute("space") ?? "var(--s1)";
  }

  set space(value: string) {
    this.setAttribute("space", value);
  }

  get limit(): string {
    return this.getAttribute("limit") ?? "5";
  }

  set limit(value: string) {
    this.setAttribute("limit", value);
  }

  static get observedAttributes(): string[] {
    return ["threshold", "space", "limit"];
  }

  protected override getPropsForId(): Array<string | number | boolean> {
    return [this.threshold, this.space, this.limit];
  }

  protected override instanceStyle(): string {
    return `
      [data-i="${this.i}"] {
        gap: ${this.space};
      }

      [data-i="${this.i}"] > * {
        flex-basis: calc((${this.threshold} - 100%) * 999);
      }

      [data-i="${this.i}"] > :nth-last-child(n+${this.limit + 1}),
      [data-i="${this.i}"] > :nth-last-child(n+${this.limit + 1}) ~ * {
        flex-basis: 100%;
      }
    `;
  }
}
