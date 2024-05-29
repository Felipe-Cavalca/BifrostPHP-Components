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

    /**
     * Obtém o valor do atributo especificado do elemento tagScript.
     *
     * @param {string} data - O nome do atributo.
     * @returns {string} O valor do atributo especificado.
     */
    #getData(data) {
        return this.#tagScript.getAttribute(data);
    }

    /**
     * Carrega os elementos personalizados.
     *
     * @param {Array} elements - Os elementos a serem carregados.
     * @returns {void}
     */
    #loadElements(elements) {
        elements.forEach(element => {
            let htmlUrl = this.#pathComponents + element + ".html";
            htmlUrl = htmlUrl.replaceAll(this.#prefix, "");
            this.#request(htmlUrl).then(htmlComponent => {
                this.#defineCustomElement(element, htmlComponent);
            })
        });
    }

    /**
     * Retorna uma lista de tags HTML únicas que possuem um determinado prefixo.
     *
     * @param {string} prefix - O prefixo a ser procurado nas tags HTML.
     * @returns {string[]} - Uma lista de tags HTML únicas que possuem o prefixo especificado.
     */
    #getElementsWithPrefix(prefix) {
        const allElements = Array.from(document.getElementsByTagName('*'));
        const elementsWithPrefix = allElements.filter(element => element.tagName.toLowerCase().startsWith(prefix));
        const tagName = elementsWithPrefix.map(element => element.tagName.toLowerCase());
        const uniqueTags = [...new Set(tagName)];
        return uniqueTags;
    }

    /**
     * Faz uma requisição assíncrona para a URL especificada e retorna o conteúdo da resposta como texto.
     * @param {string} url - A URL para a qual a requisição será feita.
     * @returns {Promise<string>} Uma Promise que resolve com o conteúdo da resposta como texto.
     */
    async #request(url) {
        let response = await fetch(url);
        return await response.text();
    }

    /**
     * Define um elemento personalizado.
     *
     * @param {string} nameElement - O nome do elemento personalizado.
     * @param {string} htmlComponent - O conteúdo HTML do elemento personalizado.
     */
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
