import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getEvent,
  checkRegistration,
  registerToEvent,
  unregisterFromEvent,
  type EventResponse,
} from "../services/api";

function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventResponse | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    Promise.all([getEvent(id), checkRegistration(id)])
      .then(([eventData, registered]) => {
        setEvent(eventData);
        setIsRegistered(registered);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleRegister = async () => {
    if (!id) return;
    setActionLoading(true);
    setMessage(null);
    setError(null);

    try {
      await registerToEvent(id);
      setIsRegistered(true);
      setEvent((prev) => prev ? { ...prev, attendees: prev.attendees + 1 } : prev);
      setMessage("Successfully registered for this event!");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setActionLoading(false);
    }
  };

  const handleUnregister = async () => {
    if (!id) return;
    setActionLoading(true);
    setMessage(null);
    setError(null);

    try {
      await unregisterFromEvent(id);
      setIsRegistered(false);
      setEvent((prev) => prev ? { ...prev, attendees: Math.max(0, prev.attendees - 1) } : prev);
      setMessage("Successfully unregistered from this event.");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unregistration failed");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <p className="p-8 text-center">Loading event...</p>;
  if (error && !event) return <p className="p-8 text-center text-red-400">Error: {error}</p>;
  if (!event) return <p className="p-8 text-center">Event not found.</p>;

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <Link to="/events" className="text-[#646cff] hover:text-[#535bf2] text-sm">
        ← Back to events
      </Link>

      <div className="mt-6 border border-[#444] rounded-xl p-6">
        <h1 className="text-3xl font-bold mt-0 mb-4">{event.name}</h1>

        {event.description && (
          <p className="text-[#aaa] mb-4">{event.description}</p>
        )}

        <div className="w-full mb-6 text-sm">
          <div className="flex py-2 border-b border-[#333]">
            <span className="text-[#888] w-36">Start date</span>
            <span>{new Date(event.start_date).toLocaleString()}</span>
          </div>
          <div className="flex py-2 border-b border-[#333]">
            <span className="text-[#888] w-36">End date</span>
            <span>{new Date(event.end_date).toLocaleString()}</span>
          </div>
          <div className="flex py-2">
            <span className="text-[#888] w-36">Participants</span>
            <span>{event.attendees}</span>
          </div>
        </div>

        {message && <p className="text-green-400 mb-3">{message}</p>}
        {error && <p className="text-red-400 mb-3">{error}</p>}

        {isRegistered ? (
          <div>
            <p className="text-green-400 mb-3">✓ You are registered for this event</p>
            <button
              onClick={handleUnregister}
              disabled={actionLoading}
              className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {actionLoading ? "Processing..." : "Unregister"}
            </button>
          </div>
        ) : (
          <button
            onClick={handleRegister}
            disabled={actionLoading}
            className="px-5 py-2 bg-[#646cff] text-white rounded-lg hover:bg-[#535bf2] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {actionLoading ? "Processing..." : "Register for this event"}
          </button>
        )}
      </div>
    </div>
  );
}

export default EventDetailPage;
