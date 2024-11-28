import { createRoute, redirect } from "@tanstack/react-router";
import TravelRequest from "@/pages/trip/trip-request";
import TripHistory from "@/pages/trip/trip-history";
import { Route } from "./__root";
import { SignInRoute, SignUpRoute } from "./auth";

const protectedRoutes = createRoute({
  getParentRoute: () => Route,
  id: "authenticated",
  beforeLoad: ({ context, location }) => {
    if (!context.auth.authenticated) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }
  },
});

const indexRoute = createRoute({
  getParentRoute: () => protectedRoutes,
  path: "/",
  component: TravelRequest,
});

const historyRoute = createRoute({
  getParentRoute: () => protectedRoutes,
  path: "/history",
  component: TripHistory,
});

export const routeTree = Route.addChildren([
  protectedRoutes.addChildren([indexRoute, historyRoute]),
  SignInRoute,
  SignUpRoute,
]);
