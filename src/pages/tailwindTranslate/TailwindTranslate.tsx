import { EditIcon, PlusIcon, XIcon } from "@/components/icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/button";
import {
  type Color,
  type TranslatedCssConfig,
  buildCssConfig,
} from "@/utils/buildCssConfig";

const colorSchema = z.object({
  name: z.string().min(4, "name should at least have 5 letters"),
  value: z
    .string()
    .refine((val) => val.startsWith("hsl"), "value must start with 'hsl'"),
});

type ColorProps = z.infer<typeof colorSchema>;

export function TailwindTranslate() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<ColorProps>({
    resolver: zodResolver(colorSchema),
  });
  const [colors, setColors] = useState<Color[]>([]);
  const [translatedConfigs, setTranslatedConfigs] =
    useState<TranslatedCssConfig | null>(null);

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

  const handleTranslate = () => {
    setTranslatedConfigs(buildCssConfig(colors));
  };

  return (
    <>
      <div className=" w-full flex-1">
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
              <p className="text-zinc-500">
                Make sure your name is cool enough
              </p>
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
        {colors.length > 0 && (
          <Button onClick={handleTranslate}>translate</Button>
        )}
      </div>
      <div className="bg-stone-900 p-4 rounded-lg w-full flex-1">
        {translatedConfigs ? (
          <article className="flex-1 flex flex-col">
            <div className="flex-1">
              <pre>
                <code>{translatedConfigs.cssProps}</code>
              </pre>
            </div>
            <div className="flex-1">
              <pre>
                <code>{translatedConfigs.twProps}</code>
              </pre>
            </div>
          </article>
        ) : (
          <p>there is nun</p>
        )}
      </div>
    </>
  );
}
