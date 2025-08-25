import { LayoutElement } from "./layout.js";
import "./stack.css";

/**
 * @module stack-l
 * @description
 * A custom element for injecting white space (margin) between flow
 * (block) elements along a vertical axis.
 * @property {string} space=var(--s1) A CSS `margin` value
 * @property {boolean} recursive=false Whether the spaces apply recursively (i.e. regardless of nesting level)
 * @property {number} splitAfter=null The element after which to _split_ the stack with an auto margin
 */
export default class Stack extends LayoutElement {
  static override register(): void {
    LayoutElement.register("stack-l", Stack);
  }

  protected override get elementName(): string {
    return "stack";
  }

  get space(): string {
    return this.getAttribute("space") ?? "var(--s1)";
  }

  set space(value: string) {
    this.setAttribute("space", value);
  }

  get recursive(): boolean {
    return this.hasAttribute("recursive");
  }

  set recursive(value: boolean) {
    if (value) {
      this.setAttribute("recursive", "");
    } else {
      this.removeAttribute("recursive");
    }
  }

  get splitAfter(): number | undefined {
    const value = this.getAttribute("splitAfter");
    return value ? Number.parseInt(value, 10) : undefined;
  }

  set splitAfter(value: number | undefined) {
    if (value === undefined) {
      this.removeAttribute("splitAfter");
    } else {
      this.setAttribute("splitAfter", value.toString());
    }
  }

  static get observedAttributes(): string[] {
    return ["space", "recursive", "splitAfter"];
  }

  protected override getPropsForId(): Array<string | number | boolean> {
    return [this.space, this.recursive, this.splitAfter ?? "none"];
  }

  protected override instanceStyle(): string {
    return `
      [data-i="${this.i}"]${this.recursive ? "" : " >"} * + * {
        margin-block-start: ${this.space};
      }

      ${
        this.splitAfter
          ? `
        [data-i="${this.i}"]:only-child {
          block-size: 100%;
        }

        [data-i="${this.i}"] > :nth-child(${this.splitAfter}) {
          margin-block-end: auto;
        }`
          : ""
      }
    `;
  }
}
