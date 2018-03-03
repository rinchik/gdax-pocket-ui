import TextElement from './textElement';

class Link extends TextElement{

    constructor(text, clickHandler) {
        super('a');

        text && this.text(text);
        this.addEvent('click', clickHandler);
        this.addClass('link');

        return this;
    }
}

export default Link;