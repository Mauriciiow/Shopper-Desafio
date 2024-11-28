import TripHistory from "@/components/trip-history";
import { Container, Header } from "@/components";
export default function TripRequest() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-screen h-full">
        <Header />
        <div className="flex flex-col w-full flex-grow">
          <TripHistory />
        </div>
      </div>
    </Container>
  );
}
