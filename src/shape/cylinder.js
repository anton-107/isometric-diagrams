class Cylinder extends Shape {
  constructor(originPoint, radius=1, numberOfVertices=20, height=1) {
    const circle = new Circle(originPoint, radius, numberOfVertices);
    const cylinder = Shape.extrude(circle, height);
    super(cylinder.paths);
  }
}
