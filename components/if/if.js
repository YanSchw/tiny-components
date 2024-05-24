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
});