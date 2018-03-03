import TextElement from './textElement';

class Button extends TextElement{

    constructor(title, clickHandler) {
        super('button');

        this.text(title);
        this.addEvent('click', clickHandler);
        this.addClass('button');

        return this;
    }
}

export default Button;