import { InformationIcon, PictureIcon, XIcon } from "@icon";
import { getTopPredominantColors } from "@util/extract_colors";
import { HoverText } from "@component/hovertext";
import { useToast, Toaster } from "@shadcn";
import { PreviewImage } from "./types";
import { useRef, useState } from "react";
import { ColorFormat, colorFormat } from "./constants/typeColors";
import { rgbaToHex } from "./utils/rgba_to_hex";
import { rgbaToHsla } from "./utils/rgba_to_hsla";

export default function App() {
  const [predominentColors, setPredominentColors] = useState<string[]>([]);
  const initialColorValues = useRef<string[]>([]);
  const [currentColorFormat, setCurrentColorFormat] =
    useState<ColorFormat>("RGBA");
  const [previewImage, setPreviewImage] = useState<PreviewImage | null>(null);
  const { toast } = useToast();

  const changePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    const urlImage = URL.createObjectURL(file);
    setPreviewImage({
      image: file,
      previewURLImage: urlImage,
    });
  };

  const handleGetColors = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!previewImage) return;

    getTopPredominantColors(previewImage.image).then((res) => {
      setPredominentColors(res);
      initialColorValues.current = res;
    });
  };

  const deletePreviewImage = () => {
    setPreviewImage(null);
  };

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

  const changeToHex = (type: ColorFormat) => {
    if (!predominentColors || type === currentColorFormat) return;

    let newFormat;
    if (type === "HEXA") newFormat = rgbaToHex(initialColorValues.current);
    if (type === "HSLA") newFormat = rgbaToHsla(initialColorValues.current);
    if (type === "RGBA") newFormat = initialColorValues.current;

    setCurrentColorFormat(type);
    setPredominentColors(newFormat!);
  };

  return (
    <div className="bg-stone-950 text-stone-200">
      <img
        className="absolute w-full object-cover hue-rotate-90 pointer-events-none"
        src="/images/light.avif"
        alt=""
      />
      <main className="w-full h-full min-h-screen flex gap-2 items-center max-w-screen-xl mx-auto">
        <section className="flex-1 flex p-8">
          <form
            onSubmit={handleGetColors}
            action=""
            method="POST"
            className="flex flex-col w-full items-center gap-8"
          >
            <picture className="relative w-full rounded-xl min-h-72 max-h-72 flex items-center justify-center border bg-stone-900 border-stone-800 text-stone-700">
              {previewImage ? (
                <>
                  <img
                    draggable={false}
                    className="w-full h-full object-cover rounded-xl"
                    src={previewImage.previewURLImage}
                    alt=""
                  />
                  <button
                    onClick={deletePreviewImage}
                    className="absolute p-1 rounded-full bg-stone-600 -top-2 -right-2 border border-stone-700 hover:bg-stone-700 duration-150 hover:-translate-y-1 transition"
                  >
                    <div className="text-stone-300">
                      <XIcon />
                    </div>
                  </button>
                </>
              ) : (
                <div className="capitalize flex flex-col items-center justify-center gap-2 py-4">
                  <PictureIcon />
                  <p>your image preview will be here</p>
                </div>
              )}
            </picture>
            <label
              htmlFor="image"
              className="bg-stone-800 w-full p-6 rounded-xl border border-dashed border-stone-600 text-stone-600 hover:text-stone-300 hover:border-stone-300 duration-150 transition hover:-translate-y-1 cursor-pointer text-center"
            >
              Upload your image
            </label>
            <input
              onChange={changePreview}
              id="image"
              accept="image/*"
              type="file"
              hidden
            />
            <div className="text-xs flex items-center capitalize gap-2 text-stone-700 divide-x divide-stone-700">
              <div>
                <InformationIcon />
              </div>
              <div className="flex flex-col gap-2 px-2">
                <span>all type images are acepted (png, avif, jpg, ect)</span>
                <span>files up to 5mb</span>
              </div>
            </div>
            <button
              disabled={previewImage === null}
              className={`px-4 py-2 text-sm uppercase rounded-full w-fit   font-bold ${
                !previewImage?.previewURLImage
                  ? "bg-stone-700 text-stone-400"
                  : "bg-emerald-200 text-emerald-500"
              }`}
            >
              Get colors!
            </button>
          </form>
        </section>
        <section className="flex-1 h-full flex flex-col gap-8 justify-center bg-stone-900/50 backdrop-blur-md p-8 z-10">
          {predominentColors && (
            <ul className="flex justify-center gap-8 items-center">
              {predominentColors.map((color) => (
                <HoverText key={color} hover={color}>
                  <li
                    onClick={() => copyToClipboard(color)}
                    className="hover:-translate-y-1 duration-150 transition size-12 rounded-lg shadow-lg active:translate-y-1"
                    style={{ backgroundColor: color }}
                  ></li>
                </HoverText>
              ))}
              <Toaster />
            </ul>
          )}
          <article className="flex flex-col gap-4 bg-stone-950 p-4 rounded-lg">
            <ul className="flex flex-col gap-1">
              {predominentColors.map((color, index) => (
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
                    onClick={() => changeToHex(type)}
                    className={`px-3 py-2 rounded-lg border border-stone-700 ${
                      currentColorFormat === type && "bg-stone-800"
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
      </main>
    </div>
  );
}
