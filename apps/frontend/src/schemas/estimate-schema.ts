export interface EstimateRequestSchema {
  origin: string;
  destination: string;
}

export interface EstimateResponseSchema {
  origin: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
  distance: string;
  duration: string;
  options: [
    {
      id: number;
      name: string;
      description: string;
      vehicle: string;
      review: {
        rating: number;
        comment: string;
      };
      value: number;
    },
  ];
}
