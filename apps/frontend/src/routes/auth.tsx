import { createRoute, redirect } from "@tanstack/react-router";
import { Route } from "./__root";
import SignIn from "@/pages/auth/sign-in";
import SignUp from "@/pages/auth/sign-up";

export const SignInRoute = createRoute({
  getParentRoute: () => Route,
  path: "/login",
  component: SignIn,
  beforeLoad: ({ context }) => {
    if (context.auth.authenticated) {
      throw redirect({
        to: "/",
      });
    }
  },
});

export const SignUpRoute = createRoute({
  getParentRoute: () => Route,
  path: "/register",
  component: SignUp,
  beforeLoad: ({ context }) => {
    if (context.auth.authenticated) {
      throw redirect({
        to: "/",
      });
    }
  },
});
