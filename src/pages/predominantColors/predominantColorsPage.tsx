import { ColorsResults } from "./ColorsResults";
import { LeftSection } from "./LeftSection";
import { useExtractColors } from "@/hooks/useExtractColors";

export function PredominantColorsPage() {
  const { changeColorFormat, colorFormat, extractColors, predominentColors } =
    useExtractColors();

  return (
    <section className="flex">
      <LeftSection onGetColors={extractColors} />
      <ColorsResults
        colors={predominentColors}
        currentFormat={colorFormat}
        onChangeFormat={changeColorFormat}
      />
    </section>
  );
}
