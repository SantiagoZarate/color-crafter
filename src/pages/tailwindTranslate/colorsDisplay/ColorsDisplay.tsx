import { Button } from "@/components/button";
import { ColorProps, colorSchema } from "@/constants/colorSchema";
import { Color } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AddColorForm } from "./AddColorForm";
import { ColorsList } from "./ColorsList";

type Props = {
  onTranslateColors: (colors: Color[]) => void;
};

export function ColorsDisplay({ onTranslateColors }: Props) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<ColorProps>({
    resolver: zodResolver(colorSchema),
  });
  const [colors, setColors] = useState<Color[]>([]);

  const handleAddColor = (data: ColorProps) => {
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

  return (
    <div className="">
      <AddColorForm
        errors={errors}
        onSubmit={handleSubmit(handleAddColor)}
        register={register}
      />
      <ColorsList colors={colors} onRemoveColor={removeColor} />
      <footer className="flex justify-center mt-4">
        {colors.length > 0 && (
          <Button onClick={() => onTranslateColors(colors)}>translate</Button>
        )}
      </footer>
    </div>
  );
}
