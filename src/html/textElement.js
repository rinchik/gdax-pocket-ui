import Element from './element';

class TextElement extends Element{

    text(text) {
        if (this.textNode) {
            this.textNode.nodeValue = text;
            return this;
        }

        this.textNode = document.createTextNode(text);
        this.element.appendChild(this.textNode);
        return this;
    }

}

export default TextElement;