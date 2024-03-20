import { PictureIcon } from "@/components/icons";

export function NoImagePreview() {
  return (
    <div className="capitalize flex flex-col items-center justify-center gap-2 py-4">
      <PictureIcon />
      <p>your image preview will be here</p>
    </div>
  );
}
