"use strict";

component('if', (node, state) => {
    if (state.cond == undefined) {
        console.error('The "if" Component requires an attribute named cond!');
        return;
    }
    
    state.result = eval(state.cond);
    if (state.result) {
        node.innerHTML = state.innerHTML;
    }

    let elseComponent = select(`if.tiny-id-${state.tinyid} + else`);
    if (elseComponent != null && elseComponent != undefined) {
        elseComponent.ifResult = state.result;
        if (getState(elseComponent) != undefined) {
            getState(elseComponent).redraw();
        }
    }
});

component('else', (node, state) => {
    if (node.ifResult == undefined) {
        return;
    }
    
    if (!node.ifResult) {
        node.innerHTML = state.innerHTML;
    }
});