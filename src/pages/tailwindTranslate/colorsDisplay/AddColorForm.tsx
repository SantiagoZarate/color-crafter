import { ColorProps } from "@/constants/colorSchema";
import { PlusIcon } from "lucide-react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
  onSubmit: () => void;
  register: UseFormRegister<ColorProps>;
  errors: FieldErrors<ColorProps>;
}

export function AddColorForm({ onSubmit, register, errors }: Props) {
  return (
    <form onSubmit={onSubmit} className="flex bg-zinc-900/50">
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
          <p className="text-zinc-500">Make sure your name is cool enough</p>
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
  );
}
