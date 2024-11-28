import { useAuth } from "@/hooks/use-auth";
import { listTripsRepository } from "@/repository/list-trips";
import { useQuery } from "@tanstack/react-query";
import { ListTripsSchema } from "@/schemas/list-trips-schema";
export function useListTrips(driverId?: string) {
  const { userId } = useAuth();

  async function getListTrips({
    driverId,
  }: {
    driverId?: string;
  }): Promise<ListTripsSchema> {
    const response = await listTripsRepository.getListTrips({
      userId,
      driverId,
    });
    return response.data;
  }

  return useQuery<ListTripsSchema>({
    queryKey: ["list-trips", driverId],
    queryFn: () => getListTrips({ driverId }),
  });
}
