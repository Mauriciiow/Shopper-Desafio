import { confirmTripRepository } from "@/repository/confirm-trip";
import { ConfirmTripRequestSchema } from "@/schemas/confirm-trip";
import { useMutation } from "@tanstack/react-query";

export function useConfirmTrip() {
  return useMutation({
    mutationKey: ["confirm-trip"],
    mutationFn: (data: ConfirmTripRequestSchema) =>
      confirmTripRepository.confirmTrip(data),
  });
}
