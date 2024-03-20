import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";

const buttonStyles = cva(
  `px-4 py-2 text-sm uppercase rounded-full w-fit font-bold`,
  {
    variants: {
      intent: {
        default: "bg-emerald-200 text-emerald-500",
        disabled: "bg-stone-700 text-stone-400",
      },
    },
    defaultVariants: {
      intent: "default",
    },
  }
);

type Props = VariantProps<typeof buttonStyles> & ComponentProps<"button">;

export function Button({ className, intent, ...args }: Props) {
  return <button className={buttonStyles({ intent })} {...args} />;
}
