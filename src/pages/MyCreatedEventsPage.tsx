import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyCreatedEvents, type EventResponse } from "../services/api";

function MyCreatedEventsPage() {
  const [events, setEvents] = useState<EventResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMyCreatedEvents()
      .then(setEvents)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <p className="text-[#888]">Loading your events...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <header className="bg-[#2d2d2d] px-8 py-4 shadow-md flex justify-between items-center">
        <h1 className="m-0 text-[#646cff] text-2xl">LOCKED</h1>
        <Link
          to="/"
          className="py-2 px-4 text-sm bg-[#3d3d3d] text-white! rounded hover:bg-[#4d4d4d] transition-colors"
        >
          ← Back to home
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold m-0">My Created Events</h2>          <Link
            to="/events/create"
            className="py-2 px-4 text-sm bg-[#646cff] text-white! rounded hover:bg-[#535bf2] transition-colors"
          >
            + Create new event
          </Link>
        </div>

        {error && (
          <div className="bg-red-900/40 border border-red-500 text-red-300 rounded-lg px-4 py-3 text-sm mb-6">
            {error}
          </div>
        )}

        {events.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#888] mb-4 text-lg">
              You haven't created any events yet.
            </p>
            <Link
              to="/events/create"
              className="text-[#646cff] hover:text-[#535bf2] transition-colors"
            >
              Create your first event →
            </Link>
          </div>
        ) : (
          <ul className="list-none p-0 flex flex-col gap-4">
            {events.map((event) => (
              <li key={event.id}>
                <Link
                  to={`/events/${event.id}`}
                  className="no-underline text-inherit block border border-[#444] rounded-xl p-5 hover:border-[#646cff] transition-colors"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold m-0 mb-1 text-white">
                        {event.name}
                      </h3>
                      {event.description && (
                        <p className="text-[#888] text-sm m-0 mb-3">
                          {event.description}
                        </p>
                      )}
                      <div className="flex gap-6 text-xs text-[#666]">
                        <span>
                          {new Date(event.start_date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                          {" → "}
                          {new Date(event.end_date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                        <span>{event.attendees} participant{event.attendees !== 1 ? "s" : ""}</span>
                      </div>
                    </div>
                    <span className="text-[#646cff] text-sm self-center shrink-0">
                      View →
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default MyCreatedEventsPage;
