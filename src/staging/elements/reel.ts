import { LayoutElement } from "./layout.js";
import "./reel.css";

/**
 * @module reel-l
 * @description
 * A custom element for creating a responsive grid using the CSS Grid module
 * @property {string} itemWidth=auto The width of each item (child element) in the Reel
 * @property {string} space=var(--s0) The space between Reel items (child elements)
 * @property {string} height=auto The height of the Reel itself
 * @property {boolean} noBar=false Whether to display the scrollbar
 */
export default class Reel extends LayoutElement {
  static override register(): void {
    LayoutElement.register("reel-l", Reel);
  }

  protected override get elementName(): string {
    return "reel";
  }

  toggleOverflowClass(element: Element): void {
    element.classList.toggle(
      "overflowing",
      this.scrollWidth > this.clientWidth,
    );
  }

  get itemWidth(): string {
    return this.getAttribute("itemWidth") ?? "auto";
  }

  set itemWidth(value: string) {
    this.setAttribute("itemWidth", value);
  }

  get height(): string {
    return this.getAttribute("height") ?? "auto";
  }

  set height(value: string) {
    this.setAttribute("height", value);
  }

  get space(): string {
    return this.getAttribute("space") ?? "var(--s0)";
  }

  set space(value: string) {
    this.setAttribute("space", value);
  }

  get noBar(): boolean {
    return this.hasAttribute("noBar");
  }

  set noBar(value: boolean) {
    if (value) {
      this.setAttribute("noBar", "");
    } else {
      this.removeAttribute("noBar");
    }
  }

  static get observedAttributes(): string[] {
    return ["itemWidth", "height", "space", "noBar"];
  }

  protected override getPropsForId(): Array<string | number | boolean> {
    return [this.itemWidth, this.height, this.space, this.noBar];
  }

  protected override instanceStyle(): string {
    return `
      [data-i="${this.i}"] {
        height: ${this.height};
      }

      [data-i="${this.i}"] > * {
        flex: 0 0 ${this.itemWidth};
      }

      [data-i="${this.i}"] > img {
        height: 100%;
        flex-basis: auto;
        width: auto;
      }

      [data-i="${this.i}"] > * + * {
        margin-inline-start: ${this.space};
      }

      [data-i="${this.i}"].overflowing {
        ${this.noBar ? "" : `padding-bottom: ${this.space}`}
      }

      ${
        this.noBar
          ? `
      [data-i="${this.i}"] {
        scrollbar-width: none;
      }

      [data-i="${this.i}"]::-webkit-scrollbar {
        display: none;
      }
      `
          : ""
      }
    `;
  }

  protected override connectedCallback(): void {
    super.connectedCallback();
    if ("ResizeObserver" in globalThis) {
      new ResizeObserver((entries) => {
        if (entries[0]?.target) {
          this.toggleOverflowClass(entries[0].target);
        }
      }).observe(this);
    }

    if ("MutationObserver" in globalThis) {
      new MutationObserver((entries) => {
        if (entries[0]?.target && entries[0].target instanceof Element) {
          this.toggleOverflowClass(entries[0].target);
        }
      }).observe(this, { childList: true });
    }
  }
}
