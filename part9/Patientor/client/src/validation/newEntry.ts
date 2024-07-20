import { z } from "zod";

export const NewHealthCheckValidation = z.object({
  description: z.string().min(3),
  date: z.string().date(),
  specialist: z.string().min(3),
  type: z.string().min(3),
  healthCheckRating: z.number().min(0).max(3),
});

export const NewHospitalValidation = z.object({
  description: z.string().min(3),
  date: z.string().date(),
  specialist: z.string().min(3),
  type: z.string().min(3),
  discharge: z.object({
    date : z.string().date(),
    criteria : z.string().min(3)
  })
});

export const NewOccupationalValidation = z.object({
  description: z.string().min(3),
  date: z.string().date(),
  specialist: z.string().min(3),
  type: z.string().min(3),
  employerName: z.string().min(3),
  sickLeave: z
  .object({
    startDate:z.string().date(),
    endDate: z.string().date(),
  })
  .optional(),
});

