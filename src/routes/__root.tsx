import { Button, buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { cn } from "@/lib/utils";
import {
  createRootRoute,
  Link as RouterLink,
  Outlet,
  LinkProps,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import {
  Home,
  Info,
  Package,
  ScrollText,
  Settings,
  Settings2,
  Shield,
  ShieldAlert,
  ShieldBan,
  ShieldHalf,
  Sword,
  Wrench,
} from "lucide-react";
import { ReactNode } from "react";

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider defaultTheme="system">
      <div className="fixed inset-0 flex">
        <div className="flex h-full flex-col gap-3 p-2">
          <NavButton to="/">
            <Home />
          </NavButton>
          <NavButton to="/about">
            <Sword />
          </NavButton>
          <NavButton to="/about">
            <Package />
          </NavButton>
          <NavButton to="/about">
            <ScrollText />
          </NavButton>
          <NavButton to="/about">
            <Wrench />
          </NavButton>
        </div>
        <div className="h-full w-[1px] bg-muted"></div>

        <div className="flex w-full flex-col">
          <div className="flex gap-2 p-2">
            <Link to="/">DnD Dashboard</Link> <Link to="/about">About</Link>
            <div className="flex h-full w-full items-center justify-end">
              <ModeToggle />
            </div>
          </div>
          <hr />
          <Outlet />
          <TanStackRouterDevtools />
        </div>
      </div>
    </ThemeProvider>
  ),
});

const Link = (props: LinkProps) => {
  //
  return (
    <RouterLink
      {...props}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "[&.active]:font-bold",
      )}
    />
  );
};

const NavButton = ({
  children,
  ...props
}: LinkProps & { children: ReactNode }) => (
  <RouterLink {...props} className="group">
    <Button
      variant={"outline"}
      className="p-2 text-muted-foreground group-data-[status=active]:bg-secondary group-data-[status=active]:text-primary"
    >
      {children}
    </Button>
  </RouterLink>
);
