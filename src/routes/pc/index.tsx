import { createFileRoute } from "@tanstack/react-router";
import { DmMainPanel } from "../pc";
import { H1, H2, InlineCode, List, P } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/pc/")({
  component: () => (
    <DmMainPanel className="flex justify-center">
      <article className="max-w-[70ch]">
        <H2>Welcome player!</H2>
        <P>
          This tool will help you manage all different aspects of your
          character, such as:
        </P>
        <List>
          <li>stats</li>
          <li>inventory</li>
          <li>spells</li>
          <li>quests</li>
          <li>...and more!</li>
        </List>
        <P>
          When you're ready, head on over to your{" "}
          <InlineCode>Character sheet</InlineCode> to start building!
        </P>
        <div className="flex w-full items-center justify-center p-1">
          <Button>go to Character Sheet</Button>
        </div>
      </article>
    </DmMainPanel>
  ),
});
