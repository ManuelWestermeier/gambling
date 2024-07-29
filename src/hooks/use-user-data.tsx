import { useEffect } from "react";
import useClientContext from "./use-client-context";
import UserData from "../types/user-data";
import useLocalStorage from "use-local-storage";
import useAuth from "./use-auth";

export default function useUserData() {
  const [value, setValue] = useLocalStorage<"loading" | UserData>(
    "gambling-user-data",
    "loading"
  );
  const client = useClientContext();
  const authData = useAuth();

  useEffect(() => {
    //fetch
    client
      ?.get("user-data", authData[0].user)
      .then((v) => setValue(JSON.parse(v) as UserData));
    //on change
    client?.onSay("change-user-data", (v) => setValue(v as UserData), true);
  }, [client]);

  return value;
}
