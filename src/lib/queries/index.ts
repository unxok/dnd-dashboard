import { CampaignDialogForm } from "@/routes/campaigns";
import { toast } from "sonner";
import { supabase } from "../supabase";

export const getCampaignsDM = async () => {
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

export const getCampaignRequests = async () => {
  const { data, error } = await supabase
    .from("campaign_requests")
    .select("id, created_at, campaign_invite_code, status");
  if (error || !data) {
    console.error(error);
    return undefined;
  }
  return data;
};

export type Campaigns = Awaited<ReturnType<typeof getCampaignsDM> | undefined>;
export type CampaignRequests = Awaited<
  ReturnType<typeof getCampaignRequests> | undefined
>;

export const deleteCampaign = async (id: number) => {
  const { error } = await supabase.from("campaigns").delete().eq("id", id);
  if (error) {
    return toast.error("Failed to delete :( Please try again!");
  }
  return toast.success("Campaign deleted successfully!");
};

export const createCampaign = async ({
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

export const updateCampaign = async ({
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
