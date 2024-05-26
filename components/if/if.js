"use strict";

component('if', (nodeDOM, state) => {
    if (state.cond == undefined) {
        console.error('The "if" Component requires an attribute named cond!');
        return;
    }
    
    state.result = eval(state.cond);
    if (state.result) {
        nodeDOM.innerHTML = state.innerHTML;
    }

    let elseComponent = select(`if.tiny-id-${state.tinyid} + else`);
    if (elseComponent != null && elseComponent != undefined) {
        elseComponent.ifResult = state.result;
        getState(elseComponent).redraw();
    }
});

component('else', (nodeDOM, state) => {
    if (nodeDOM.ifResult == undefined) {
        return;
    }
    
    if (!nodeDOM.ifResult) {
        nodeDOM.innerHTML = state.innerHTML;
    }
});