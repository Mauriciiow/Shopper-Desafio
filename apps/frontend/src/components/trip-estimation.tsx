import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { Avatar, AvatarFallback } from "@/components/avatar";
import { Button } from "@/components";
import { MapPin, Clock, Car, Star } from "lucide-react";
import { EstimateResponseSchema } from "@/schemas/estimate-schema";
import { getMapUrl } from "@/helper/map";
import { useConfirmTrip } from "@/use-case/use-confirm-trip";
import { useGetEstimativeData } from "@/use-case/use-estimate";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { showToast } from "@/helper/toast";
interface TripEstimationProps {
  ride: EstimateResponseSchema;
}

export default function TripEstimation({ ride }: TripEstimationProps) {
  const { t } = useTranslation();
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const navigate = useNavigate();
  const { mutate: confirmTrip, isPending } = useConfirmTrip();
  const { data: destinationData } = useGetEstimativeData();

  const handleConfirmTrip = () => {
    if (!selectedDriver) return;
    const distance = ride.distance.replace(/[^\d.]/g, "");
    const duration = ride.duration.replace(/[^\d.]/g, "");
    const body = {
      destination: destinationData?.destination || "",
      distance: Number(distance),
      duration: duration,
      origin: destinationData?.origin || "",
      value:
        ride.options.find((option) => option.id === Number(selectedDriver))
          ?.value || 0,
      driver: {
        id: Number(selectedDriver),
        name:
          ride.options.find((option) => option.id === Number(selectedDriver))
            ?.name || "",
      },
    };
    confirmTrip(body, {
      onSuccess: () => {
        navigate({
          to: "/history",
        });
      },
      onError() {
        showToast(t(`trip.estimation.confirmTrip`), "error");
      },
    });
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            {t("trip.estimation.title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <img
                  src={getMapUrl({
                    origin: ride.origin,
                    destination: ride.destination,
                  })}
                  alt="Mapa da Rota"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="flex items-center justify-center p-4">
                    <MapPin className="w-6 h-6 mr-2 text-primary" />
                    <div>
                      <p className="text-sm font-medium">
                        {t("trip.estimation.distance")}
                      </p>
                      <p className="text-xl font-bold">
                        {ride.distance || "N/A"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center justify-center p-4">
                    <Clock className="w-6 h-6 mr-2 text-primary" />
                    <div>
                      <p className="text-sm font-medium">
                        {t("trip.estimation.duration")}
                      </p>
                      <p className="text-xl font-bold">
                        {ride.duration || "N/A"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">
                {t("trip.estimation.drivers")}
              </h3>
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {ride.options.map((driver) => (
                  <Card
                    key={driver.id}
                    className={`cursor-pointer transition-all p-0.5 ${
                      selectedDriver === driver.id.toString()
                        ? "ring-2 ring-green-secondary ring-inset"
                        : "hover:shadow-md"
                    }`}
                    onClick={() => setSelectedDriver(driver.id.toString())}
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0">
                        <Avatar className="h-20 w-20 mb-4 sm:mb-0 sm:mr-4">
                          <AvatarFallback className="text-2xl font-bold text-green-primary">
                            {driver.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-grow space-y-3">
                          <h4 className="text-lg font-semibold">
                            {driver.name}
                          </h4>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {driver.description}
                          </p>
                          <div className="flex flex-wrap items-center mb-3">
                            <Car className="w-4 h-4 mr-1" />
                            <span className="text-sm mr-2 flex-grow">
                              {driver.vehicle}
                            </span>
                            <div className="bg-gray-100 text-secondary-foreground px-2 py-1 rounded-full text-sm font-medium">
                              {driver.value.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </div>
                          </div>
                          <div className="flex items-center flex-wrap">
                            <div className="flex mr-2 mb-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < driver.review.rating
                                      ? "text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm flex-grow">
                              {driver.review.comment}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button
                className="w-full mt-4"
                disabled={!selectedDriver}
                onClick={handleConfirmTrip}
                isLoading={isPending}
              >
                {t("trip.estimation.chooseDriver")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
