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

  clearAll() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  drawText(text) {
    this.ctx.font = "36px Helvetica,sans-serif";
    this.ctx.fillText(text, 2, 36);

    const size = 10;
    const threshold = 130;
    const textData = this.ctx.getImageData(0, 0, this.width, this.height);
    console.log('textData', textData.length);
    console.log(this.width, this.height);


    for (let y = 0; y <= this.height; y++) {
      for (let x = 0; x <= this.width; x++) {
        // check pixel
        var index = (y * textData.width + x) * 4;

        if (textData.data[index + 3] > threshold) {
          console.log(x, y);

          // Point3D(x * (size - 2), y * (size - 2), 0)
        }

      }
    }
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
