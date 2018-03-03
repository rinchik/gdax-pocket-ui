import Element from './element';

class Svg extends Element {

    constructor(element) {
        super('div');
        this.ns = "http://www.w3.org/2000/svg";
        this.element = document.createElementNS(this.ns, element);
    }

}

export default Svg;
