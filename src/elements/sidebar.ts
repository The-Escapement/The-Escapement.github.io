import { LayoutElement } from "./layout.js";
import "./sidebar.css";

/**
 * @module sidebar-l
 * @description
 * A custom element for placing two elements side-by-side. If space permits, the sidebar element has a set width, and the companion takes up the rest of the available horizontal space. If not, the elements are collapsed into a single column, each taking up 100% of the horizontal space.
 * @property {string} side=left Which element to treat as the sidebar (all values but "left" are considered "right")
 * @property {string} sideWidth Represents the width of the sidebar _when_ adjacent. If not set (`null`) it defaults to the sidebar's content width
 * @property {string} contentMin=50% A CSS **percentage** value. The minimum width of the content element in the horizontal configuration
 * @property {string} space=var(--s1) A CSS margin value representing the space between the two elements
 * @property {boolean} noStretch=false Make the adjacent elements adopt their natural height
 */
export default class Sidebar extends LayoutElement {
  static override register(): void {
    LayoutElement.register("sidebar-l", Sidebar);
  }

  protected override get elementName(): string {
    return "sidebar";
  }

  get side(): string {
    return this.getAttribute("side") ?? "left";
  }

  set side(value: string | undefined) {
    if (value) {
      this.setAttribute("side", value);
    } else {
      this.removeAttribute("side");
    }
  }

  get sideWidth(): string | undefined {
    return this.getAttribute("sideWidth") ?? undefined;
  }

  set sideWidth(value: string | undefined) {
    if (value) {
      this.setAttribute("sideWidth", value);
    } else {
      this.removeAttribute("sideWidth");
    }
  }

  get contentMin(): string {
    return this.getAttribute("contentMin") ?? "50%";
  }

  set contentMin(value: string) {
    this.setAttribute("contentMin", value);
  }

  get space(): string {
    return this.getAttribute("space") ?? "var(--s1)";
  }

  set space(value: string) {
    this.setAttribute("space", value);
  }

  get noStretch(): boolean {
    return this.hasAttribute("noStretch");
  }

  set noStretch(value: boolean) {
    if (value) {
      this.setAttribute("noStretch", "");
    } else {
      this.removeAttribute("noStretch");
    }
  }

  static get observedAttributes(): string[] {
    return ["side", "sideWidth", "contentMin", "space", "noStretch"];
  }

  protected override getPropsForId(): Array<string | number | boolean> {
    return [this.side, this.sideWidth ?? "none", this.contentMin, this.space];
  }

  protected override instanceStyle(): string {
    if (!this.contentMin.includes("%")) {
      console.warn(
        "The value for each <sidebar-l> `contentMin` property should be a percentage. Otherwise overflow is likely to occur",
      );
    }

    return `
      [data-i="${this.i}"] {
        gap: ${this.space};
        ${this.noStretch ? "align-items: flex-start;" : ""}
      }

      [data-i="${this.i}"] > * {
        ${this.sideWidth ? `flex-basis: ${this.sideWidth};` : ""}
      }

      [data-i="${this.i}"] > ${this.side === "left" ? `:last-child` : `:first-child`} {
        flex-basis: 0;
        flex-grow: 999;
        min-inline-size: ${this.contentMin};
      }
    `;
  }
}
