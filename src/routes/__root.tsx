import { SessionProvider, useSession } from "@/components/SessionProvider";
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { ThemeProvider } from "@/components/ui/theme-provider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { Session } from "@supabase/supabase-js";
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
    <SessionProvider>
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
    </SessionProvider>
  ),
});

const Navbar = () => {
  const { session } = useSession();
  return (
    <div className="flex gap-2 p-2">
      <Link to="/">DnD Dashboard</Link>
      <Link to="/dm">Dungeon master</Link>
      <Link to="/pc">Player</Link>
      <Link to="/about">About</Link>
      <div className="flex h-full w-full items-center justify-end gap-2">
        <ModeToggle />
        {session ? (
          <AvatarButton session={session} />
        ) : (
          <>
            <Link to="/auth/signup">sign up</Link>
            <Link to="/auth/login" variant={"default"}>
              login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

const AvatarButton = ({ session }: { session: Session }) => {
  //
  return (
    <Link to="/auth/profile" variant={"ghost"}>
      {session.user.email}
    </Link>
  );
};

export const SidebarNav = (props: { children: ReactNode }) => {
  //
  return <nav className="flex h-full flex-col gap-3 p-2">{props.children}</nav>;
};

const Link = ({
  variant,
  ...props
}: LinkProps & { variant?: ButtonProps["variant"] }) => {
  //
  return (
    <RouterLink
      {...props}
      className={cn(
        buttonVariants({ variant: variant ?? "ghost" }),
        "[&.active]:font-bold",
      )}
    />
  );
};
