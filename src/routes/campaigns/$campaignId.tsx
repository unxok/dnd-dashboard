import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/campaigns/$campaignId")({
  component: (params) => <div>Hello /campaigns/$id!</div>,
});
