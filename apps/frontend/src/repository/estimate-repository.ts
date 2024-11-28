import { api } from "@/api";
import { EstimateRequestSchema } from "@/schemas/estimate-schema";

function postEstimative(data: EstimateRequestSchema) {
  return api.post("/ride/estimate", data);
}

export const estimativeRepository = {
  postEstimative,
};
