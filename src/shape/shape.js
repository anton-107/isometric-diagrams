class Shape {
  constructor(paths) {
    this._paths = paths;
  }

  /**
   * Produces a list of the shape's paths ordered by distance to
   * prevent overlaps when drawing
   */
  get orderedPaths() {
    const paths = this._paths.slice();

    /**
     * Sort the list of faces by distance then map the entries, returning
     * only the path and not the added "further point" from earlier.
     */
    return paths.sort(function(pathA, pathB) {
      return pathB.depth - pathA.depth;
    });
  }

  get paths() {
    return this._paths;
  }

  static extrude(path, height=1) {
    const paths = [];
    const topPath = path.translate(0, 0, height);

    /* Push the top and bottom faces, top face must be oriented correctly */
    paths.push(path);
    paths.push(topPath);

    /* Push each side face */
    for (let i = 0; i < path.points.length; i++) {
      paths.push(new Path([
        topPath.points[i],
        path.points[i],
        path.points[(i + 1) % path.points.length],
        topPath.points[(i + 1) % topPath.points.length]
      ]));
    }

    return new Shape(paths);
  }
}
