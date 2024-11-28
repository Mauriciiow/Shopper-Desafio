import { z } from "zod";

export const tripRequestSchema = z.object({
  originAddress: z.string().min(1, "estimativeForm.errors.originAddress"),
  destinationAddress: z
    .string()
    .min(1, "estimativeForm.errors.destinationAddress"),
});

export type TripRequestSchema = z.infer<typeof tripRequestSchema>;
