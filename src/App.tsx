import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InformationIcon, PictureIcon } from "./components/iconst";
import { getTopPredominantColors } from "./utils/extract_colors";
import { FormType, formSchema } from "./utils/formSchema";
import { useState } from "react";

export default function App() {
  const [predominentColors, setPredominentColors] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string>("");
  const {
    handleSubmit,
    register,
    getFieldState,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });

  const uploadImage = (data: FormType) => {
    getTopPredominantColors(data.image).then((res) => {
      console.log(res);
      setPredominentColors(res);
    });
    reset();
  };

  const changePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    const urlImage = URL.createObjectURL(file);
    console.log(file);
    console.log(urlImage);
    setPreviewImage(urlImage);
  };

  return (
    <div className=" bg-stone-950 text-stone-200">
      <main className="w-full h-full min-h-screen flex gap-2 items-center max-w-screen-xl mx-auto">
        <section className="flex-1 flex justify-center p-8">
          <form
            onSubmit={handleSubmit(uploadImage)}
            action=""
            method="POST"
            className="flex flex-col items-center gap-8"
          >
            <picture className="w-full rounded-xl min-h-40 max-h-40 flex items-center justify-center border bg-stone-900 border-stone-800 text-stone-700 overflow-hidden">
              {previewImage ? (
                <img
                  draggable={false}
                  className="w-full h-full object-cover"
                  src={previewImage}
                  alt=""
                />
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
              disabled={getFieldState("image").invalid}
              className={`px-4 py-2 text-sm uppercase rounded-full w-fit  text-emerald-500 font-bold ${
                getFieldState("image").invalid
                  ? "bg-stone-700"
                  : "bg-emerald-200"
              }`}
            >
              Get colors!
            </button>
            {errors.image && (
              <p className="text-red-300 text-xs text-center capitalize">
                {errors.image.message}
              </p>
            )}
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
