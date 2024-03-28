import { Button } from "@/components/button";
import { ColorProps, colorSchema } from "@/constants/colorSchema";
import { Color } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon, EditIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AddColorForm } from "./AddColorForm";

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
      <ul className="flex flex-col divide-y divide-stone-700">
        {colors.map((color, i) => (
          <li className="group flex gap-2 justify-between" key={color.name}>
            <div className="flex items-center gap-4">
              <span
                className="size-28"
                style={{ backgroundColor: colors[i].value }}
              />
              <div className="flex flex-col gap-1">
                <p className="text-stone-700">{color.name}</p>
                <p className="text-lg">{color.value}</p>
              </div>
            </div>
            <div className="flex flex-col divide-y">
              <button
                onClick={() => removeColor(color.name)}
                className="group-hover:opacity-100 opacity-0 bg-zinc-800 flex-1 p-4 transition duration-150"
              >
                <XIcon />
              </button>
              <button className="group-hover:opacity-100 opacity-0 bg-zinc-800 flex-1 p-4 transition duration-150">
                <EditIcon />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <footer className="flex justify-center mt-4">
        {colors.length > 0 && (
          <Button onClick={() => onTranslateColors(colors)}>translate</Button>
        )}
      </footer>
    </div>
  );
}
