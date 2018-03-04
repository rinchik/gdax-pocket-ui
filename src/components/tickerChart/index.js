import Svg from '../../html/svg';

class TickerChart {
    constructor(app) {
        this.app = app;
        this.containerHeight = 80;
        this.containerWidth = window.screen.width;
        this.container = this._getContainer();
        this.lineContainer = new Svg('g');
        this.pointContainer = new Svg('g');
        this.lines = [];
        this.points = [];

        this.step = 40;

        this.lineContainer.render(this.container);
        this.pointContainer.render(this.container);
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

    _addLine(line) {
        const linesLimit = Math.ceil(this.containerWidth/this.step);

        this.lines.push(line);

        if (this.lines.length > linesLimit) {
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
        const pointsLimit = Math.ceil(this.containerWidth/this.step);

        this.points.push(circle);

        if (this.points.length > pointsLimit) {
            this._movePointssBack();
        }

        circle.render(this.pointContainer);

    }

    _movePointssBack() {
        this.points.shift().remove();

        this.points.forEach((point) => {
            const updatedCx = point.cx - this.step;
            point.setProp('cx', updatedCx);
        });
    }
}


export default TickerChart;
