
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

function constructComponentInnerHTML(nodeDOM, func) {
    func(nodeDOM, internal.domToObjMap.get(nodeDOM));
}
function createComponentObject(nodeDOM) {
    if (!internal.domToObjMap.has(nodeDOM)) {
        let obj = {};
        obj.tinyid = internal.globalIdCounter++;
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
});