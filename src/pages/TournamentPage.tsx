import { Link } from "react-router-dom";

function TournamentPage() {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <header className="bg-[#2d2d2d] px-8 py-4 shadow-md flex justify-between items-center">
        <h1 className="m-0 text-[#646cff] text-2xl">LOCKED</h1>
        <Link
          to="/events"
          className="py-2 px-4 text-sm bg-[#3d3d3d] text-white! rounded hover:bg-[#4d4d4d] transition-colors"
        >
          ← Back to events
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-8 py-12">
        <h2 className="text-3xl font-bold m-0 mb-8">Tournaments</h2>
        <div className="text-center py-16">
          <p className="text-[#888] text-lg">No tournaments available yet.</p>
        </div>
      </main>
    </div>
  );
}

export default TournamentPage;
