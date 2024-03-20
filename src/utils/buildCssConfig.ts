interface Colors {
  [K: string]: string;
}

type ConvertToCSS = {
  twProps: string;
  cssProps: string;
};

function convertToCSS(input: Colors): ConvertToCSS {
  let cssProperties = "";
  let twConfig = "";

  for (const key in input) {
    twConfig += `${key}: (hsl(var(--${key}))/ <alpha-value>),\n    `;

    if (Object.prototype.hasOwnProperty.call(input, key)) {
      const value = input[key];
      const [hue, saturation, lightness] = value.match(/\d+/g) || [];

      if (hue && saturation && lightness) {
        cssProperties += `--${key}: ${hue}deg ${saturation}% ${lightness}%;\n      `;
      }
    }
  }

  const cssProps = `
  @layer base {
    :root {
      ${cssProperties}
    }
  }
`;
  const twProps = `
  colors {
    ${twConfig}
  }
`;
  return {
    twProps,
    cssProps,
  };
}

const myColors: Colors = {
  primary: "hsl(30deg,40%,50%)",
  card: "rgb(240,404, 202)",
  border: "hsl(30deg,40%,50%)",
};
