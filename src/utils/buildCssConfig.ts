interface Colors {
  [K: string]: string;
}

function convertToCSS(input: Colors): string {
  let cssProperties = "";

  for (const key in input) {
    if (Object.prototype.hasOwnProperty.call(input, key)) {
      const value = input[key];
      const [hue, saturation, lightness] = value.match(/\d+/g) || [];

      if (hue && saturation && lightness) {
        cssProperties += `--${key}: ${hue}deg ${saturation}% ${lightness}%;\n        `;
      }
    }
  }

  return `
    @layer base {
      :root {
        ${cssProperties}
      }
    }
  `;
}

const myColors: Colors = {
  primary: "hsla(30deg, 40%, 50%)",
  border: "hsla(30deg, 40%, 50%)",
};

console.log(convertToCSS(myColors));
