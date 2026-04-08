import { z } from "zod";

export const createPostSchema = z.object({
  title: z
    .string()
    .min(5, "El título debe tener al menos 3 caracteres")
    .max(100, "El título es demasiado largo"),

  content: z
    .string()
    .max(500, "El contenido es demasiado largo")
    .optional()
    .or(z.literal("")),
});

export const updatePostSchema = createPostSchema.extend({
  id: z.number(),
});