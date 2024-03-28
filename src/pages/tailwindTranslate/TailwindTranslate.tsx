import { useState } from "react";
import { translateConfig } from "@/utils/buildCssConfig";
import { Color, TranslatedCssConfig } from "@/types";
import { ConfigDisplay } from "./ConfigDisplay";
import { ColorsDisplay } from "./colorsDisplay/ColorsDisplay";

export function TailwindTranslate() {
  const [translatedConfigs, setTranslatedConfigs] =
    useState<TranslatedCssConfig | null>(null);

  const handleTranslate = (colors: Color[]) => {
    setTranslatedConfigs(translateConfig(colors));
  };

  return (
    <section className="grid grid-cols-2 gap-8">
      <ColorsDisplay onTranslateColors={handleTranslate} />
      <ConfigDisplay configs={translatedConfigs} />
    </section>
  );
}
