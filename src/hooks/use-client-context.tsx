import { useContext } from "react";
import { ClientContext } from "../contexts/wsnet-client";

export default function useClientContext() {
  return useContext(ClientContext);
}