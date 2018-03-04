import Svg from '../../html/svg';

class TickerChart {
    constructor(app) {
        this.app = app;
        this.containerHeight = 80;
        this.containerWidth = window.screen.width;
        this.container = this._getContainer();
        this.lineContainer = new Svg('g');
        this.pointContainer = new Svg('g');
        this.polygonContainer = new Svg('g');
        this.lines = [];
        this.points = [];
        this.polygons = [];
        this.step = 40;

        this.elementsLimit = Math.ceil(this.containerWidth/this.step);


        this.lineContainer.render(this.container);
        this.pointContainer.render(this.container);
        this.polygonContainer.render(this.container);
        return this;
    }

    _getContainer() {
        const container = new Svg('svg');
        container.addClass('ticker-chart');
        container.setProp('width', this.containerWidth);
        container.setProp('height', this.containerHeight);
        container.render(this.app);

        return container;
    }

    addPoint(price) {
        const percent = Math.floor(price - Math.floor(price/100)*100);
        const length = (this.containerHeight / 100 ) * percent;
        const previousLine = this.lines.length ? this.lines[this.lines.length-1] : null;

        const x1 = previousLine ? previousLine.x2 : 5;
        const y1 = previousLine ? previousLine.y2 : this.containerHeight - length;

        const x2 = previousLine ? previousLine.x2 + this.step : this.step;
        const y2 = this.containerHeight - length;

        this._createCircle(x2, y2);
        this._createLine(x1, y1, x2, y2);
        this._createPolygon(x1, y1, x2, y2);

    }

    getElement() {
        return this.container;
    }

    _createLine (x1, y1, x2, y2) {
        const color = '#0074d9';
        const width = 2;
        const aLine = new Svg('line');
        aLine.setProp('x1', x1);
        aLine.setProp('y1', y1);
        aLine.setProp('x2', x2);
        aLine.setProp('y2', y2);
        aLine.setProp('stroke', color);
        aLine.setProp('stroke-width', width);

        this._addLine(aLine)
    }

    _createCircle (x1, y1) {
        const color = '#0074d9';
        const width = 1;
        const circle = new Svg('circle');
        circle.setProp('cx', x1);
        circle.setProp('cy', y1);
        circle.setProp('stroke', color);
        circle.setProp('r', width);
        circle.setProp('fill', color);

        this._addCircle(circle)
    }

    _createPolygon (x1, y1, x2, y2) {
        const color = '#0074d9';
        const width = 1;
        const polygon = new Svg('polygon');
        const polygonRectangle = this._getPolygonRectangle.apply(this, arguments);
        polygon.setNonDomProp('line', arguments);
        polygon.setProp('points', polygonRectangle.join(' '));
        polygon.setProp('stroke', color);
        polygon.setProp('stroke-width', width);

        this._addPolygon(polygon)
    }

    _getPolygonRectangle(x1, y1, x2, y2) {
        let rectangle = [];

        let point1 = [x1, y1];
        rectangle = rectangle.concat(point1);

        let point2 = [x2, y2];
        rectangle = rectangle.concat(point2);

        let point3 = [x2, this.containerHeight];
        rectangle = rectangle.concat(point3);

        let point4 = [x1, this.containerHeight];
        rectangle = rectangle.concat(point4);

        return rectangle;
    }

    _addPolygon(polygon) {
        this.polygons.push(polygon);

        if (this.polygons.length > this.elementsLimit) {
            this._movePolygonsBack();
        }

        polygon.render(this.polygonContainer);
    }

    _movePolygonsBack() {
        this.polygons.shift().remove();

        this.polygons.forEach((polygon) => {
            const updatedX1 = polygon.line[0] - this.step;
            const updatedX2 = polygon.line[2] - this.step;

            const updatedPoligonRectacngle = this._getPolygonRectangle.apply(this, [updatedX1, polygon.line[1], updatedX2, polygon.line[3]]);
            polygon.setProp('points', updatedPoligonRectacngle.join(' '));
        });
    }

    _addLine(line) {
        this.lines.push(line);

        if (this.lines.length > this.elementsLimit) {
            this._moveLinesBack();
        }

        line.render(this.lineContainer);

    }

    _moveLinesBack() {
        this.lines.shift().remove();

        this.lines.forEach((line) => {
            const updatedX1 = line.x1 - this.step;
            const updatedX2 = line.x2 - this.step;
            line.setProp('x1', updatedX1);
            line.setProp('x2', updatedX2);
        });
    }

    _addCircle(circle) {
        this.points.push(circle);

        if (this.points.length > this.elementsLimit) {
            this._movePointsBack();
        }

        circle.render(this.pointContainer);

    }

    _movePointsBack() {
        this.points.shift().remove();

        this.points.forEach((point) => {
            const updatedCx = point.cx - this.step;
            point.setProp('cx', updatedCx);
        });
    }
}


export default TickerChart;
