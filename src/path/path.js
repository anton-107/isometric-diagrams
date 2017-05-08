class Path {
  constructor(points=[]) {
    this._points = points;
  }

  get points() {
    return this._points;
  }

  get depth() {
    let i, total = 0;
    this.points.forEach(p => { total += p.depth });
    return total / (this.points.length || 1);
  }

  reverse() {
    return new Path(this.points.reverse());
  }

  translate() {
    const args = arguments;

    return new Path(this.points.map(point => {
      return point.translate.apply(point, args);
    }));
  }
}
