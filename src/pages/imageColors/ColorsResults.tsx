import { HoverText } from "@/components/hovertext";
import { Toaster, useToast } from "@/components/ui";
import { ColorFormat, colorFormat } from "@/constants/typeColors";

interface Props {
  colors: string[];
  onChangeFormat: (type: ColorFormat) => void;
  currentFormat: ColorFormat;
}

export function ColorsResults({
  colors,
  onChangeFormat,
  currentFormat,
}: Props) {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    toast({
      title: "Color copied to your clipboard",
      description: text,
    });
    navigator.clipboard
      .writeText(text)
      .then((_res) => {})
      .catch((e) => {
        console.log(e);
      });
  };

  return colors.length < 0 ? (
    <p>No hay nada</p>
  ) : (
    <section className="flex-1 h-full flex flex-col gap-8 justify-center bg-stone-900/30 backdrop-blur-md py-8 z-10 shadow-md">
      <ul className="flex items-center justify-center group">
        {colors.map((color) => (
          <HoverText key={color} hover={color}>
            <li
              onClick={() => copyToClipboard(color)}
              className="hover:shadow-md duration-200 size-24 transition shadow-lg active:translate-y-1
              group-hover:brightness-75 hover:!scale-[102%] hover:!brightness-100"
              style={{ backgroundColor: color }}
            ></li>
          </HoverText>
        ))}
        <Toaster />
      </ul>
      <article className="flex flex-col gap-4 bg-stone-950 p-4 rounded-lg">
        <ul className="flex flex-col gap-1">
          {colors.map((color, index) => (
            <li key={color} className="flex gap-2 text-stone-300 font-mono">
              <p>--color_{index + 1}:</p>
              {color}
            </li>
          ))}
        </ul>
        <footer className="flex justify-between gap-4">
          <article className="flex gap-4">
            {colorFormat.map((type) => (
              <button
                onClick={() => onChangeFormat(type)}
                className={`px-3 py-2 rounded-lg border border-stone-700 ${
                  currentFormat === type && "bg-stone-800"
                }`}
              >
                {type}
              </button>
            ))}
          </article>
          <button>copy!</button>
        </footer>
      </article>
    </section>
  );
}
