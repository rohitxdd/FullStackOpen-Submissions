import { z } from "zod";

export const NewHealthCheckValidation = z.object({
  description: z.string().min(3),
  date: z.string().date(),
  specialist: z.string().min(3),
  type: z.string().min(3),
  healthCheckRating: z.number().min(0).max(3),
});
