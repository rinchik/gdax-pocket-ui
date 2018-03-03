import Div from '../../html/div';


class Loader {
    constructor() {
        const loaderContainer = new Div();
        loaderContainer.addClass('loader-container');
        const loader = new Div();
        loader.addClass('loader').render(loaderContainer);

        return loaderContainer;
    }
}

export default Loader;
