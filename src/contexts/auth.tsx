import { createContext, Dispatch, ReactNode, useEffect } from "react";
import AuthPage from "../pages/auth";
import { Auth, defaultAuth } from "../types/auth";
import useLocalStorage from "use-local-storage";
import useClientContext from "../hooks/use-client-context";

export const AuthContext = createContext<[Auth, Dispatch<Auth> | null]>([
  defaultAuth,
  null,
]);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useLocalStorage<Auth>(
    "live-planner-auth",
    defaultAuth
  );
  const client = useClientContext();

  useEffect(() => {
    client?.get("login", auth)?.then((isAuth) => {
      if (isAuth) return;
      setAuth(defaultAuth);
    });
  }, [client, auth]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {auth.isAuth ? children : <AuthPage />}
    </AuthContext.Provider>
  );
}
