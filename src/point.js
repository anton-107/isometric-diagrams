class Point {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * The depth of a point in the isometric plane
   */
  get depth() {
    return this.x + this.y - 2 * this.z;
  };

  translate(dx, dy, dz) {
    return new Point(
      this.x + dx,
      this.y + dy,
      this.z + dz
    );
  }
}

function P() {
  return new Point(...arguments)
}
