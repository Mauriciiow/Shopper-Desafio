export interface ListTripsSchema {
  customer_id: string;
  rides: {
    id: number;
    date: string;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    driver: {
      id: number;
      name: string;
    };
    value: number;
  }[];
}
