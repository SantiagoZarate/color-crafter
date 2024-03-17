export function rgbaToHex(rgbaColors: string[]): string[] {
  return rgbaColors.map((rgbaColor) => {
    // Parse the RGBA values
    const rgbaValues = rgbaColor
      .substring(5, rgbaColor.length - 1)
      .split(",")
      .map(parseFloat);

    // Convert RGBA to hexadecimal
    const hex = rgbaValues.reduce((hexString, value, index) => {
      if (index < 3) {
        const hexValue = value.toString(16).padStart(2, "0");
        return hexString + hexValue;
      }
      return hexString;
    }, "#");

    return hex;
  });
}
