import { LayoutElement } from "./layout.js";
import "./imposter.css";

/**
 * @module imposter-l
 * @description
 * A custom element to be positioned absolutely over any element
 * @property {boolean} breakout=false Whether the element is allowed to break out of the container over which it is positioned
 * @property {string} margin=0 The minimum space between the element and the inside edges of the positioning container over which it is placed (where `breakout` is not applied)
 * @property {boolean} fixed=false Whether to position the element relative to the viewport
 */
export default class Imposter extends LayoutElement {
  static override register(): void {
    LayoutElement.register("imposter-l", Imposter);
  }

  protected override get elementName(): string {
    return "imposter";
  }

  get breakout(): boolean {
    return this.hasAttribute("breakout");
  }

  set breakout(value: boolean) {
    if (value) {
      this.setAttribute("breakout", "");
    } else {
      this.removeAttribute("breakout");
    }
  }

  get fixed(): boolean {
    return this.hasAttribute("fixed");
  }

  set fixed(value: boolean) {
    if (value) {
      this.setAttribute("fixed", "");
    } else {
      this.removeAttribute("fixed");
    }
  }

  get margin(): string {
    return this.getAttribute("margin") ?? "0px";
  }

  set margin(value: string) {
    this.setAttribute("margin", value);
  }

  static get observedAttributes(): string[] {
    return ["breakout", "margin", "fixed"];
  }

  protected override getPropsForId(): Array<string | number | boolean> {
    return [this.breakout, this.fixed, this.margin];
  }

  protected override instanceStyle(): string {
    const margin = this.margin === "0" ? "0px" : this.margin;
    if (!this.breakout || this.fixed) {
      return `
        [data-i="${this.i}"] {
          ${
            this.breakout
              ? ""
              : `
            max-inline-size: calc(100% - (${margin} * 2));
            max-block-size: calc(100% - (${margin} * 2));
            overflow: auto;`
          }
          ${
            this.fixed
              ? `
            position: fixed;`
              : ""
          }
        }
      `;
    }

    return "";
  }
}
