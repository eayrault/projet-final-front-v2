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

  if (loading) return <p className="p-8 text-center">Loading events...</p>;
  if (error)
    return <p className="p-8 text-center text-red-400">Error: {error}</p>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold m-0">Events</h1>
        <Link to="/" className="text-[#646cff] hover:text-[#535bf2] text-sm">
          ← Back to home
        </Link>
      </div>

      {events.length === 0 ? (
        <p className="text-[#888]">No events available.</p>
      ) : (
        <ul className="list-none p-0 flex flex-col gap-4">
          {events.map((event) => (
            <li
              key={event.id}
              className="border border-[#444] rounded-xl p-4 hover:border-[#646cff] transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold m-0 mb-1">
                    {event.name}
                  </h2>
                  {event.description && (
                    <p className="text-[#aaa] text-sm m-0 mb-1">
                      {event.description}
                    </p>
                  )}
                  <p className="text-[#888] text-xs m-0">
                    {new Date(event.start_date).toLocaleDateString()} →{" "}
                    {new Date(event.end_date).toLocaleDateString()} ·{" "}
                    {event.attendees} participant(s)
                  </p>
                </div>
                <Link
                  to={`/events/${event.id}`}
                  className="text-[#646cff] hover:text-[#535bf2] text-sm whitespace-nowrap ml-4"
                >
                  View details →
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EventPage;
