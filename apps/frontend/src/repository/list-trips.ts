import { api } from "@/api";
import { ListTripsSchema } from "@/schemas/list-trips-schema";

function getListTrips({
  userId,
  driverId,
}: {
  userId: string;
  driverId?: string;
}) {
  return api.get<ListTripsSchema>(`/ride/${userId}?driver_id=${driverId}`);
}

export const listTripsRepository = {
  getListTrips,
};
