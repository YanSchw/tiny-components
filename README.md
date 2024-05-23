# &lt;tiny-components&gt;

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

## Examples
Here are some examples:
- https://YanSchw.github.io/tiny-components/example/index.html