import Element from '../element';

const div = new Element('div')

test('Element should create HTML element of given type', () => {
    expect(div.getElement().nodeName).toBe('DIV');
});

test('AddClass', () => {
    div.addClass('test-class');
    expect(div.getElement().classList.contains('test-class')).toBe(true);
});

test('RemoveClass', () => {
    div.addClass('test-class-remove');
    div.removeClass('test-class-remove');
    expect(div.getElement().classList.contains('test-class-remove')).toBe(false);
});

test('setProp', () => {
    div.setProp('id', 'testId');
    expect(div.getElement().getAttribute('id')).toBe('testId');
});
