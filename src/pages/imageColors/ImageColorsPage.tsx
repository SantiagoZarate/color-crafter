import { useRef, useState } from "react";
import { ColorsResults } from "./ColorsResults";
import { LeftSection } from "./LeftSection";
import { getTopPredominantColors } from "@/utils/extract_colors";
import { ColorFormat } from "@/constants/typeColors";
import { rgbaToHex } from "@/utils/rgba_to_hex";
import { rgbaToHsla } from "@/utils/rgba_to_hsla";

export function ImageColorsPage() {
  const [predominentColors, setPredominentColors] = useState<string[]>([]);
  const [colorFormat, setColorFormat] = useState<ColorFormat>("RGBA");
  const initialColorValues = useRef<string[]>([]);

  const handleGetColors = (
    event: React.FormEvent<HTMLFormElement>,
    image: File
  ) => {
    event.preventDefault();

    getTopPredominantColors(image).then((res) => {
      setPredominentColors(res);
      initialColorValues.current = res;
    });
  };

  const changeColorFormat = (type: ColorFormat) => {
    if (!predominentColors || type === colorFormat) return;

    let newFormat;
    if (type === "HEXA") newFormat = rgbaToHex(initialColorValues.current);
    if (type === "HSLA") newFormat = rgbaToHsla(initialColorValues.current);
    if (type === "RGBA") newFormat = initialColorValues.current;

    setColorFormat(type);
    setPredominentColors(newFormat!);
  };

  return (
    <>
      <LeftSection onGetColors={handleGetColors} />
      <ColorsResults
        colors={predominentColors}
        currentFormat={colorFormat}
        onChangeFormat={changeColorFormat}
      />
    </>
  );
}
