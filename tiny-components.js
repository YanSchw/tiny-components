"use strict";

if (!window._libTinyComponentLoaded) {
    window._libTinyComponentLoaded = true;
} else {
    console.error("tiny-components.js was already loaded!");
}

const internal = {
    globalIdCounter: 1,
    componentMap: new Map(),
    domToStateMap: new Map()
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
    func(nodeDOM, internal.domToStateMap.get(nodeDOM));

    let nodeList = nodeDOM.querySelectorAll(":scope > innerHTML");
    for (let inner of nodeList) {
        inner.innerHTML = internal.domToStateMap.get(nodeDOM).innerHTML;
    }
}
function createComponentObject(nodeDOM) {
    if (!internal.domToStateMap.has(nodeDOM)) {
        let state = {};
        state.tinyid = internal.globalIdCounter++;
        state.innerHTML = nodeDOM.innerHTML;

        // Add Attributes to state object
        for (let att, i = 0, atts = nodeDOM.attributes, n = atts.length; i < n; i++) {
            att = atts[i];
            state[att.nodeName] = att.nodeValue;
        }

        state.redraw = function() {
            if (nodeDOM.classList.contains('tiny-component')) {
                nodeDOM.classList.remove('tiny-component');
            }
        };

        internal.domToStateMap.set(nodeDOM, state);
        nodeDOM.classList.add(`tiny-id-${state.tinyid}`);
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

            let init = true;

            for (let otherComp of internal.componentMap) {
                if (nodeDOM.parentElement.closest(`${otherComp[0]}:not(.tiny-component)`) != null) {
                    // There is an uninitialized Parent
                    setTimeout(() => { initializeAllComponents(); }, 0);
                    init = false;
                    break;
                }
            }

            if (init) {
                initializeComponent(nodeDOM, comp[1]);
            }
        }
    }
}

function component(tag, func) {
    internal.componentMap.set(tag, func);
}
function getState(node) {
    return internal.domToStateMap.get(node);
}

function select(cssSelector) {
    return document.querySelector(cssSelector);
}
function selectAll(cssSelector) {
    return document.querySelectorAll(cssSelector);
}
function createNode(tag, parent, lambda) {
    let element = document.createElement(tag);
    lambda(element);
    parent.appendChild(element);
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