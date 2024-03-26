import { TabsType, tabs } from "@/constants/tabs";
import { TranslatedCssConfig } from "@/types";
import { useState } from "react";

type Props = {
  configs: TranslatedCssConfig | null;
};

export function ConfigDisplay({ configs }: Props) {
  const [isFirstTab, setIsFirstTab] = useState<TabsType>("styles.css");

  return (
    <div className="p-4 rounded-lg">
      <article className="flex-1 flex flex-col">
        <header className="flex justify-between items-center">
          <nav className="flex">
            {tabs.map((tab) => (
              <button
                onClick={() => {
                  setIsFirstTab(tab);
                }}
                key={tab}
                className={` px-4 py-2 text-sm ${
                  isFirstTab === tab ? "border-t bg-stone-800" : "bg-stone-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
          <span>Tailwind translate</span>
        </header>
        <div className="flex-1 bg-stone-800 p-4 ">
          <pre>
            <code>
              {configs === null && (
                <div className="min-h-60 flex justify-center items-center">
                  Your translated config will apear here
                </div>
              )}
              {isFirstTab === "styles.css"
                ? configs?.cssProps
                : configs?.twProps}
            </code>
          </pre>
        </div>
      </article>
    </div>
  );
}
