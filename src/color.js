class Color {
  constructor(r, g, b, alpha) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.alpha = alpha;

    this.loadHSL();
  }

  get hex() {
    // Pad with 0s
    let hex = (this.r * 256 * 256 + this.g * 256 + this.b).toString(16);

    if (hex.length < 6) {
      hex = new Array(6 - hex.length + 1).join('0') + hex;
    }

    return `#${hex}`;
  }

  lighten(percentage, lightColor) {
    lightColor = lightColor || new Color(255, 255, 255);

    const newColor = new Color(
      (lightColor.r / 255) * this.r,
      (lightColor.g / 255) * this.g,
      (lightColor.b / 255) * this.b,
      this.alpha
    );

    newColor.l = Math.min(newColor.l + percentage, 1);

    newColor.loadRGB();
    return newColor;
  }

  /**
   * Loads HSL values using the current RGB values
   * Converted from:
   * http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
   */
  loadHSL() {
    const r = this.r / 255;
    const g = this.g / 255;
    const b = this.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;  // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }

      h /= 6;
    }

    this.h = h;
    this.s = s;
    this.l = l;
  };

  loadRGB() {
    let r, g, b;
    let h = this.h;
    let s = this.s;
    let l = this.l;

    if (s === 0) {
      r = g = b = l;  // achromatic
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = this._hue2rgb(p, q, h + 1 / 3);
      g = this._hue2rgb(p, q, h);
      b = this._hue2rgb(p, q, h - 1 / 3);
    }

    this.r = parseInt(r * 255);
    this.g = parseInt(g * 255);
    this.b = parseInt(b * 255);
  }

  /**
   * Helper function to convert hue to rgb
   * Taken from:
   * http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
   */
  _hue2rgb(p, q, t) {
    if (t < 0) {
      t += 1;
    }
    if (t > 1) {
      t -= 1;
    }
    if (t < 1 / 6) {
      return p + (q - p) * 6 * t;
    }
    if (t < 1 / 2) {
      return q;
    }
    if (t < 2 / 3) {
      return p + (q - p) * (2 / 3 - t) * 6;
    }
    return p;
  }
}
