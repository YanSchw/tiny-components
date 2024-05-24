# &lt;tiny-components&gt;

This is a lightweight JavaScript library, that allows you to dynamically create reuseable Components through HTML Tags.
You will use plain and standard HTML with custom elements. However the library only comes with 2 built-in Component, so there is no bloat, no new HTML dialect or syntax sugar to learn.

## What is a Component?

## Embed &lt;tiny-components&gt; into your Website
Add the following script tag as the first script of your html document.
```HTML
<script src="https://YanSchw.github.io/tiny-components/tiny-components.js"></script>
```

## Create your first Component
First, define your Component in JavaScript.
```js
component('my-hello-world-component', (nodeDOM, obj) => {
    nodeDOM.innerHTML = obj.sometextvalue;
});
```
Then, add an HTML Tag that has the same name as your Component into the DOM.
```HTML
<my-hello-world-component sometextvalue="Hello!"></my-hello-world-component>
```
Attributes you define in the HTML are available as Attributes in the JavaScript object.

**'Hello!'** now appears in the Component's place.

## Redrawing Components
If you want to redraw a Component, you have to explicitly tell the library to do so.
```js
component('my-redrawing-button', (nodeDOM, obj) => {
    let button = document.createElement('button');
    button.innerHTML = 'Redraw this Component';
    button.onclick = () => {
        obj.redraw();
    };
    nodeDOM.appendChild(button);
});
```

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

## Examples
Here are some examples:
- https://YanSchw.github.io/tiny-components/examples/hello-world/index.html
- https://YanSchw.github.io/tiny-components/examples/counter/index.html