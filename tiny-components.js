"use strict";

if (!window._libTinyComponentLoaded) {
    window._libTinyComponentLoaded = true;
} else {
    console.error("tiny-components.js was already loaded!");
}

const internal = {
    globalIdCounter: 1,
    componentMap: new Map(),
    domToObjMap: new Map()
};

function includeHTML(nodeDOM, path) {
    try {
        fetch(path).then(response => {
            response.text().then(txt => {
                nodeDOM.innerHTML += txt;
            });
        });
    } catch(error) {
        console.error("Include Error:", error);
    }
}

function constructComponentInnerHTML(nodeDOM, func) {
    nodeDOM.innerHTML = "";
    func(nodeDOM, internal.domToObjMap.get(nodeDOM));

    let nodeList = nodeDOM.querySelectorAll(":scope > innerHTML");
    for (let inner of nodeList) {
        inner.innerHTML = internal.domToObjMap.get(nodeDOM).innerHTML;
    }
}
function createComponentObject(nodeDOM) {
    if (!internal.domToObjMap.has(nodeDOM)) {
        let obj = {};
        obj.tinyid = internal.globalIdCounter++;
        obj.innerHTML = nodeDOM.innerHTML;

        // Add Attributes to object
        for (let att, i = 0, atts = nodeDOM.attributes, n = atts.length; i < n; i++) {
            att = atts[i];
            obj[att.nodeName] = att.nodeValue;
        }

        obj.redraw = function() {
            if (nodeDOM.classList.contains('tiny-component')) {
                nodeDOM.classList.remove('tiny-component');
            }
        };

        internal.domToObjMap.set(nodeDOM, obj);
        nodeDOM.classList.add(`tiny-id-${obj.tinyid}`);
    }
}

function initializeComponent(nodeDOM, func) {
    if (!nodeDOM.classList.contains('tiny-component')) {
        nodeDOM.classList.add('tiny-component');
        createComponentObject(nodeDOM);
        constructComponentInnerHTML(nodeDOM, func);
    }
}

function initializeAllComponents() {
    for (let comp of internal.componentMap) {
        let nodeList = document.querySelectorAll(comp[0]);
        for (let nodeDOM of nodeList) {
            initializeComponent(nodeDOM, comp[1]);
        }
    }
}

function component(tag, func) {
    internal.componentMap.set(tag, func);
}

document.addEventListener("DOMContentLoaded", (event) => {
    initializeAllComponents();
});
const observer = new MutationObserver((mutations) => {
    initializeAllComponents();
});
observer.observe(document.querySelector('body'), {
    subtree: true,
    childList: true,
    attributes: true,
});


/* Built-in Components */

component('include', (nodeDOM, obj) => {
    if (obj.value == undefined) {
        console.error('include value missing!');
        return;
    }
    includeHTML(nodeDOM, obj.value);
});

component('echo', (nodeDOM, obj) => {
    nodeDOM.innerHTML = eval(obj.innerHTML);
});