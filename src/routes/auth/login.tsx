import { useSession } from "@/components/SessionProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ReactNode, useEffect, useState } from "react";

export const Route = createFileRoute("/auth/login")({
  component: () => {
    const [form, setForm] = useState({
      email: "",
      password: "",
    });
    const [error, setError] = useState<ReactNode>(null);
    const nav = useNavigate({ from: "/auth/login" });

    const updateForm = <T extends keyof typeof form>(
      key: T,
      value: (typeof form)[T],
    ) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    };

    const { session } = useSession();
    useEffect(() => {
      if (session) {
        nav({ to: "/" });
        return;
      }
    }, [session]);

    supabase.auth.updateUser({ email: "" });

    return (
      <div className="absolute inset-0 bg-[url(/tavern1.jpg)] bg-cover">
        <div className="h-full w-full bg-background/80 p-5 backdrop-blur-[6px]">
          <div className="mx-auto my-0 flex h-full w-full max-w-[70ch] flex-col items-center justify-center border-border">
            <header className="">
              <h1 className="text-3xl font-bold tracking-wider">
                Log in to your account
              </h1>
              <p className="text-muted-foreground">
                Welcome back, traveller! Ready to jump back into adventure?
              </p>
            </header>
            <br />
            <form
              className="flex w-full flex-col items-start justify-center gap-2"
              onSubmit={async (e) => {
                e.preventDefault();

                const { error } = await supabase.auth.signInWithPassword({
                  email: form.email,
                  password: form.password,
                });

                if (error) {
                  console.log(error.message);
                  return setError(
                    <div className="w-full rounded-md border-border bg-destructive/60 p-2 text-sm text-destructive-foreground">
                      <p>Hm, something went wrong :(</p>
                      <p>
                        Try rolling an <i>intelligence check</i> and go again!
                      </p>
                    </div>,
                  );
                }

                nav({ to: "/" });
              }}
            >
              <div className="w-full">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="adventurer@tavernmail.com"
                  className=""
                  value={form.email}
                  onChange={(e) => updateForm("email", e.target.value)}
                />
              </div>
              <div className="w-full">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => updateForm("password", e.target.value)}
                />
              </div>
              {error ?? <br />}
              <Button type="submit" className="w-full">
                login
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  },
});
