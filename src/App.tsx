import { InformationIcon, PictureIcon, XIcon } from "./components/iconst";
import { PreviewImage } from "./types";
import { getTopPredominantColors } from "./utils/extract_colors";
import { useState } from "react";

export default function App() {
  const [predominentColors, setPredominentColors] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<PreviewImage | null>(null);

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
      console.log(res);
      setPredominentColors(res);
    });
  };

  const deletePreviewImage = () => {
    setPreviewImage(null);
  };

  return (
    <div className=" bg-stone-950 text-stone-200">
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
              // {...register("image")}
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
              className={`px-4 py-2 text-sm uppercase rounded-full w-fit  text-emerald-500 font-bold ${
                !previewImage?.previewURLImage
                  ? "bg-stone-700"
                  : "bg-emerald-200"
              }`}
            >
              Get colors!
            </button>
          </form>
        </section>
        <section className="flex-1 flex justify-center bg-stone-900">
          {predominentColors && (
            <ul className="flex gap-2">
              {predominentColors.map((color) => (
                <li
                  key={color}
                  className={`size-12 rounded-lg bg-[${color}]`}
                ></li>
              ))}
            </ul>
          )}
          i should display the colors here
        </section>
      </main>
    </div>
  );
}
