import { LayoutElement } from "./layout.js";
import "./icon.css";

/**
 * @module icon-l
 * @description
 * A custom element for inline icon insertion
 * @property {string} space=null The space between the text and the icon. If null, natural word spacing is preserved
 * @property {string} label=null Turns the element into an image in assistive technologies and adds an aria-label of the value
 */
export default class Icon extends LayoutElement {
  static override register(): void {
    LayoutElement.register("icon-l", Icon);
  }

  protected override get elementName(): string {
    return "icon";
  }

  get space(): string | undefined {
    return this.getAttribute("space") ?? undefined;
  }

  set space(value: string | undefined) {
    if (value) {
      this.setAttribute("space", value);
    } else {
      this.removeAttribute("space");
    }
  }

  get label(): string | undefined {
    return this.getAttribute("label") ?? undefined;
  }

  set label(value: string | undefined) {
    if (value) {
      this.setAttribute("label", value);
    } else {
      this.removeAttribute("label");
    }
  }

  static get observedAttributes(): string[] {
    return ["space", "label"];
  }

  protected override getPropsForId(): Array<string | number | boolean> {
    return [this.space ?? "none"];
  }

  protected override instanceStyle(): string {
    if (this.label) {
      this.setAttribute("role", "img");
      this.setAttribute("aria-label", this.label);
    }

    if (this.space) {
      return `
        [data-i="${this.i}"] {
          display: inline-flex;
          align-items: baseline;
        }

        [data-i="${this.i}"] > svg {
          margin-inline-end: ${this.space};
        }
      `;
    }

    return "";
  }
}
