"use strict";

component('n-times', (nodeDOM, obj) => {
    if (obj.n == undefined) {
        console.error('The "n-times" Component requires a attribute named n!');
        return;
    }
    
    let n = parseInt(obj.n);
    for (let i = 0; i < n; i++) {
        nodeDOM.innerHTML += '<innerHTML></innerHTML>';
    }
});