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
import { backdropBlur, CAMPAIGNS_QUERY_KEY } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Database } from "database.types";
import { Pen, Pencil, Trash, Trash2 } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/campaigns/")({
  component: () => <Component />,
});

type CampaignRow = Database["public"]["Tables"]["campaigns"]["Row"];

const getCampaigns = async () => {
  const { data, error } = await supabase
    .from("campaigns")
    .select(
      "id, campaign_name, world, Owner:profiles (username), created_at, invite_code",
    );
  if (error || !data) {
    console.error(error);
    return undefined;
  }
  return data;
};

type Campaigns = Awaited<ReturnType<typeof getCampaigns> | null>;

const Component = () => {
  // const [campaigns, setCampaigns] = useState<Campaigns>(null);

  const {
    data: campaigns,
    error,
    isLoading,
  } = useQuery({
    queryKey: [CAMPAIGNS_QUERY_KEY],
    queryFn: async () => {
      return await getCampaigns();
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
          <CampaignsTable keyPrefix="owned-campaigns" campaigns={campaigns} />
          <div className="flex w-full justify-end">
            <CampaignDialogButton isEdit={false} />
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

const deleteCampaign = async (id: number) => {
  const { error } = await supabase.from("campaigns").delete().eq("id", id);
  if (error) {
    return toast.error("Failed to delete :( Please try again!");
  }
  return toast.success("Campaign deleted successfully!");
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

type CampaignDialogForm = {
  campaign_name: string;
  world: string;
};

const createCampaign = async ({
  id: _, // have to have same params as updateCampaign since we are dynamically setting the mutationFn
  form,
}: {
  id: number;
  form: CampaignDialogForm;
}) => {
  const { campaign_name, world } = form;
  const { error } = await supabase.from("campaigns").insert({
    campaign_name,
    world,
  });
  if (error) {
    return toast.error("Something went wrong :( Please try again!");
  }
  return toast.success("Campaign created!");
};

const updateCampaign = async ({
  id,
  form,
}: {
  id: number;
  form: CampaignDialogForm;
}) => {
  const { campaign_name, world } = form;
  const { error } = await supabase
    .from("campaigns")
    .update({
      campaign_name,
      world,
    })
    .eq("id", id);
  if (error) {
    return toast.error("Something went wrong :( Please try again!");
  }
  return toast.success("Campaign updated!");
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
