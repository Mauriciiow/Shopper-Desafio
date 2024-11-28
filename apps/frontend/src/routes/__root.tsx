import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { AuthContextProps } from "@/hooks/use-auth";

export const Route = createRootRouteWithContext<{
  auth: Pick<AuthContextProps, "authenticated">;
}>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
