import { useEffect, useState } from "react";

export default function useSecoundsPassed() {
  const [secoundsPassed, setSecloundsPassed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecloundsPassed((secoundsPassed) => secoundsPassed + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return secoundsPassed;
}
