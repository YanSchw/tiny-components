
const tiny = {
    initializeAllComponents() {

        console.log('initializeAllComponents()');
    },
    component(tag, func) {
        console.log(tag);
    }
};

Object.freeze(tiny);

export default tiny;

document.addEventListener("DOMContentLoaded", (event) => {
    tiny.initializeAllComponents();
});
console.log('hi()');