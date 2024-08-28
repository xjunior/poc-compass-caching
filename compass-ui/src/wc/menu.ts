import { fetchServiceData, MenuItem } from "../fetchBackendsData";

class CompassMenu extends HTMLUListElement {
  constructor() {
    super();

    const containerTemplate = document.createElement("template");
    containerTemplate.innerHTML = `
       <slot></slot>
    `;

    const style = document.createElement("style");
    style.textContent = `
      :host {
      }
    `;
  
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(style);
  }
}

// Create a class for the element
class CompassMenuBackend extends HTMLElement {
  static observedAttributes = ["items"]

  constructor() {
    super();

    this.setAttribute("role", "menu");
    // this.attachShadow({ mode: "open" });
    this.classList.add("menu-item");
  }

  set items(items: MenuItem[]) {
    this.setAttribute("items", JSON.stringify(items));
  }

  get items(): MenuItem[] {
    return JSON.parse(this.getAttribute("items") || '[]')
  }

  async connectedCallback() {
    if (this.hasAttribute("uri")) {
      this.items = await fetchServiceData(this.getAttribute("uri")!)  
    }
  }

  renderRecursiveItems(item: MenuItem): string {
    const nested = item.items ? item.items.map(this.renderRecursiveItems) : undefined;

    return `
      <li>
        <a href="${item.url ?? '#'}">${item.label}</a>
        ${nested ? `<ul>${nested.join('')}</ul>` : ''}
      </li>
    `
  }
  
  attributeChangedCallback(_attr: string, _oldVal: any, _newVal: any) {
    const renderedItems = this.items.map(this.renderRecursiveItems.bind(this));
    this.innerHTML = renderedItems.join('')
  }
}

// Define the new element
customElements.define("compass-menu-backend", CompassMenuBackend);
customElements.define("compass-menu", CompassMenu, { extends: "ul" });