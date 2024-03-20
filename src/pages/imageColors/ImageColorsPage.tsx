import { useState } from "react";
import { ColorsResults } from "./ColorsResults";
import { LeftSection } from "./LeftSection";
import { getTopPredominantColors } from "@/utils/extract_colors";

export function ImageColorsPage() {
  const [predominentColors, setPredominentColors] = useState<string[]>([]);

  const handleGetColors = (
    event: React.FormEvent<HTMLFormElement>,
    image: File
  ) => {
    event.preventDefault();
    // if (!previewImage) return;

    getTopPredominantColors(image).then((res) => {
      setPredominentColors(res);
      // initialColorValues.current = res;
    });
  };

  return (
    <>
      <LeftSection onGetColors={handleGetColors} />
      <ColorsResults colors={predominentColors} />
    </>
  );
}
