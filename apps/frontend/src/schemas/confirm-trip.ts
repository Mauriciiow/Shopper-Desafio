export interface ConfirmTripRequestSchema {
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;
}

export interface ConfirmTripResponseSchema {
  message: string;
  ride: {
    id: number;
    customer_id: string;
    origin: string;
    destination: string;
    distance: string;
    duration: string;
    value: string;
    driverId: number;
    created_at: string;
    updated_at: string;
  };
}
