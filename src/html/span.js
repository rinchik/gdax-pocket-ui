import TextElement from './textElement';

class Span extends TextElement{

    constructor(text) {
        super('span');

        text && this.text(text);

        return this;
    }
}

export default Span;