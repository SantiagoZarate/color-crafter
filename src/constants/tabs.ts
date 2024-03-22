export const tabs = ["styles.css", "tailwind.config.ts"] as const;

export type TabsType = (typeof tabs)[number];
