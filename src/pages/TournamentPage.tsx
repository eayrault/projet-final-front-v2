import { Link } from "react-router-dom";

function TournamentPage() {
  return (
    <div className="p-5">
      <Link
        to="/events"
        className="text-[#646cff] hover:text-[#535bf2] text-sm"
      >
        ← Back to events details
      </Link>
      <h1>Tournament Page</h1>
    </div>
  );
}
export default TournamentPage;
