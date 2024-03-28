import { Color } from "@/types";
import { XIcon, EditIcon } from "lucide-react";

interface Props {
  colors: Color[];
  onRemoveColor: (colorName: string) => void;
}

export function ColorsList({ colors, onRemoveColor }: Props) {
  return (
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
              onClick={() => onRemoveColor(color.name)}
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
  );
}
