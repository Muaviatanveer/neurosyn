import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/muavia")({
  beforeLoad: () => {
    throw redirect({ to: "/founder" });
  },
  component: () => null,
});
