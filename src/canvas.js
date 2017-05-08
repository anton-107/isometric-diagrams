class Canvas {
  constructor(element, context) {
    this.element = element;
    this.ctx = this.element.getContext(context);

    console.log('canvas', this.element);
  }

  get width() {
    return this.element.width;
  }

  get height() {
    return this.element.height;
  }

  addPath(points, color) {

    this.ctx.beginPath();
    this.ctx.moveTo(points[0].x, points[0].y);

    points.forEach(p => {
      this.ctx.lineTo(p.x, p.y);
    });

    this.ctx.closePath();

    /* Set the strokeStyle and fillStyle */
    this.ctx.save();

    this.ctx.globalAlpha = color.alpha;
    this.ctx.fillStyle = this.ctx.strokeStyle = color.hex;
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.restore();
  }
}
