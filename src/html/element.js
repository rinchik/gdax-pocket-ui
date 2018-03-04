
class Element {

    constructor(type) {
        this.element = document.createElement(type);
    }

    getElement() {
        return this.element;
    }

    addEvent(event, handler) {
        this.element.addEventListener(event, handler, false);
        return this;
    }

    setProp(property, value) {
        this[property] = value;
        this.element.setAttribute(property, value);
        return this;
    }

    setNonDomProp(property, value) {
        this[property] = value;
        return this;
    }

    addClass(className) {
        this.element.classList.add(className);
        return this;
    }

    removeClass(className) {
        this.element.classList.remove(className);
        return this;
    }

    toggleClass(className) {
        this.element.classList.toggle(className);
        return this;
    }

    render(parent) {
        parent.element ? parent.element.appendChild(this.element): parent.appendChild(this.element);
        return this;
    }

    remove() {
        this.element.remove();
    }
}

export default Element;