import Client from "wsnet-client";
import { Status, useClient } from "wsnet-client-react";

export default function getClient(): [
  null | Client,
  Status,
  () => Promise<void>,
  boolean
] {
  return useClient(() => {
    const client = new Client(
      document.location.protocol == "http:" ? "ws://localhost:8080" : ""
    );

    return client;
  });
}
