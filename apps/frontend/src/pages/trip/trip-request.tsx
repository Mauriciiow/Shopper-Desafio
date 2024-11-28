import {
  RequestTripForm,
  Container,
  TripEstimation,
  Header,
} from "@/components";
import { TripRequestSchema } from "@/schemas/trip-request-schema";
import { useEstimate } from "@/use-case/use-estimate";
import { showToast } from "@/helper/toast";
import { useTranslation } from "react-i18next";
export default function TripRequest() {
  const {
    mutateAsync: postEstimative,
    isSuccess,
    data,
    isPending,
  } = useEstimate();
  const { t } = useTranslation();

  const onSubmit = (data: TripRequestSchema) => {
    postEstimative(
      {
        origin: data.originAddress,
        destination: data.destinationAddress,
      },
      {
        onError() {
          showToast(t(`estimativeForm.errors.invalidAddress`), "error");
        },
      }
    );
  };

  return (
    <Container>
      <div className="flex flex-col min-h-screen h-full">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          {!data && !isSuccess && (
            <div className="w-full flex flex-col items-center justify-center gap-4 pb-40">
              <RequestTripForm onSubmit={onSubmit} isPending={isPending} />
            </div>
          )}
          {data && isSuccess && (
            <div className="w-full flex flex-col items-center justify-center gap-4">
              <TripEstimation ride={data} />
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
