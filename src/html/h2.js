import TextElement from './textElement';

class H2 extends TextElement{

    constructor(id) {
        super('h2');

        id && this.setProp('id', id);

        return this;
    }
}

export default H2;