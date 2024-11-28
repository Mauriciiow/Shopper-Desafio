import { SignInForm, Container, Header } from "@/components";

export default function SignIn() {
  return (
    <Container>
      <div className="flex flex-col min-h-screen h-full">
        <Header />
        <div className="flex flex-col items-center justify-center flex-grow pb-40">
          <SignInForm />
        </div>
      </div>
    </Container>
  );
}
