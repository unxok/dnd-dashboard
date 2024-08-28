import { useSession } from "@/components/SessionProvider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Database } from "database.types";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  Check,
  CheckCircle,
  CheckCircle2,
  Cross,
  Loader,
  Loader2,
  Pencil,
  X,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { backdropBlur } from "@/lib/constants";

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
  const { session, profile } = useSession();
  const nav = useNavigate({ from: "/auth/profile" });
  type Profile = Database["public"]["Tables"]["profiles"]["Row"];

  useEffect(() => {
    if (!session) {
      nav({ to: "/auth/login" });
      return;
    }
  });

  if (!session || !profile) return;

  return (
    <div className="absolute inset-0 bg-[url(/tavern2.jpg)] bg-cover">
      <div
        className={`h-full w-full bg-background/80 p-5 backdrop-blur-[${backdropBlur}]`}
      >
        <div className="mx-auto my-0 flex h-full w-full max-w-[70ch] flex-col items-center justify-center border-border">
          <header className="w-full">
            <h1 className="text-3xl font-bold tracking-wider">User profile</h1>
            <p className="text-muted-foreground"></p>
          </header>
          <br />

          <Email session={session} />
          <Password session={session} />
          <Username session={session} username={profile.username} />
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

  const [isEditing, setEditing] = useState(false);
  const [value, setValue] = useState(session.user.email ?? "");
  const [isOpen, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  return (
    <>
      <div className="w-full">
        <Label htmlFor="email">Email</Label>
        <div className="flex items-center gap-1">
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="adventurer@tavernmail.com"
            className=""
            value={value}
            disabled={!isEditing}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          {isEditing ? (
            <>
              <Button
                variant={"outline"}
                className=""
                onClick={async () => {
                  setEditing(false);
                  setLoading(true);
                  const { error } = await supabase.auth.updateUser({
                    email: value,
                  });
                  setLoading(false);
                  if (!error) return setOpen(true);
                  toast.error(
                    "Something went wrong :( Please try again later!",
                  );
                  return;
                }}
              >
                <Check />
              </Button>
              <Button
                variant={"destructive"}
                className=""
                onClick={() => {
                  setEditing(false);
                  setValue(session.user.email ?? "");
                }}
              >
                <X />
              </Button>
            </>
          ) : (
            <Button
              variant={"ghost"}
              className=""
              onClick={() => setEditing(true)}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <Pencil />}
            </Button>
          )}
        </div>
      </div>
      <EmailOTP isOpen={isOpen} setOpen={setOpen} newEmail={value} />
    </>
  );
};

const EmailOTP = ({
  isOpen,
  setOpen,
  newEmail,
}: {
  isOpen: boolean;
  setOpen: (b: boolean) => void;
  newEmail: string;
}) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [value, setValue] = useState("");

  const validateInput = async (token: string) => {
    setLoading(true);
    const { error: err } = await supabase.auth.verifyOtp({
      type: "email_change",
      email: newEmail,
      token: token,
    });
    setLoading(false);
    if (err) {
      setError(err.message);
      return;
    }
    setError("");
    setOpen(false);
    toast.success("Email succesfully changed!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Verify OTP</DialogTitle>
        <DialogDescription>
          Please enter the One Time Password (OTP) sent to your new email
          address.
          <br />
          Do <u>not close</u> this popup. If you do, you must have a new code
          sent!
        </DialogDescription>
        <div className="flex w-full justify-center">
          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            value={value}
            onChange={setValue}
            onComplete={() => {
              // Just to make sure state update happens
              setTimeout(() => validateInput(value), 0);
            }}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <DialogFooter className="w-full flex-col flex-wrap items-center justify-center md:flex-row">
          <div className="flex w-full items-center justify-center">
            {error && (
              <div className="rounded-sm bg-destructive p-2 text-destructive-foreground">
                {error}
              </div>
            )}{" "}
            &nbsp;
          </div>
          <Button
            variant={"ghost"}
            className="w-full md:w-fit"
            onClick={() => setOpen(false)}
          >
            cancel
          </Button>
          <Button
            className="w-full md:w-fit"
            onClick={async () => await validateInput(value)}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const Password = ({ session }: { session: Session }) => {
  // TODO use OTP to change email
  // also need to update email template

  const [isEditing, setEditing] = useState(false);
  const [value, setValue] = useState("");
  const [confirmValue, setConfirmValue] = useState("");
  const [isLoading, setLoading] = useState(false);

  return (
    <>
      <div className="w-full">
        <Label htmlFor="password">Password</Label>

        <div className="flex">
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            className=""
            value={value}
            disabled={!isEditing}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          {!isEditing && (
            <Button
              variant={"ghost"}
              className=""
              onClick={() => setEditing(true)}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <Pencil />}
            </Button>
          )}
        </div>

        {isEditing && (
          <div>
            <Label htmlFor="confirm-password">Confirm password</Label>
            <Input
              id="confirm-password"
              name="confirm-password"
              type="password"
              placeholder="••••••••"
              className={value !== confirmValue ? "border-destructive" : ""}
              value={confirmValue}
              disabled={!isEditing}
              onChange={(e) => {
                setConfirmValue(e.target.value);
              }}
            />
            <div className="flex gap-2 py-2">
              <Button
                variant={"outline"}
                className=""
                disabled={value !== confirmValue}
                onClick={async () => {
                  setEditing(false);
                  setLoading(true);
                  const { error } = await supabase.auth.updateUser({
                    password: value,
                  });
                  setLoading(false);
                  setValue("");
                  if (error) {
                    return toast.error(
                      "Something went wrong :( Please try again later!",
                    );
                  }
                  toast.success("Password changed succesfully!");
                }}
              >
                <Check />
              </Button>
              <Button
                variant={"destructive"}
                className=""
                onClick={() => {
                  setEditing(false);
                  setValue("");
                }}
              >
                <X />
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const validateUsername = async (username: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username);
  // username not available
  if (data?.length) return false;
  if (error) {
    toast.error(
      "Something went wrong during username validation :( Please try again later!",
    );
    return false;
  }
  // username *is* available
  return true;
};

const Username = ({
  username,
  session,
}: {
  username: string;
  session: Session;
}) => {
  const [isEditing, setEditing] = useState(false);
  const [value, setValue] = useState(username);
  const [isAvailable, setAvailable] = useState(true);

  const updateUsername = async () => {
    if (!isAvailable) return;
    const { data, error } = await supabase
      .from("profiles")
      .update({ username: value })
      .eq("id", session.user.id);
    if (error) {
      toast.error(
        "Something went wrong when updating username :( Please try again later!",
      );
      return;
    }
    toast.success("Updated username!");
    await supabase.auth.refreshSession();
  };

  const { isPending: isLoading, mutate } = useMutation({
    mutationKey: ["username-validate"],
    mutationFn: async (un: string) =>
      setAvailable(username === un ? true : await validateUsername(un)),
  });

  return (
    <>
      <div className="w-full">
        <Label htmlFor="username">Username</Label>

        <div className="flex">
          <Input
            id="username"
            name="username"
            type="username"
            className=""
            value={value}
            disabled={!isEditing}
            onChange={(e) => {
              setValue(e.target.value);
              mutate(e.target.value);
            }}
          />
          {!isEditing && (
            <Button
              variant={"ghost"}
              className=""
              onClick={() => setEditing(true)}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <Pencil />}
            </Button>
          )}
        </div>

        {isEditing && (
          <div>
            <div className="flex gap-1 p-2">
              available{" "}
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : isAvailable ? (
                <CheckCircle2 className="text-green-500" />
              ) : (
                <XCircle className="text-red-500" />
              )}
            </div>
            <div className="flex gap-2 py-2">
              <Button
                variant={"outline"}
                disabled={!isAvailable}
                className=""
                onClick={async () => {
                  setEditing(false);
                  await updateUsername();
                }}
              >
                <Check />
              </Button>
              <Button
                variant={"destructive"}
                className=""
                onClick={() => {
                  setEditing(false);
                  setValue(username);
                  setAvailable(true);
                }}
              >
                <X />
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
