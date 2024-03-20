import { PreviewImage } from "@/types";
import { useState } from "react";
import { ImagePreview } from "./ImagePreview";
import { NoImagePreview } from "./NoImagePreview";
import { ImageDetails } from "./ImageDetails";
import { ImageUploader } from "./ImageUploader";
import { Button } from "@/components/button";

type Props = {
  onGetColors: (image: File) => void;
};

export function LeftSection({ onGetColors }: Props) {
  const [previewImage, setPreviewImage] = useState<PreviewImage | null>(null);

  const changePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    const url = URL.createObjectURL(file);
    setPreviewImage({
      image: file,
      url,
    });
  };

  const deletePreviewImage = () => {
    setPreviewImage(null);
  };

  return (
    <section className="flex-1 flex">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onGetColors(previewImage?.image!);
        }}
        action=""
        method="POST"
        className="flex flex-col w-full items-center gap-8"
      >
        <picture className="relative w-full rounded-xl min-h-72 max-h-72 flex items-center justify-center border bg-stone-900 border-stone-800 text-stone-700">
          {previewImage ? (
            <ImagePreview
              onDeleteImage={deletePreviewImage}
              url={previewImage.url}
            />
          ) : (
            <NoImagePreview />
          )}
        </picture>
        <ImageUploader onUploadImage={changePreview} />
        <ImageDetails />
        <Button
          disabled={previewImage === null}
          intent={previewImage ? "default" : "disabled"}
        >
          Get colors!
        </Button>
      </form>
    </section>
  );
}
