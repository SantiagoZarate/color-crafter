import { InformationIcon } from "@/components/icons";

export function ImageDetails() {
  return (
    <div className="text-xs flex items-center capitalize gap-2 text-stone-700 divide-x divide-stone-700">
      <div>
        <InformationIcon />
      </div>
      <div className="flex flex-col gap-2 px-2">
        <span>all type images are acepted (png, avif, jpg, ect)</span>
        <span>files up to 5mb</span>
      </div>
    </div>
  );
}
