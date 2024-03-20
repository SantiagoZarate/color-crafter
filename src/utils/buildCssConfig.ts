interface Colors {
  [K: string]: string;
}

type ConvertToCSS = {
  twProps: string;
  cssProps: string;
};

function convertToCSS(input: Colors): ConvertToCSS {
  let cssColorVariables = "";
  let cssColorOpositeMode = "";
  let twConfig = "";

  for (const key in input) {
    twConfig += `${key}: (hsl(var(--${key}))/ <alpha-value>),\n    `;

    if (Object.prototype.hasOwnProperty.call(input, key)) {
      const value = input[key];
      const [hue, saturation, lightness] = value.match(/\d+/g) || [];

      if (hue && saturation && lightness) {
        const opositeLight = 100 - Number(lightness);
        cssColorVariables += `--${key}: ${hue}deg ${saturation}% ${lightness}%;\n      `;
        cssColorOpositeMode += `--${key}: ${hue}deg ${saturation}% ${opositeLight}%;\n      `;
      }
    }
  }

  const cssProps = `
  @layer base {
    :root {
      ${cssColorVariables}
    }

    [data-theme="dark"] {
      ${cssColorOpositeMode}
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
  secondary: "hsl(30deg,40%,10%)",
  border: "hsl(30deg,40%,35%)",
};

console.log(convertToCSS(myColors).cssProps);
