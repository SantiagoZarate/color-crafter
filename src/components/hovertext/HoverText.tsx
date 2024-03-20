import { PropsWithChildren } from "react";
import {
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  Tooltip,
} from "../ui/tooltip";

interface Props extends PropsWithChildren {
  hover: string;
}

export function HoverText({ hover, children }: Props) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent className="bg-stone-800 shadow-lg text-stone-300 border-none">
          {hover}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
