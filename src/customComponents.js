class customComponents {

    #tagScript = document.currentScript;
    #prefix;
    #pathComponents;

    constructor(prefix = "c-", pathComponents = "/components/") {
        this.#prefix = this.#getData("prefix") ?? prefix;
        this.#pathComponents = this.#getData("path") ?? pathComponents;
        let elements = this.#getElementsWithPrefix(this.#prefix);
        this.#loadElements(elements);
    }

    #getData(data) {
        return this.#tagScript.getAttribute(data);
    }

    #loadElements(elements) {
        elements.forEach(element => {
            let htmlUrl = this.#pathComponents + element + ".html";
            htmlUrl = htmlUrl.replaceAll(this.#prefix, "");
            this.#request(htmlUrl).then(htmlComponent => {
                this.#defineCustomElement(element, htmlComponent);
            })
        });
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
                this.#prepareScripts();
            }

            #prepareScripts() {
                const scripts = this.shadowRoot.querySelectorAll('script');
                if(scripts.length < 1) return;
                scripts.forEach(script => {
                    const newScript = document.createElement('script');
                    newScript.textContent = script.textContent;
                    newScript.type = script.type || 'text/javascript';
                    this.shadowRoot.appendChild(newScript);
                });
                // Executa a função do script no contexto do componente
                if (typeof initializeComponentScript === 'function') {
                    initializeComponentScript(this);
                }
            }
        }

        customElements.define(nameElement, CustomElement);
    }
}

new customComponents();
