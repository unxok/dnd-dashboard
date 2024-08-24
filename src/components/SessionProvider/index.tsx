import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const SessionContext = createContext<{
  session: Session | null;
}>({
  session: null,
});

export const useSession = () => {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error("useSession must be used inside a SessionProvider!");
  }

  return ctx;
};

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const listener = supabase.auth.onAuthStateChange((_, sesh) => {
      setSession(sesh);
      setLoading(false);
    });

    return () => {
      listener.data.subscription.unsubscribe();
    };
  }, [supabase]); // supabase will never be reactive so this feels wrong?

  return (
    <SessionContext.Provider value={{ session }}>
      {isLoading ? <>Loading...</> : children}
    </SessionContext.Provider>
  );
};
