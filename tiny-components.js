
if (!window._libTinyComponentLoaded) {
    window._libTinyComponentLoaded = true;
} else {
    console.error("tiny-components.js was already loaded!");
}

const internal = {
    initializeAllComponents() {
        console.log('initializeAllComponents()');
    },
    
};



function component(tag, func) {
    console.log(tag);
}