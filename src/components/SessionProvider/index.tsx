import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { Database } from "database.types";
import { Loader2 } from "lucide-react";
import {
  createContext,
  ReactNode,
  Suspense,
  useContext,
  useEffect,
  useState,
} from "react";
import { LoadingScreen } from "../LoadingScreen";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

const SessionContext = createContext<{
  session: Session | null;
  profile: Profile | null;
}>({
  session: null,
  profile: null,
});

export const useSession = () => {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error("useSession must be used inside a SessionProvider!");
  }

  return ctx;
};

const getUserProfile = async (sesh: Session) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", sesh.user.id);
  if (!error && data && data[0]) {
    return data[0];
  }
  return null;
};

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const listener = supabase.auth.onAuthStateChange((_, sesh) => {
      setSession(sesh);
      if (sesh) {
        // despite `onAuthStateChange` being allowed to be async, it hangs forever on awaiting supabase
        (async () => setProfile(await getUserProfile(sesh)))();
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      listener.data.subscription.unsubscribe();
    };
  }, [supabase]); // supabase will never be reactive so this feels wrong?

  if (isLoading) {
    return <div className="fixed inset-0 bg-background">loading</div>;
  }

  return (
    <SessionContext.Provider value={{ session, profile }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
