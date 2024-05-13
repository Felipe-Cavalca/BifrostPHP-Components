class customComponents {

    constructor() {
        let elements = this.#getElementsWithPrefix("c-");
        let pathComponents = this.#getUrl("/components/");

        elements.forEach(element => {
            let htmlUrl = pathComponents + element + ".html";
            htmlUrl = htmlUrl.replaceAll("c-","");
            this.#request(htmlUrl).then(htmlComponent => {
                this.#defineCustomElement(element, htmlComponent);
            })
        });
    }

    #getUrl(url) {
        let elem = document.querySelector("[src$='customComponents.js']");
        let src = elem.src;
        let appPath = src.substring(0, src.lastIndexOf("/"));
        return appPath + url;
    }

    #getElementsWithPrefix(prefix) {
        const allElements = Array.from(document.getElementsByTagName('*'));
        const elementsWithPrefix = allElements.filter(element => element.tagName.toLowerCase().startsWith(prefix));
        const tagName = elementsWithPrefix.map(element => element.tagName.toLowerCase());
        const uniqueTags = [...new Set(tagName)];
        return uniqueTags;
    }

    async #request(url) {
        let response = await fetch(url);
        return await response.text();
    }

    #defineCustomElement(nameElement, htmlComponent) {
        class CustomElement extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
            }

            connectedCallback() {
                this.shadowRoot.innerHTML = htmlComponent;
            }
        }

        customElements.define(nameElement, CustomElement);
    }
}

new customComponents();
