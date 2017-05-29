class PathWithColor {
  constructor(path, color) {
    this.path = path;
    this.color = color;
  }
}

class Diagram {
  constructor(canvas, offCanvas, options={}) {
    this.canvas = canvas;
    this.angle = Math.PI / 6;
    this.scale = options.scale || 70;

    this._calculateTransformation();

    this.originX = options.originX || this.canvas.width / 2;
    this.originY = options.originY || this.canvas.height / 2;

    /**
     * Light source as defined as the angle from
     * the object to the source.
     *
     * We'll define somewhat arbitrarily for now.
     */
    this.lightPosition = options.lightPosition || new Vector(2, -1, 3);
    this.lightAngle = this.lightPosition.normalize();

    /**
     * The maximum color difference from shading
     */
    this.colorDifference = -0.20;
    this.lightColor = options.lightColor || new Color(255, 255, 255);

    this.pathsToDraw = [];

    this.offCanvas = offCanvas;
    this.offCanvas.clearAll();
    this.offCanvas.drawText("this is a test");
  }

  _calculateTransformation() {
    this.transformation = [
      [
        this.scale * Math.cos(this.angle),
        this.scale * Math.sin(this.angle)
      ],
      [
        this.scale * Math.cos(Math.PI - this.angle),
        this.scale * Math.sin(Math.PI - this.angle)
      ]
    ];
  }

  addShape(shape, color) {
    shape.orderedPaths.forEach(p => this.addPath(p, color));
  }

  addPath(path, baseColor = new Color(120, 120, 120)) {

    /* Compute color */
    const v1 = Vector.fromTwoPoints(path.points[1], path.points[0]);
    const v2 = Vector.fromTwoPoints(path.points[2], path.points[1]);

    const normal = Vector.crossProduct(v1, v2).normalize();

    /**
     * Brightness is between -1 and 1 and is computed based
     * on the dot product between the light source vector and normal.
     */
    const brightness = Vector.dotProduct(normal, this.lightAngle);
    const color = baseColor.lighten(brightness * this.colorDifference, this.lightColor);

    this.pathsToDraw.push(new PathWithColor(path, color));
  }

  draw() {
    // order paths:
    const paths = this.pathsToDraw.sort(function(pathA, pathB) {
      return pathB.path.depth - pathA.path.depth;
    });

    // draw path:
    paths.forEach(pathWithColor => {
      this.canvas.addPath(pathWithColor.path.points.map(this.translatePoint.bind(this)), pathWithColor.color);
    });
  }

  translatePoint(point) {
    /**
     * X rides along the angle extended from the origin
     * Y rides perpendicular to this angle (in isometric view: PI - angle)
     * Z affects the y coordinate of the drawn point
     */
    const xMap = new Point(point.x * this.transformation[0][0],
      point.x * this.transformation[0][1]);

    const yMap = new Point(point.y * this.transformation[1][0],
      point.y * this.transformation[1][1]);

    const x = this.originX + xMap.x + yMap.x;
    const y = this.originY - xMap.y - yMap.y - (point.z * this.scale);

    return new Point(x, y);
  }
}
