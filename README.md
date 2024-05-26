# &lt;tiny-components&gt;

This is a lightweight JavaScript library, that allows you to dynamically create reuseable Components through HTML Tags.
You will use plain and standard HTML with custom elements. However the library only comes with 2 built-in Component, so there is no bloat, no new HTML dialect, no boilerplate, no syntax sugar to learn.

## Embed &lt;tiny-components&gt; into your Website
Add the following script tag as the first script of your html document.
```HTML
<script src="https://YanSchw.github.io/tiny-components/tiny-components.js"></script>
```

## What is a Component?
A Component is just a HTML Tag and an anonymous **Create-Function** (see below).
This function takes in:
- A **node** this is the Node | Element in the DOM. It is the same object you retrieve e.g. through document.querySelector(...);
- A **state** this is tiny-components State of this DOM object. You can use it to do common operations on your element.

## Create your first Component
First, define your Component in JavaScript.
```js
component('my-hello-world-component', (node, state) => {
    node.innerHTML = state.sometextvalue;
});
```
Then, add an HTML Tag that has the same name as your Component into the DOM.
```HTML
<my-hello-world-component sometextvalue="Hello!"></my-hello-world-component>
```
Attributes you define in the HTML are available as Attributes in the JavaScript **state**.

**'Hello!'** now appears in the Component's place.

## Redrawing Components
If you want to redraw a Component, you have to explicitly tell the library to do so.
```js
component('my-redrawing-button', (node, state) => {
    let button = document.createElement('button');
    button.innerHTML = 'Redraw this Component';
    button.onclick = () => {
        state.redraw();
    };
    node.appendChild(button);
});
```

## Using select() and selectAll()
Using these functions your can spare some typing:
```js
function select(cssSelector) {
    return document.querySelector(cssSelector);
}
function selectAll(cssSelector) {
    return document.querySelectorAll(cssSelector);
}
```

## Creating DOM Nodes | Elements dynamically

Using this function
```js
function createNode(tag, parent, lambda) {
    let element = document.createElement(tag);
    lambda(element);
    parent.appendChild(element);
}
```
you can easily create new DOM Elementes as one-liners or nest them within each other. For example:
```js
createNode('div', select('body'), div => {
    createNode('p', div, p => p.innerText = 'Hello!');
});
```
creates a 'Hello!' Paragraph within a div within the HTML body.

## Built-in Components

#### &lt;include value="..."&gt;
The built-in **include** Component is a C-like cut-and-paste tool, that let's you inject HTML-Text.
```HTML
<include value="/html/navigation.html"></include>
```

#### &lt;echo&gt;
The built-in **echo** Component Parses a block of JavaScript and puts the last evaluated expression into the innerHTML.
```HTML
<echo>
    let a = "<p>he";
    let b = "llo</p>";
    a + b;
</echo>
```
This creates a Paragraph, that says **hello**

## Additional Components
- https://yanschw.github.io/tiny-components/components/if/index.html

## Examples
Here are some examples:
- https://YanSchw.github.io/tiny-components/examples/hello-world/index.html
- https://YanSchw.github.io/tiny-components/examples/counter/index.html