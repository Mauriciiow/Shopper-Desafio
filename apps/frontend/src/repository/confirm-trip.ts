import { api } from "@/api";
import { ConfirmTripRequestSchema } from "@/schemas/confirm-trip";

function confirmTrip(data: ConfirmTripRequestSchema) {
  return api.patch("/ride/confirm", data);
}

export const confirmTripRepository = {
  confirmTrip,
};
