export function rgbaToHsla(rgbaColors: string[]): string[] {
  return rgbaColors.map((rgbaColor) => {
    // Parse the RGBA values
    const rgbaValues = rgbaColor
      .substring(5, rgbaColor.length - 1)
      .split(",")
      .map(parseFloat);
    const [r, g, b, a] = rgbaValues.map((value) => value / 255); // Normalize RGB values to range [0, 1]

    // Find the minimum and maximum values of RGB
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const delta = max - min;

    // Calculate the Hue
    let h = 0;
    if (delta === 0) {
      h = 0; // Hue undefined
    } else if (max === r) {
      h = ((g - b) / delta) % 6;
    } else if (max === g) {
      h = (b - r) / delta + 2;
    } else {
      h = (r - g) / delta + 4;
    }
    h = Math.round(h * 60); // Convert to degrees

    // Calculate the Lightness
    const l = (max + min) / 2;

    // Calculate the Saturation
    let s = 0;
    if (delta !== 0) {
      s = delta / (1 - Math.abs(2 * l - 1));
    }
    s = Math.round(s * 100); // Convert to percentage

    // Construct HSLA string
    const hslaColor = `hsla(${h}, ${s}%, ${Math.floor(l * 100)}%, ${a})`;

    return hslaColor;
  });
}
