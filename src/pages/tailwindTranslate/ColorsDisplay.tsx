import { Button } from "@/components/button";
import { ColorProps, colorSchema } from "@/constants/colorSchema";
import { Color } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, XIcon, EditIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

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
      <form
        onSubmit={handleSubmit(handleAddColor)}
        className="flex bg-zinc-900/50"
      >
        <button className="size-28 flex items-center justify-center bg-zinc-900">
          <PlusIcon />
        </button>
        <label
          htmlFor=""
          className="flex flex-col gap-2 text-xs flex-1 p-4 capitalize"
        >
          color name
          <input
            autoComplete="off"
            type="text"
            {...register("name")}
            placeholder="primary"
            className="text-sm px-2 py-1 rounded-md bg-zinc-900"
          />
          {errors.name ? (
            <p className="text-red-300">{errors.name.message}</p>
          ) : (
            <p className="text-zinc-500">Make sure your name is cool enough</p>
          )}
        </label>
        <label htmlFor="" className="flex flex-col gap-2 text-xs flex-1 p-4">
          value
          <input
            type="text"
            {...register("value")}
            placeholder="hsl(20deg, 20%, 50%)"
            className="text-sm px-2 py-1 rounded-md bg-zinc-900"
          />
          {errors.value ? (
            <p className="text-red-300">{errors.value.message}</p>
          ) : (
            <p className="text-zinc-500">Only hsl values supported!</p>
          )}
        </label>
      </form>
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
