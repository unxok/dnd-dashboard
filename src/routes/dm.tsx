import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/dm")({
  component: () => (
    <div>
      Hello /dm!!! <Outlet />
    </div>
  ),
});
