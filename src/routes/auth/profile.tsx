import { useSession } from "@/components/SessionProvider";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Database } from "database.types";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/auth/profile")({
  // cant use hooks because this isnt a component :(
  // beforeLoad: () => {
  //   const { session } = useSession();
  //   if (!session) {
  //     throw redirect({ to: "/auth/login" });
  //   }
  // },
  component: () => <Component />,
});

const Component = () => {
  const { session } = useSession();
  const nav = useNavigate({ from: "/auth/profile" });
  type Profile = Database["public"]["Tables"]["profiles"]["Row"];
  const [profileDetails, setProfileDetails] = useState<{
    email: string;
    username: Profile["username"];
  }>({
    username: null,
    email: session?.user?.email ?? "",
  });

  useEffect(() => {
    if (!session) {
      nav({ to: "/auth/login" });
      return;
    }

    (async () => {
      const { data } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", session.user.id);
      // TODO handle better
      if (!data) return;
      const { username } = data[0];
      setProfileDetails((prev) => ({ ...prev, username }));
    })();
  }, [session]);

  if (!session) return;

  return (
    <div className="absolute inset-0 bg-[url(/tavern1.jpg)] bg-cover">
      <div className="h-full w-full bg-background/80 p-5 backdrop-blur-[6px]">
        <div className="mx-auto my-0 flex h-full w-full max-w-[70ch] flex-col items-center justify-center border-border">
          <header className="w-full">
            <h1 className="text-3xl font-bold tracking-wider">User profile</h1>
            <p className="text-muted-foreground"></p>
          </header>
          <br />
          <Email session={session} />
          <br />
          <Button className="w-full" onClick={() => supabase.auth.signOut()}>
            logout
          </Button>
        </div>
      </div>
    </div>
  );
};

const Email = ({ session }: { session: Session }) => {
  // TODO use OTP to change email
  // also need to update email template
  return (
    <>
      <div className="w-full">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="text"
          placeholder="adventurer@tavernmail.com"
          className=""
          value={session.user.email}
          disabled
          onChange={(e) => {}}
        />
      </div>
      <Dialog></Dialog>
    </>
  );
};
