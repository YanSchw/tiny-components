"use strict";

component('n-times', nodeDOM => {
    if (nodeDOM.n == undefined) {
        console.error('The "n-times" Component requires an attribute named n!');
        return;
    }
    
    let n = parseInt(nodeDOM.n);
    for (let i = 0; i < n; i++) {
        nodeDOM.innerHTML += '<innerHTML></innerHTML>';
    }
});