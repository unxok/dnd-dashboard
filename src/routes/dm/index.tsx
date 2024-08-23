import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dm/")({
  component: () => <div>Hello /dm/!</div>,
});
