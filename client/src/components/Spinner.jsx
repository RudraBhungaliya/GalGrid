export default function Spinner() {
  return (
    <div className="spinner-screen" role="status" aria-live="polite">
      <div className="spinner-ring" aria-hidden="true"></div>
      <p className="spinner-label">Loading photos...</p>
    </div>
  );
}