import Element from './element';

class Div extends Element{

    constructor(id) {
        super('div');

        id && this.setProp('id', id);

        return this;
    }
}

export default Div;