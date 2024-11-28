import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { estimativeRepository } from "@/repository/estimate-repository";
import {
  EstimateRequestSchema,
  EstimateResponseSchema,
} from "@/schemas/estimate-schema";

export const useEstimate = () => {
  const queryClient = useQueryClient();
  async function getEstimative(data: EstimateRequestSchema) {
    const response = await estimativeRepository.postEstimative(data);
    queryClient.setQueryData(["user-solicitation"], data);
    return response.data;
  }
  return useMutation<EstimateResponseSchema, Error, EstimateRequestSchema>({
    mutationFn: getEstimative,
  });
};

export function useGetEstimativeData() {
  return useQuery<EstimateRequestSchema>({
    queryKey: ["user-solicitation"],
    enabled: false,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
