import { ColorProps, colorSchema } from "@/constants/colorSchema";
import { Color } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AddColorForm } from "./AddColorForm";
import { ColorsList } from "./ColorsList";
import { TranslateColorsButton } from "./TranslateColorsButton";
import { useTranslateColors } from "@/hooks/useTranslateColors";

type Props = {
  onTranslateColors: (colors: Color[]) => void;
};

export function ColorsDisplay({ onTranslateColors }: Props) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<ColorProps>({
    resolver: zodResolver(colorSchema),
  });
  const { addColor, colors, removeColor } = useTranslateColors({ setError });

  return (
    <div className="">
      <AddColorForm
        errors={errors}
        onSubmit={handleSubmit(addColor)}
        register={register}
      />
      <ColorsList colors={colors} onRemoveColor={removeColor} />
      {colors.length > 0 && (
        <TranslateColorsButton
          onTranslateColors={() => onTranslateColors(colors)}
        />
      )}
    </div>
  );
}
