import { XIcon } from "lucide-react";

type Props = {
  url: string;
  onDeleteImage: () => void;
};

export function ImagePreview({ onDeleteImage, url }: Props) {
  return (
    <>
      <img
        draggable={false}
        className="w-full h-full object-cover rounded-xl"
        src={url}
        alt=""
      />
      <button
        onClick={onDeleteImage}
        className="absolute p-1 rounded-full bg-stone-600 -top-2 -right-2 border border-stone-700 hover:bg-stone-700 duration-150 hover:-translate-y-1 transition"
      >
        <div className="text-stone-300">
          <XIcon />
        </div>
      </button>
    </>
  );
}
