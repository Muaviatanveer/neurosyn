import { createFileRoute, redirect, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/testimonials/$projectId")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/research/$projectId", params: { projectId: params.projectId }, statusCode: 301 });
  },
  component: () => null,
});
