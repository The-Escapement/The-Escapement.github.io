/**
 * @module layout
 * @description
 * Base class for layout custom elements that provides common functionality
 * for rendering, attribute handling, and registration
 */
export abstract class LayoutElement extends HTMLElement {
  static register(
    tagName: string,
    elementClass: new () => LayoutElement,
  ): void {
    if ("customElements" in globalThis) {
      customElements.define(tagName, elementClass);
    }
  }

  protected callbackRender = true;
  protected i!: string;
  protected readonly render: () => void;
  protected abstract readonly elementName: string;

  constructor() {
    super();
    this.render = (): void => {
      this.generateId();
      this.dataset["i"] = this.i;
      this.injectStyles();
    };
  }

  protected connectedCallback(): void {
    this.render();
  }

  protected attributeChangedCallback(): void {
    this.render();
  }

  protected abstract getPropsForId(): Array<string | number | boolean>;
  protected abstract instanceStyle(): string;

  private generateId(): void {
    const props = this.getPropsForId();
    const fullId = `${this.elementName}-${props.join("-")}`;
    this.i = fullId.replaceAll(/[^\w-]/g, "_");
  }

  private injectStyles(): void {
    if (!document.querySelector(`#${this.i}`)) {
      const styleElement = document.createElement("style");
      styleElement.id = this.i;
      styleElement.innerHTML = this.instanceStyle()
        .replaceAll(/\s\s+/g, " ")
        .trim();
      document.head.append(styleElement);
    }
  }
}
