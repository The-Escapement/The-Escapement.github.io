import { LayoutElement } from "./layout.js";
import "./frame.css";

/**
 * @module frame-l
 * @description
 * A custom element for augmenting image ratios
 * @property {string} ratio=16:9 The element's aspect ratio
 */
export default class Frame extends LayoutElement {
  static override register(): void {
    LayoutElement.register("frame-l", Frame);
  }

  protected override get elementName(): string {
    return "frame";
  }

  get ratio(): string {
    return this.getAttribute("ratio") ?? "16:9";
  }

  set ratio(value: string) {
    this.setAttribute("ratio", value);
  }

  static get observedAttributes(): string[] {
    return ["ratio"];
  }

  protected override getPropsForId(): Array<string | number | boolean> {
    return [this.ratio];
  }

  protected override instanceStyle(): string {
    if (this.children.length !== 1) {
      console.warn("<frame-l> elements should have just one child element");
    }

    const ratio = this.ratio.split(":");
    return `
      [data-i="${this.i}"] {
        aspect-ratio: ${ratio[0]} / ${ratio[1]};
      }
    `;
  }
}
