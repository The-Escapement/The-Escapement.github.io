import { LayoutElement } from "./layout.js";
import "./cluster.css";

/**
 * @module cluster-l
 * @description
 * A custom element for grouping items, with control over the margin between them
 * @property {string} justify=flex-start A CSS `justify-content` value
 * @property {string} align=flex-start A CSS `align-items` value
 * @property {string} space=var(--s1) A CSS `gap` value. The minimum space between the clustered child elements.
 */
export default class Cluster extends LayoutElement {
  static override register(): void {
    LayoutElement.register("cluster-l", Cluster);
  }

  protected override get elementName(): string {
    return "cluster";
  }

  get justify(): string {
    return this.getAttribute("justify") ?? "flex-start";
  }

  set justify(value: string) {
    this.setAttribute("justify", value);
  }

  get align(): string {
    return this.getAttribute("align") ?? "flex-start";
  }

  set align(value: string) {
    this.setAttribute("align", value);
  }

  get space(): string {
    return this.getAttribute("space") ?? "var(--s1)";
  }

  set space(value: string) {
    this.setAttribute("space", value);
  }

  static get observedAttributes(): string[] {
    return ["justify", "align", "space"];
  }

  protected override getPropsForId(): Array<string | number | boolean> {
    return [this.justify, this.align, this.space];
  }

  protected override instanceStyle(): string {
    return `
      [data-i="${this.i}"] {
        justify-content: ${this.justify};
        align-items: ${this.align};
        gap: ${this.space};
      }
    `;
  }
}
