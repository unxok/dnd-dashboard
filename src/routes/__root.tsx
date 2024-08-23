import { Button, buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { ThemeProvider } from "@/components/ui/theme-provider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
      <div className="fixed inset-0 flex flex-col">
        <Navbar />
        <hr />
        <div className="relative flex h-full w-full">
          {/* <div className="flex h-full flex-col gap-3 p-2">
            <SidebarButtons />
          </div>
          <div className="h-full w-[1px] bg-muted"></div> */}
          <Outlet />
        </div>
        {/* <TanStackRouterDevtools /> */}
      </div>
    </ThemeProvider>
  ),
});

const Navbar = () => {
  //
  return (
    <div className="flex gap-2 p-2">
      <Link to="/">DnD Dashboard</Link>
      <Link to="/dm">Dungeon master</Link>
      <Link to="/pc">Player</Link>
      <Link to="/about">About</Link>
      <div className="flex h-full w-full items-center justify-end">
        <ModeToggle />
      </div>
    </div>
  );
};

export const SidebarNav = (props: { children: ReactNode }) => {
  //
  return <nav className="flex h-full flex-col gap-3 p-2">{props.children}</nav>;
};

const SidebarButtons = () => {
  //
  return (
    <>
      {" "}
      <NavButton to="/" tooltip="home">
        <Home />
      </NavButton>
      <NavButton to="/about" tooltip="home">
        <Sword />
      </NavButton>
      <NavButton to="/about" tooltip="home">
        <Package />
      </NavButton>
      <NavButton to="/about" tooltip="home">
        <ScrollText />
      </NavButton>
      <NavButton to="/about" tooltip="home">
        <Wrench />
      </NavButton>
    </>
  );
};

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
  tooltip,
  ...props
}: LinkProps & { children: ReactNode; tooltip: ReactNode }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <RouterLink {...props} className="group">
          <Button
            variant={"outline"}
            className="p-2 text-muted-foreground group-data-[status=active]:bg-secondary group-data-[status=active]:text-primary"
          >
            {children}
          </Button>
        </RouterLink>
      </TooltipTrigger>
      <TooltipContent side="right">{tooltip}</TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
