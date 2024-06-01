# HTML Components

> Documentation in Portuguese / Documentação em português:
> [README-PT.md](README-PT.md)

Custom html components to facilitate web page development and reduce repeated code

## Installation

To install and use custom HTML components in your project, follow the steps below:

1. Download the latest version of the `customComponents.js` file from this [link](https://github.com/Felipe-> Cavalca/BifrostPHP-Components/releases/latest).
1. Add the downloaded file to your project.
1. Include the `customComponents.js` file in your HTML file using the `<script>` tag. For example:

```html
<script src="path/to/file/customComponents.js"></script>
```

## Usage

By default, the `customComponents.js` script tries to list components from the URL `/components`. However, if necessary, you can change this default setting.

### Example

If you have a file called `navbar.html` in the components folder, you can use the corresponding custom component in your HTML by simply creating the `<c-navbar></c-navbar>` tag.

This pattern applies to any file in the components folder. To use the custom component, simply create a tag with the prefix `c-` followed by the file name.

For example, if you have a `header.html` file, you can use the corresponding component with the `<c-header></c-header>` tag.

## Settings

You can customize the path and prefix of custom components by including the `customComponents.js` script in your HTML file.

Here is an example of how you can do this:

```html
<script path="/components" prefix="c-" src="path/to/file/customComponents.js"></script>
```

In this example, the path attribute defines the path from where the script will list the components. The prefix attribute defines the prefix that will be used to create custom component tags.

For example, if you set the prefix to `v-`, you would use the `<v-navbar></v-navbar>` tag to use the navbar.html component.

You can set the prefix to any string you want, as long as it supports HTML tag syntax.

## Releases

Whenever a Pull Request is approved and merged, a new pre-release is automatically created by our GitHub Actions workflow. This allows us to test new changes in a pre-production environment before officially releasing them.

Official release versions, however, are created manually. This gives us the opportunity to ensure everything is working as expected in the pre-release environment before making the changes available to all users.

## Sponsored by

- @JoaoSto
