import { Button, ButtonProps } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Link, LinkProps } from "@tanstack/react-router";
import { ReactNode } from "react";

export const SidebarNav = (props: {
  children: ReactNode;
  className?: string;
}) => {
  //
  return (
    <nav className={cn("flex h-full flex-col gap-3 p-2", props.className)}>
      {props.children}
    </nav>
  );
};

export const NavButton = ({
  children,
  tooltip,
  className,
  ariaHidden,
  ...props
}: LinkProps & {
  children: ReactNode;
  tooltip: ReactNode;
  className?: string;
  // so I can use it as a spacer
  ariaHidden?: boolean;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <Link
          {...props}
          className={cn(`group flex items-center justify-center`, className)}
        >
          <TooltipTrigger asChild>
            <Button
              disabled={props.disabled}
              aria-hidden={ariaHidden}
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
