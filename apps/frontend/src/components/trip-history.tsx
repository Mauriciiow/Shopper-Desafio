import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { Button } from "@/components";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { useListTrips } from "@/use-case/use-list-trips";
import { useTranslation } from "react-i18next";

export default function TripHistory() {
  const { t } = useTranslation();
  const [selectedDriver, setSelectedDriver] = useState("all");
  const [filteredDriverId, setFilteredDriverId] = useState<
    string | undefined
  >();

  const { data: trips, refetch } = useListTrips(filteredDriverId);
  const allDriversLabel = t("trip.history.select.all");

  const drivers = [
    { id: "all", name: allDriversLabel },
    ...Array.from(
      new Map(trips?.rides.map((ride) => [ride.driver.id, ride.driver.name]))
    ).map(([id, name]) => ({ id: String(id), name })),
  ];
  const handleFilter = () => {
    setFilteredDriverId(selectedDriver === "all" ? undefined : selectedDriver);
    refetch();
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-green-tertiary">
          {t("trip.history.title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Select value={selectedDriver} onValueChange={setSelectedDriver}>
            <SelectTrigger className="sm:w-2/3">
              <SelectValue placeholder={t("trip.history.select.driver")} />
            </SelectTrigger>
            <SelectContent>
              {drivers.map((driver) => (
                <SelectItem key={driver.id} value={driver.id}>
                  {driver.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleFilter} className="sm:w-1/3">
            {t("trip.history.applyFilter")}
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("trip.history.date")}</TableHead>
                <TableHead>{t("trip.history.driver")}</TableHead>
                <TableHead>{t("trip.history.origin")}</TableHead>
                <TableHead>{t("trip.history.destination")}</TableHead>
                <TableHead>{t("trip.history.distance")}</TableHead>
                <TableHead>{t("trip.history.duration")}</TableHead>
                <TableHead>{t("trip.history.value")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trips?.rides.map((trip) => (
                <TableRow key={trip.id}>
                  <TableCell>
                    {new Date(trip.date).toLocaleString("pt-BR")}
                  </TableCell>
                  <TableCell>{trip.driver.name}</TableCell>
                  <TableCell>{trip.origin}</TableCell>
                  <TableCell>{trip.destination}</TableCell>
                  <TableCell>{trip.distance} km</TableCell>
                  <TableCell>{trip.duration}</TableCell>
                  <TableCell>
                    {trip.value.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
