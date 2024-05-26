"use strict";

if (!window._libTinyComponentLoaded) {
    window._libTinyComponentLoaded = true;
} else {
    console.error("tiny-components.js was already loaded!");
}

const internal = {
    globalIdCounter: 1,
    componentMap: new Map(),
    idToStateMap: new Map()
};

function includeHTML(node, path) {
    try {
        fetch(path).then(response => {
            response.text().then(txt => {
                node.innerHTML += txt;
            });
        });
    } catch(error) {
        console.error("Include Error:", error);
    }
}

function constructComponentInnerHTML(node, func) {
    node.innerHTML = "";
    func(node, getState(node));

    let nodeList = node.querySelectorAll(":scope > innerHTML");
    for (let inner of nodeList) {
        inner.innerHTML = getState(node).innerHTML;
    }
}
function createComponentObject(node) {
    if (getState(node) == undefined || getState(node) == null) {
        let state = {};
        state.tinyid = internal.globalIdCounter++;
        state.innerHTML = node.innerHTML;

        // Add Attributes to state object
        for (let att, i = 0, atts = node.attributes, n = atts.length; i < n; i++) {
            att = atts[i];
            state[att.nodeName] = att.nodeValue;
        }

        state.redraw = function() {
            if (node.classList.contains('tiny-component')) {
                node.classList.remove('tiny-component');
            }
        };

        internal.idToStateMap.set(state.tinyid, state);
        node.classList.add(`tiny-id-${state.tinyid}`);
    }
}

function initializeComponent(node, func) {
    if (!node.classList.contains('tiny-component')) {
        node.classList.add('tiny-component');
        createComponentObject(node);
        constructComponentInnerHTML(node, func);
    }
}

function initializeAllComponents() {
    for (let comp of internal.componentMap) {
        let nodeList = document.querySelectorAll(comp[0]);
        for (let node of nodeList) {

            let init = true;

            for (let otherComp of internal.componentMap) {
                if (node.parentElement.closest(`${otherComp[0]}:not(.tiny-component)`) != null) {
                    // There is an uninitialized Parent
                    setTimeout(() => { initializeAllComponents(); }, 0);
                    init = false;
                    break;
                }
            }

            if (init) {
                initializeComponent(node, comp[1]);
            }
        }
    }
}

function component(tag, func) {
    internal.componentMap.set(tag, func);
}
function getState(node) {
    for (let it of node.classList) {
        if (it.startsWith('tiny-id-')) {
            return internal.idToStateMap.get(parseInt(it.substring(8)));
        }
    }
    return undefined;
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

component('include', (node, obj) => {
    if (obj.value == undefined) {
        console.error('include value missing!');
        return;
    }
    includeHTML(node, obj.value);
});

component('echo', (node, obj) => {
    node.innerHTML = eval(obj.innerHTML);
});