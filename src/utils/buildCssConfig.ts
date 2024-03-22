import { Color, TranslatedCssConfig } from "@/types";

export function translateConfig(input: Color[]): TranslatedCssConfig {
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

  return {
    twProps: buildTwConfig(twConfig),
    cssProps: buildCssConfig(cssColorVariables, cssColorOpositeMode),
  };
}

function buildTwConfig(config: string) {
  return `colors {
    ${config}
  }
`;
}

function buildCssConfig(normalTheme: string, darkTheme: string) {
  return `@layer base {
    :root {
      ${normalTheme}
    }

    [data-theme="dark"] {
      ${darkTheme}
    }
  }
`;
}
