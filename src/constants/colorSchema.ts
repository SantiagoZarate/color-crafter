import { z } from "zod";

export const colorSchema = z.object({
  name: z.string().min(4, "name should at least have 5 letters"),
  value: z
    .string()
    .refine((val) => val.startsWith("hsl"), "value must start with 'hsl'"),
});

export type ColorProps = z.infer<typeof colorSchema>;
