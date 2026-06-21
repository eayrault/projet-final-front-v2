import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyEvents, unregisterFromEvent, type MyEventRegistration } from "../services/api";

function MyEventsPage() {
  const [registrations, setRegistrations] = useState<MyEventRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    getMyEvents()
      .then(setRegistrations)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleUnregister = async (eventId: string) => {
    setActionLoading(eventId);
    setError(null);

    try {
      await unregisterFromEvent(eventId);
      setRegistrations((prev) => prev.filter((r) => r.event_id !== eventId));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unregistration failed");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1D1B26] flex items-center justify-center">
        <p className="text-[#9B9080]">Loading your events...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1D1B26]">
      <header className="bg-[#272535] px-8 py-4 shadow-md flex justify-between items-center">
        <h1 className="m-0 text-[#DDC01C] text-2xl">LOCKED</h1>
        <Link
          to="/"
          className="py-2 px-4 text-sm bg-[#302E42] text-[#FFF8E7]! rounded hover:bg-[#403D56] transition-colors"
        >
          ← Back to home
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-8 py-12">
        <h2 className="text-3xl font-bold m-0 mb-8">My Events</h2>

        {error && <p className="text-red-400 mb-4">{error}</p>}

        {registrations.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#9B9080] text-lg mb-4">
              You are not registered to any event yet.
            </p>
            <Link to="/events" className="text-[#DDC01C] hover:text-[#B89E18]">
              Browse available events →
            </Link>
          </div>
        ) : (
          <ul className="list-none p-0 flex flex-col gap-4">
            {registrations.map((reg) => (
              <li
                key={reg.id}
                className="border border-[#444] rounded-xl p-5 hover:border-[#2B0071] transition-colors"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold m-0 mb-1 text-[#FFF8E7]">
                      {reg.event_name}
                    </h3>
                    {reg.event_description && (
                      <p className="text-[#9B9080] text-sm m-0 mb-2">
                        {reg.event_description}
                      </p>
                    )}
                    <p className="text-[#666] text-xs m-0 mb-1">
                      Starts:{" "}
                      {new Date(reg.event_start_date).toLocaleDateString()}
                    </p>
                    <p className="text-[#555] text-xs m-0">
                      Registered on:{" "}
                      {new Date(reg.registered_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 items-end shrink-0">
                    <Link
                      to={`/events/${reg.event_id}`}
                      className="text-[#DDC01C] hover:text-[#B89E18] text-sm whitespace-nowrap"
                    >
                      View details →
                    </Link>
                    <button
                      onClick={() => handleUnregister(reg.event_id)}
                      disabled={actionLoading === reg.event_id}
                      className="px-3 py-1.5 bg-red-600 text-[#FFF8E7] text-sm rounded-lg hover:bg-red-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {actionLoading === reg.event_id
                        ? "Processing..."
                        : "Unregister"}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default MyEventsPage;
