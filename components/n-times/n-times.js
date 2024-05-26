"use strict";

component('n-times', (node, obj) => {
    if (obj.n == undefined) {
        console.error('The "n-times" Component requires an attribute named n!');
        return;
    }
    
    let n = parseInt(obj.n);
    for (let i = 0; i < n; i++) {
        node.innerHTML += '<innerHTML></innerHTML>';
    }
});