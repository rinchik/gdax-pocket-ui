import Controlls from './index';

test("Controls should render sell and buy buttons", () => {
    const controls = new Controlls();

    expect(controls.getElement().querySelector("[class*='buy']")).toBeTruthy();
    expect(controls.getElement().querySelector("[class*='sell']")).toBeTruthy();
});

test("Click on buy should trigger buy()", () => {
    const mockFunction = jest.fn();
    Controlls.prototype.buy = mockFunction;
    const controls = new Controlls();

    controls.getElement().querySelector("[class*='buy']").click();

    expect(mockFunction.mock.calls.length).toBe(1);
});

test("Click on sell should trigger sell()", () => {
    const mockFunction = jest.fn();
    Controlls.prototype.sell = mockFunction;

    const controls = new Controlls();

    controls.getElement().querySelector("[class*='sell']").click();

    expect(mockFunction.mock.calls.length).toBe(1);
})