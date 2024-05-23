# Components HTML

componentes html personalizados para facilitar o desenvolvimento de paginas web e reduzir o código repetido

## Instalação

Para instalar e utilizar os componentes HTML personalizados em seu projeto, siga os passos abaixo:

1. Baixe o arquivo `customComponents.js` do repositório.
1. Adicione o arquivo baixado ao seu projeto.
1. Inclua o arquivo `customComponents.js` em seu arquivo HTML usando a tag `<script>`. Por exemplo:

```html
<script src="caminho/para/o/arquivo/customComponents.js"></script>
```

## Uso

Por padrão, o script `customComponents.js` tenta listar os componentes a partir da URL `/components`. No entanto, se necessário, você pode alterar essa configuração padrão.

### Exemplo

Se você tiver um arquivo chamado `navbar.html` na pasta de componentes, você pode usar o componente personalizado correspondente em seu HTML simplesmente criando a tag `<c-navbar></c-navbar>`.

Este padrão se aplica a qualquer arquivo na pasta de componentes. Para usar o componente personalizado, basta criar uma tag com o prefixo `c-` seguido pelo nome do arquivo.

Por exemplo, se você tiver um arquivo `header.html`, você pode usar o componente correspondente com a tag `<c-header></c-header>`.
