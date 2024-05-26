"use strict";

if (!window._libTinyComponentLoaded) {
    window._libTinyComponentLoaded = true;
} else {
    console.error("tiny-components.js was already loaded!");
}

const internal = {
    globalIdCounter: 1,
    componentMap: new Map()
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
    func(nodeDOM);

    let nodeList = nodeDOM.querySelectorAll(":scope > innerHTML");
    for (let inner of nodeList) {
        inner.innerHTML = nodeDOM.innerHTMLCached;
    }
}
function createComponentObject(nodeDOM) {
    if (nodeDOM.tinyid == undefined) {
        nodeDOM.tinyid = internal.globalIdCounter++;
        nodeDOM.innerHTMLCached = nodeDOM.innerHTML;

        // Add Attributes to object
        for (let att, i = 0, atts = nodeDOM.attributes, n = atts.length; i < n; i++) {
            att = atts[i];
            nodeDOM[att.nodeName] = att.nodeValue;
        }

        nodeDOM.redraw = function() {
            if (nodeDOM.classList.contains('tiny-component')) {
                nodeDOM.classList.remove('tiny-component');
            }
        };

        nodeDOM.classList.add(`tiny-id-${nodeDOM.tinyid}`);
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

component('include', nodeDOM => {
    if (nodeDOM.value == undefined) {
        console.error('include value missing!');
        return;
    }
    includeHTML(nodeDOM, nodeDOM.value);
});

component('echo', nodeDOM => {
    nodeDOM.innerHTML = eval(nodeDOM.innerHTMLCached);
});