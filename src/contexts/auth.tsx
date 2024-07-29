import { createContext, Dispatch, ReactNode, useEffect, useState } from "react";
import AuthPage from "../pages/auth";
import { Auth, defaultAuth } from "../types/auth";
import useLocalStorage from "use-local-storage";
import useClientContext from "../hooks/use-client-context";

export const AuthContext = createContext<
  [Auth, Dispatch<Auth> | null, boolean]
>([defaultAuth, null, false]);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [auth, setAuth] = useLocalStorage<Auth>(
    "live-planner-auth",
    defaultAuth
  );
  const client = useClientContext();

  useEffect(() => {
    client?.get("login", auth)?.then((_isAuth) => {
      setIsAuth(_isAuth);
      if (_isAuth) return;
      setAuth(defaultAuth);
    });
  }, [client, auth]);

  return (
    <AuthContext.Provider value={[auth, setAuth, isAuth]}>
      {auth.isAuth ? children : <AuthPage />}
    </AuthContext.Provider>
  );
}
