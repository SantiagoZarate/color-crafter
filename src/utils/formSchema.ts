import { z } from "zod";

export const formSchema = z.object({
  image: z
    .instanceof(FileList)
    .transform((file) => file.item(0)!)
    .refine((file) => file?.size <= 5 * 1024 * 1024, "File is too big"),
});

export type FormType = z.infer<typeof formSchema>;
