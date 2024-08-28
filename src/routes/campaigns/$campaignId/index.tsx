import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/campaigns/$campaignId/")({
  component: () => <div>Hello /campaigns/$campaignId/!</div>,
});
