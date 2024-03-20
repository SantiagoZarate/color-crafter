import { ColorFormat } from "@/constants/typeColors";
import { getTopPredominantColors } from "@/utils/extract_colors";
import { rgbaToHex } from "@/utils/rgba_to_hex";
import { rgbaToHsla } from "@/utils/rgba_to_hsla";
import { useState, useRef } from "react";

export function useExtractColors() {
  const [predominentColors, setPredominentColors] = useState<string[]>([]);
  const [colorFormat, setColorFormat] = useState<ColorFormat>("RGBA");
  const initialColorValues = useRef<string[]>([]);

  const changeColorFormat = (type: ColorFormat) => {
    if (!predominentColors || type === colorFormat) return;

    let newFormat;
    if (type === "HEXA") newFormat = rgbaToHex(initialColorValues.current);
    if (type === "HSLA") newFormat = rgbaToHsla(initialColorValues.current);
    if (type === "RGBA") newFormat = initialColorValues.current;

    setColorFormat(type);
    setPredominentColors(newFormat!);
  };

  const extractColors = (image: File) => {
    getTopPredominantColors(image).then((res) => {
      setPredominentColors(res);
      initialColorValues.current = res;
    });
  };

  return {
    changeColorFormat,
    extractColors,
    colorFormat,
    predominentColors,
  };
}
