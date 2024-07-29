import { createContext, ReactNode } from "react";
import Client from "wsnet-client";
import LoadingPage from "../pages/state/loading-page";
import ClosedPage from "../pages/state/closed";
import getClient from "../hooks/get-client";

export const ClientContext = createContext<Client | null>(null);

export default function ClientProvider({ children }: { children: ReactNode }) {
  const [client, status, retry, isClosed] = getClient();

  if (isClosed || status == "closed" || status == "failed") {
    return <ClosedPage retry={retry} />;
  }

  if (status == "sucess" && client) {
    return (
      <ClientContext.Provider value={client}>{children}</ClientContext.Provider>
    );
  }

  return <LoadingPage />;
}
