import { FormEvent, useState } from "react";
import useAuth from "./use-auth";
import useClientContext from "./use-client-context";
import { Auth } from "../types/auth";

type wanatToType = "login" | "create-account";

export default function useAuthPage(): [
  string,
  (wantTo: wanatToType) => (e: FormEvent) => Promise<void>
] {
  const [_, setAuth] = useAuth();
  const client = useClientContext();
  const [error, setError] = useState<string>("");

  return [
    error,
    (wantTo: wanatToType) => async (e: FormEvent) => {
      e.preventDefault();

      const fd = new FormData(e.target as HTMLFormElement);

      const user = fd.get("user") as string;
      const password = fd.get("password") as string;

      const isAuth = (await client?.get(wantTo as string, {
        user,
        password,
      })) as boolean;

      if (!isAuth)
        return setError(
          wantTo == "login"
            ? "wrong password or username"
            : "user already exists"
        );

      setAuth?.({
        isAuth: true,
        user,
        password,
      } as Auth);

      setError("sucess...");
    },
  ];
}
