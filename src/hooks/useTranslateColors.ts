import { ColorProps } from "@/constants/colorSchema";
import { Color } from "@/types";
import { useState } from "react";
import { UseFormSetError } from "react-hook-form";

interface Props {
  setError: UseFormSetError<ColorProps>;
}

export function useTranslateColors({ setError }: Props) {
  const [colors, setColors] = useState<Color[]>([]);

  const addColor = (data: ColorProps) => {
    if (colors.some((color) => color.name === data.name)) {
      setError("name", { message: "Repeated name" });
      return;
    }

    setColors([...colors, data]);
  };

  const removeColor = (colorName: string) => {
    setColors((prevStatus) =>
      prevStatus.filter((color) => color.name !== colorName)
    );
  };

  return {
    addColor,
    removeColor,
    colors,
  };
}
