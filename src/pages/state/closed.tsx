export default function ClosedPage({ retry }: { retry: () => Promise<void> }) {
  return (
    <div className="page flex col">
      <h1>Connection Closed</h1>
      <button onClick={() => retry()}>Retry</button>
    </div>
  );
}
