import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link, LinkProps } from "@tanstack/react-router";
import { ReactNode } from "react";

export const SidebarNav = (props: { children: ReactNode }) => {
  //
  return <nav className="flex h-full flex-col gap-3 p-2">{props.children}</nav>;
};

export const NavButton = ({
  children,
  tooltip,
  ...props
}: LinkProps & { children: ReactNode; tooltip: ReactNode }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <Link {...props} className="group">
          <TooltipTrigger asChild>
            <Button
              variant={"outline"}
              className="p-2 text-muted-foreground group-data-[status=active]:bg-secondary group-data-[status=active]:text-primary"
            >
              {children}
            </Button>
          </TooltipTrigger>
        </Link>
        <TooltipContent side="right">{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
