export const colorFormat = ["RGBA", "HEXA", "HSLA"] as const;
export type ColorFormat = (typeof colorFormat)[number];
