import { EstimateResponseSchema } from "@/schemas/estimate-schema";

type MapPoint = {
  origin: EstimateResponseSchema["origin"];
  destination: EstimateResponseSchema["destination"];
};

export const getMapUrl = ({ origin, destination }: MapPoint) => {
  const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  console.log(googleApiKey);
  return `https://maps.googleapis.com/maps/api/staticmap?size=600x300&markers=color:green|label:A|${origin.latitude},${origin.longitude}&markers=color:red|label:B|${destination.latitude},${destination.longitude}&path=color:0xFFFFFF00|weight:5|${origin.latitude},${origin.longitude}|${destination.latitude},${destination.longitude}&key=${googleApiKey}`;
};
