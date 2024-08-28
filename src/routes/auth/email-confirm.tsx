import { H1, H2, P } from "@/components/ui/typography";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/email-confirm")({
  component: () => (
    <div className="absolute inset-0">
      <article className="my-0 mx-auto flex h-full w-full max-w-[70ch] flex-col items-start justify-center">
        <H2>Thank you for registering!</H2>
        <P>
          Hopefully you will find this site helpful for you and your games :)
        </P>
        <br />
        <br />
        <H2>Next step, confirm your email!</H2>
        <P>
          You should receive an email from us with a confirmation link to finish
          registration.
        </P>
        <br />
        <P>
          After that, head on over to{" "}
          <Link
            to="/auth/profile"
            className="font-semibold underline underline-offset-4 hover:text-foreground/50"
          >
            your profile
          </Link>{" "}
          to set your username!
        </P>
      </article>
    </div>
  ),
});
