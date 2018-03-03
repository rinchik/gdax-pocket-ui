import Div from '../div';

const div = new Div();

test('Div object should contain Div node', () => {
    expect(div.getElement().nodeName).toBe('DIV');
});
