import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { H2, H3, InlineCode, P } from "@/components/ui/typography";
import {
  backdropBlur,
  CAMPAIGN_REQUESTS_QUERY_KEY,
  CAMPAIGNS_QUERY_KEY,
} from "@/lib/constants";
import { supabase } from "@/lib/supabase";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Database } from "database.types";
import { Loader2, Pen, Pencil, Trash, Trash2 } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useSession } from "@/components/SessionProvider";
import {
  getCampaignsDM,
  getCampaignRequests,
  Campaigns,
  deleteCampaign,
  updateCampaign,
  createCampaign,
  CampaignRequests,
} from "@/lib/queries";

export const Route = createFileRoute("/campaigns/")({
  component: () => <Component />,
});

type CampaignRow = Database["public"]["Tables"]["campaigns"]["Row"];

const createCampaignRequest = async ({
  pc_user_id,
  campaign_invite_code,
}: {
  pc_user_id: string;
  campaign_invite_code: string;
}) => {
  const { error } = await supabase
    .from("campaign_requests")
    .insert({ pc_user_id, campaign_invite_code });
  if (error) {
    toast.error("Failed to submit request :( Please try again later!");
    return false;
  }
  toast.success("Submitted request!");
  return true;
};

const Component = () => {
  // const [campaigns, setCampaigns] = useState<Campaigns>(null);

  const {
    data: campaigns,
    error: campaignsError,
    isLoading: campaignsLoading,
  } = useQuery({
    queryKey: [CAMPAIGNS_QUERY_KEY],
    queryFn: async () => {
      return await getCampaignsDM();
    },
  });
  const {
    data: requests,
    error: requestsError,
    isLoading: requestsLoading,
  } = useQuery({
    queryKey: [CAMPAIGN_REQUESTS_QUERY_KEY],
    queryFn: async () => {
      return await getCampaignRequests();
    },
  });

  // useEffect(() => {
  //   (async () => setCampaigns(await getCampaigns()))();
  // }, []);

  return (
    <div className="absolute inset-0 bg-[url(/library2.jpg)] bg-cover">
      <div
        className={`h-full w-full bg-background/30 backdrop-blur-[${backdropBlur}]`}
      >
        <div className="mx-auto my-0 h-full w-full overflow-y-auto bg-background/90 p-10">
          <H2>Campaigns</H2>
          <P>
            Campaigns are the backbone of D&D! Manage the ones you are a part
            of, edit them, or make a new one on this page.
          </P>
          <P>
            Click the <InlineCode>Campaign name</InlineCode> to start playing!
          </P>
          <br />
          <H3>Where you're DM</H3>
          {campaignsLoading ? (
            <Loader2 size={50} className="animate-spin" />
          ) : (
            <CampaignsTable keyPrefix="owned-campaigns" campaigns={campaigns} />
          )}
          <div className="flex w-full justify-end">
            <CampaignDialogButton isEdit={false} />
          </div>
          <br />
          <H3>Requests</H3>
          <P>Requests you've sent as a player to join a campaign.</P>
          {requestsLoading ? (
            <Loader2 size={50} className="animate-spin" />
          ) : (
            <CampaignRequestsTable
              keyPrefix="campaign-requests"
              requests={requests}
            />
          )}
          <div className="flex w-full justify-end">
            <RequestsDialogButton />
          </div>
        </div>
      </div>
    </div>
  );
};

const headerHelper = (header: string) => {
  const words = header.split("_");
  words[0] = words[0][0].toUpperCase() + words[0].substring(1);
  const h = words.join(" ");
  if (h === "Profiles") return "Owner";
  return h;
};

const dataHelper: (id: number, header: string, data: unknown) => ReactNode = (
  id,
  header,
  data,
) => {
  if (data?.hasOwnProperty("username")) {
    return (data as { username: string }).username;
  }

  if (header === "created_at") {
    const str = data?.toString();
    if (!str) return str;
    const dt = new Date(str);
    return dt.toLocaleString();
  }

  if (header === "campaign_name") {
    return (
      <Link
        to={"/campaigns/$campaignId"}
        params={{ campaignId: id.toString() }}
        className="underline underline-offset-4 transition-colors hover:opacity-50"
      >
        {data?.toString()}
      </Link>
    );
  }

  return data as string;
};

const CampaignsTable = ({
  keyPrefix,
  campaigns,
}: {
  keyPrefix: string;
  campaigns: Campaigns;
}) => {
  //

  if (!campaigns) {
    return <div>no campaigns</div>;
  }

  const headers = Object.keys(campaigns[0]);

  return (
    <div className="py-3">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((h, i) => (
              <TableHead key={keyPrefix + h + i + "header-cell"}>
                {headerHelper(h)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.map((c, ci) => (
            <TableRow key={keyPrefix + ci + "table-row"}>
              {Object.entries(c).map(([key, value], di) => (
                <TableCell key={keyPrefix + key + di}>
                  {dataHelper(c.id, headers[di], value)}
                </TableCell>
              ))}
              <TableCell>
                <CampaignDialogButton
                  isEdit={true}
                  id={c.id}
                  defaultForm={{
                    campaign_name: c.campaign_name,
                    world: c.world,
                  }}
                >
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    tooltip="Edit campaign "
                  >
                    <Pen size={"1.25rem"} />
                  </Button>
                </CampaignDialogButton>
                <CampaignDelete
                  id={c.id}
                  campaign_name={c.campaign_name}
                  created_at={
                    dataHelper(c.id, "created_at", c.created_at)?.toString() ??
                    ""
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const CampaignDelete = ({
  id,
  campaign_name,
  created_at,
}: {
  id: number;
  campaign_name: string;
  created_at: string;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["campaign-delete"],
    mutationFn: deleteCampaign,
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [CAMPAIGNS_QUERY_KEY] }),
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"destructiveGhost"}
          size={"icon"}
          tooltip="Delete campaign"
        >
          <Trash2 size={"1.25rem"} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm campaign deletion</DialogTitle>
          <DialogDescription>
            You will <i>not</i> be able to undo this, are you absolutely sure?
          </DialogDescription>
        </DialogHeader>
        <div className="p-3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Campaign name</TableHead>
                <TableHead>Created at</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{id}</TableCell>
                <TableCell>{campaign_name}</TableCell>
                <TableCell>{created_at}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <DialogFooter>
          <DialogClose className={buttonVariants({ variant: "outline" })}>
            back to safety
          </DialogClose>
          <DialogClose
            className={buttonVariants({ variant: "destructive" })}
            onClick={() => mutation.mutate(id)}
          >
            delete it forever
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export type CampaignDialogForm = {
  campaign_name: string;
  world: string;
};

type CampaignDialogProps = (
  | {
      isEdit: false;
    }
  | {
      isEdit: true;
      id: number;
      defaultForm: CampaignDialogForm;
    }
) & {
  children?: ReactNode;
};
const CampaignDialogButton = (props: CampaignDialogProps) => {
  const { children } = props;
  // destructing props in params of function doesn't infer types correctly with discriminated unions...
  const defaultForm: CampaignDialogForm = props.isEdit
    ? { ...props.defaultForm }
    : {
        campaign_name: "The Lost Mines of Phandelver",
        world: "The forgotten realms",
      };
  const [form, setForm] = useState<CampaignDialogForm>(defaultForm);
  const updateForm = <T extends keyof typeof form>(
    key: T,
    value: (typeof form)[T],
  ) => setForm((prev) => ({ ...prev, [key]: value }));

  const mutationFn = props.isEdit ? updateCampaign : createCampaign;

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["create-campaign"],
    mutationFn: mutationFn,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [CAMPAIGNS_QUERY_KEY] });
    },
  });

  const onClose = () => {
    setForm(() => ({ ...defaultForm }));
  };

  return (
    <Dialog
      onOpenChange={(b) => {
        if (b) return;
        onClose();
      }}
    >
      <DialogTrigger asChild>
        {children ? children : <Button>create new</Button>}
      </DialogTrigger>
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const id = props.isEdit ? props.id : -1;
            mutation.mutate({ id, form });
          }}
        >
          <DialogHeader>
            <DialogTitle>
              {props.isEdit ? "Updating campaign" : "Creating a new campaign"}
            </DialogTitle>
            <DialogDescription>
              {props.isEdit ? "Dang typos!" : "Adventure awaits you!"}
            </DialogDescription>
          </DialogHeader>
          <div className="flex w-full flex-col gap-4 py-3">
            {props.isEdit && (
              <div>
                <Label htmlFor="id">Id</Label>
                <Input
                  required
                  id="id"
                  name="id"
                  type="text"
                  value={props.id}
                  disabled
                />
              </div>
            )}
            <div>
              <Label htmlFor="world">World name</Label>
              <Input
                required
                id="world"
                name="world"
                type="text"
                value={form.world}
                onChange={(e) => updateForm("world", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="campaign_name">Campaign name</Label>
              <Input
                required
                id="campaign_name"
                name="campaign_name"
                type="text"
                value={form.campaign_name}
                onChange={(e) => updateForm("campaign_name", e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose className={buttonVariants({ variant: "ghost" })}>
              cancel
            </DialogClose>
            <DialogClose
              type="submit"
              className={buttonVariants({ variant: "default" })}
            >
              {props.isEdit ? "update" : "create"}
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const RequestsDialogButton = () => {
  const [inviteCode, setInviteCode] = useState("");
  const { session } = useSession();

  if (!session) return;

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["create-campaign"],
    mutationFn: createCampaignRequest,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [CAMPAIGN_REQUESTS_QUERY_KEY],
      });
    },
  });

  const onClose = () => {
    setInviteCode("");
  };

  return (
    <Dialog
      onOpenChange={(b) => {
        if (b) return;
        onClose();
      }}
    >
      <DialogTrigger asChild>
        <Button>submit request</Button>
      </DialogTrigger>
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate({
              pc_user_id: session.user.id,
              campaign_invite_code: inviteCode,
            });
          }}
        >
          <DialogHeader>
            <DialogTitle>Submit campaign join request</DialogTitle>
            <DialogDescription>
              Requests are reviewed by the DM of the campaign.
            </DialogDescription>
          </DialogHeader>
          <div className="flex w-full flex-col gap-4 py-3">
            <div>
              <Label htmlFor="invite-code">Invite code</Label>
              <Input
                required
                id="invite-code"
                name="invite-code"
                type="text"
                placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose className={buttonVariants({ variant: "ghost" })}>
              cancel
            </DialogClose>
            <DialogClose
              type="submit"
              className={buttonVariants({ variant: "default" })}
            >
              submit
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const CampaignRequestsTable = ({
  keyPrefix,
  requests,
}: {
  keyPrefix: string;
  requests: CampaignRequests;
}) => {
  if (!requests || !requests.length) {
    return <em className="text-muted-foreground">no campaign requests</em>;
  }

  const headers = Object.keys(requests[0]);

  return (
    <div className="py-3">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((h, i) => (
              <TableHead key={keyPrefix + h + i + "header-cell"}>
                {headerHelper(h)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((c, ci) => (
            <TableRow key={keyPrefix + ci + "table-row"}>
              {Object.entries(c).map(([key, value], di) => (
                <TableCell key={keyPrefix + key + di}>
                  {dataHelper(c.id, headers[di], value)}
                </TableCell>
              ))}
              <TableCell>alsdkfj</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
