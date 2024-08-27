import { Loader2 } from "lucide-react";

export const LoadingScreen = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-neutral-800 text-white">
    <Loader2 className="animate-spin" size={50} />
  </div>
);
