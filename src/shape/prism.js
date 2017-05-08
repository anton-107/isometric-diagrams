class Prism extends Shape {
  constructor(originPoint, dx = 1, dy = 1, dz = 1) {
    /* Square parallel to the x-axis */
    const face1 = new Path([
      originPoint,
      new Point(originPoint.x + dx, originPoint.y, originPoint.z),
      new Point(originPoint.x + dx, originPoint.y, originPoint.z + dz),
      new Point(originPoint.x, originPoint.y, originPoint.z + dz)
    ]);

    const face1r = face1.reverse().translate(0, dy, 0);

    /* Square parallel to the y-axis */
    const face2 = new Path([
      originPoint,
      new Point(originPoint.x, originPoint.y, originPoint.z + dz),
      new Point(originPoint.x, originPoint.y + dy, originPoint.z + dz),
      new Point(originPoint.x, originPoint.y + dy, originPoint.z)
    ]);

    const face2r = face2.reverse().translate(dx, 0, 0);

    /* 
     Square parallel to the xy-plane 
     This surface is oriented backwards, so we need to reverse the points
     */
    const face3 = (new Path([
      originPoint,
      new Point(originPoint.x + dx, originPoint.y, originPoint.z),
      new Point(originPoint.x + dx, originPoint.y + dy, originPoint.z),
      new Point(originPoint.x, originPoint.y + dy, originPoint.z)
    ])).reverse();
    
    const face3r = face3.translate(0, 0, dz);

    super([
      face1,
      face1r,
      face2,
      face2r,
      face3,
      face3r
    ]);
  }
}
