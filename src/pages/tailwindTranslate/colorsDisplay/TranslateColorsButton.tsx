import { Button } from "@/components/button";

interface Props {
  onTranslateColors: () => void;
}

export function TranslateColorsButton({ onTranslateColors }: Props) {
  return (
    <footer className="flex justify-center mt-4">
      <Button onClick={onTranslateColors}>translate</Button>
    </footer>
  );
}
