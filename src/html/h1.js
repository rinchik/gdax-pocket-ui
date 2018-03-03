import TextElement from './textElement';

class H1 extends TextElement{

    constructor(id) {
        super('h1');

        id && this.setProp('id', id);

        return this;
    }
}

export default H1;