import useSecoundsPassed from "../../../hooks/use-secounds-passed";
import "./index.css";

export default function LoadingPage() {
  const secoundsPassed = useSecoundsPassed();

  return (
    <div className="page flex col loading-page">
      <h2>Loading... ({secoundsPassed}s)</h2>
      <span className="loading-spinner" />
    </div>
  );
}