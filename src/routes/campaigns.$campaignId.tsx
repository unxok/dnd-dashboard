import {
  CharacterContextProvider,
  defaultCharacterSheet,
} from "@/components/CharacterContextProvider";
import { NavButton, SidebarNav } from "@/components/Sidebar";
import { cn } from "@/lib/utils";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import {
  Home,
  Sword,
  Package,
  ScrollText,
  Wrench,
  Shapes,
  Drama,
  BookUser,
  Users,
  BookMarked,
} from "lucide-react";
import { createContext, ReactNode, useContext, useState } from "react";

export const Route = createFileRoute("/campaigns/$campaignId")({
  component: () => (
    <div className="absolute inset-0 flex max-w-[100vw] items-start justify-start">
      <SidebarNav className="hidden md:flex">
        <SidebarButtons />
      </SidebarNav>
      <div className="hidden h-full w-[1px] bg-muted md:flex" />
      <div className="relative flex h-full w-full flex-col">
        <CharacterContextProvider defaultInfo={defaultCharacterSheet}>
          <Outlet />
        </CharacterContextProvider>
        <div className="h-fit">
          <SidebarNav className="md:[&>a>button>svg]:h-unset md:[&>a>button>svg]:w-unset flex h-24 flex-row overflow-x-auto md:hidden [&>a]:h-full md:[&>a]:h-fit [&>a>button>svg]:h-10 [&>a>button>svg]:w-12 [&>a>button]:h-full md:[&>a>button]:h-fit">
            <SidebarButtons />
          </SidebarNav>
        </div>
      </div>
    </div>
  ),
});

export const DmMainPanel = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  //
  return (
    <main className={cn("h-full w-full bg-secondary p-2", className)}>
      {children}
    </main>
  );
};

const SidebarButtons = () => {
  //
  return (
    <>
      <NavButton to="/pc/character-sheet" tooltip="Full Character Sheet">
        <BookUser />
      </NavButton>
      <NavButton to="/" tooltip="Stats">
        <Shapes />
      </NavButton>
      <NavButton to="/about" tooltip="Attacks">
        <Sword />
      </NavButton>
      <NavButton to="/about" tooltip="Inventory">
        <Package />
      </NavButton>
      <NavButton to="/about" tooltip="Personality & Bio">
        <Drama />
      </NavButton>
      <NavButton to="/about" tooltip="Quests">
        <ScrollText />
      </NavButton>

      <div className="flex h-full flex-col justify-end gap-[inherit]">
        <NavButton to="/about" tooltip="Settings">
          <Wrench />
        </NavButton>
        <NavButton to="/about" tooltip="Switch character">
          <Users />
        </NavButton>
        <NavButton to="/about" tooltip="Switch campaign">
          <BookMarked />
        </NavButton>
        {/* The link popup in the browser bottom left corner typically will block the tooltip, so a spacer remdedies that */}
        {/* Eventually should switch out with a collapse toogle */}
        <NavButton ariaHidden disabled className="opacity-0" tooltip="spacer">
          <BookMarked />
        </NavButton>
      </div>
    </>
  );
};
