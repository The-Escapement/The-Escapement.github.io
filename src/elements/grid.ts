import { LayoutElement } from "./layout.js";
import "./grid.css";

/**
 * @module grid-l
 * @description
 * A custom element for creating a responsive grid using the CSS Grid module
 * @property {string} min=250px A CSS length value representing x in `minmax(min(x, 100%), 1fr)`
 * @property {string} space=var(--s1) The space between grid cells
 */
export default class Grid extends LayoutElement {
  static override register(): void {
    LayoutElement.register("grid-l", Grid);
  }

  protected override get elementName(): string {
    return "grid";
  }

  get min(): string {
    return this.getAttribute("min") ?? "250px";
  }

  set min(value: string) {
    this.setAttribute("min", value);
  }

  get space(): string {
    return this.getAttribute("space") ?? "var(--s1)";
  }

  set space(value: string) {
    this.setAttribute("space", value);
  }

  static get observedAttributes(): string[] {
    return ["min", "space"];
  }

  protected override getPropsForId(): Array<string | number | boolean> {
    return [this.min, this.space];
  }

  protected override instanceStyle(): string {
    return `
      [data-i="${this.i}"] {
        grid-gap: ${this.space};
      }

      @supports (width: min(${this.min}, 100%)) {
        [data-i="${this.i}"] {
          grid-template-columns: repeat(auto-fill, minmax(min(${this.min}, 100%), 1fr));
        }
      }
    `;
  }
}
