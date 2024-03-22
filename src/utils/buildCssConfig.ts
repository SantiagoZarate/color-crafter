export type TranslatedCssConfig = {
  twProps: string;
  cssProps: string;
};

export type Color = {
  name: string;
  value: string;
};

export function buildCssConfig(input: Color[]): TranslatedCssConfig {
  let cssColorVariables = "";
  let cssColorOpositeMode = "";
  let twConfig = "";

  input.forEach(({ name, value }) => {
    twConfig += `${name}: (hsl(var(--${name}))/ <alpha-value>),\n    `;

    const [hue, saturation, lightness] = value.match(/\d+/g) || [];

    if (hue && saturation && lightness) {
      const opositeLight = 100 - Number(lightness);
      cssColorVariables += `--${name}: ${hue}deg ${saturation}% ${lightness}%;\n      `;
      cssColorOpositeMode += `--${name}: ${hue}deg ${saturation}% ${opositeLight}%;\n      `;
    }
  });

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
