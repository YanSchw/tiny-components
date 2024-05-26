"use strict";

component('if', nodeDOM => {
    if (nodeDOM.cond == undefined) {
        console.error('The "if" Component requires an attribute named cond!');
        return;
    }
    
    nodeDOM.result = eval(nodeDOM.cond);
    if (nodeDOM.result) {
        nodeDOM.innerHTML = nodeDOM.innerHTMLCached;
    }

    let elseComponent = select(`if.tiny-id-${nodeDOM.tinyid} + else`);
    if (elseComponent != null && elseComponent != undefined) {
        elseComponent.ifResult = nodeDOM.result;
        elseComponent.redraw();
    }
});

component('else', nodeDOM => {
    if (nodeDOM.ifResult == undefined) {
        return;
    }
    
    if (!nodeDOM.ifResult) {
        nodeDOM.innerHTML = nodeDOM.innerHTMLCached;
    }
});