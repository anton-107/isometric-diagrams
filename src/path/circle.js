class Circle extends Path {
  constructor(centerPoint, radius, numberOfVertices = 20) {

    const points = [];

    for (let i = 0; i < numberOfVertices; i++) {
      points.push(
        new Point(
          radius * Math.cos(i * 2 * Math.PI / numberOfVertices),
          radius * Math.sin(i * 2 * Math.PI / numberOfVertices),
          0
        )
      );
    }

    super((new Path(points)).translate(centerPoint.x, centerPoint.y, centerPoint.z).points);
  }
}
