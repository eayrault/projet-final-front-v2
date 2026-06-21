import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEvents, type EventResponse } from "../services/api";

function EventPage() {
  const [events, setEvents] = useState<EventResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getEvents()
      .then(setEvents)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1D1B26] flex items-center justify-center">
        <p className="text-[#9B9080]">Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#1D1B26] flex items-center justify-center">
        <p className="text-red-400">Error: {error}</p>
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
        <h2 className="text-3xl font-bold m-0 mb-8">Events</h2>

        {events.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#9B9080] text-lg">No events available yet.</p>
          </div>
        ) : (
          <ul className="list-none p-0 flex flex-col gap-4">
            {events.map((event) => (
              <li key={event.id}>
                <Link
                  to={`/events/${event.id}`}
                  className="no-underline text-inherit block border border-[#444] rounded-xl p-5 hover:border-[#2B0071] transition-colors"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold m-0 mb-1 text-[#FFF8E7]">
                        {event.name}
                      </h3>
                      {event.description && (
                        <p className="text-[#9B9080] text-sm m-0 mb-3">
                          {event.description}
                        </p>
                      )}
                      <div className="flex gap-6 text-xs text-[#666]">
                        <span>
                          {new Date(event.start_date).toLocaleDateString(
                            "en-GB",
                            { day: "2-digit", month: "short", year: "numeric" },
                          )}
                          {" → "}
                          {new Date(event.end_date).toLocaleDateString(
                            "en-GB",
                            { day: "2-digit", month: "short", year: "numeric" },
                          )}
                        </span>
                        <span>
                          {event.attendees} participant
                          {event.attendees !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                    <span className="text-[#DDC01C] text-sm self-center shrink-0">
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

export default EventPage;
