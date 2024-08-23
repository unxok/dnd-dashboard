import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dm/battle")({
  component: () => <div>Hello /dm/battle!</div>,
});
