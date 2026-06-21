import { Link } from "react-router-dom";

function TournamentPage() {
  return (
    <div className="min-h-screen bg-[#1D1B26]">
      <header className="bg-[#272535] px-8 py-4 shadow-md flex justify-between items-center">
        <h1 className="m-0 text-[#DDC01C] text-2xl">LOCKED</h1>
        <Link
          to="/events"
          className="py-2 px-4 text-sm bg-[#302E42] text-[#FFF8E7]! rounded hover:bg-[#403D56] transition-colors"
        >
          ← Back to events
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-8 py-12">
        <h2 className="text-3xl font-bold m-0 mb-8">Tournaments</h2>
        <div className="text-center py-16">
          <p className="text-[#9B9080] text-lg">
            No tournaments available yet.
          </p>
        </div>
      </main>
    </div>
  );
}

export default TournamentPage;
