"use strict";

component('if', (nodeDOM, obj) => {
    if (obj.cond == undefined) {
        console.error('The "if" Component requires an attribute named cond!');
        return;
    }
    
    obj.result = eval(obj.cond);
    if (obj.result) {
        nodeDOM.innerHTML = obj.innerHTML;
    }

    let elseComponent = select(`if.tiny-id-${obj.tinyid} + else`);
    if (elseComponent != null && elseComponent != undefined) {
        elseComponent.ifResult = obj.result;
        internal.domToObjMap.get(elseComponent).redraw();
    }
});

component('else', (nodeDOM, obj) => {
    if (nodeDOM.ifResult == undefined) {
        return;
    }
    
    if (!nodeDOM.ifResult) {
        nodeDOM.innerHTML = obj.innerHTML;
    }
});