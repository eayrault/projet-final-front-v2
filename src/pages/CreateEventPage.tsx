import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createEvent } from "../services/api";

function CreateEventPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const newEvent = await createEvent({
        name: form.name,
        description: form.description || undefined,
        start_date: new Date(form.start_date).toISOString(),
        end_date: new Date(form.end_date).toISOString(),
      });

      setSuccess(true);

      setTimeout(() => {
        navigate(`/events/${newEvent.id}`);
      }, 1800);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

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

      <main className="max-w-xl mx-auto px-8 py-12">
        <h2 className="text-3xl mb-2 text-center">Create an Event</h2>
        <p className="text-[#888] text-center mb-10">
          Fill in the details below to create a new event.
        </p>

        {success ? (
          <div className="bg-green-900/40 border border-green-500 rounded-xl p-8 text-center">
            <div className="text-5xl mb-4">✓</div>
            <p className="text-green-400 text-lg font-semibold mb-1">
              Event created successfully!
            </p>
            <p className="text-[#888] text-sm">
              Redirecting to the event page...
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-[#2d2d2d] rounded-xl p-8 flex flex-col gap-6 shadow-lg"
          >
            {error && (
              <div className="bg-red-900/40 border border-red-500 text-red-300 rounded-lg px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-sm text-[#aaa] font-medium" htmlFor="name">
                Event name <span className="text-red-400">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Evo France 2027"
                className="bg-[#1a1a1a] border border-[#444] rounded-lg px-4 py-3 text-white placeholder-[#555] focus:outline-none focus:border-[#646cff] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="text-sm text-[#aaa] font-medium"
                htmlFor="description"
              >
                Description{" "}
                <span className="text-[#666] text-xs">(optional)</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the event..."
                className="bg-[#1a1a1a] border border-[#444] rounded-lg px-4 py-3 text-white placeholder-[#555] focus:outline-none focus:border-[#646cff] transition-colors resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label
                  className="text-sm text-[#aaa] font-medium"
                  htmlFor="start_date"
                >
                  Start date <span className="text-red-400">*</span>
                </label>
                <input
                  id="start_date"
                  name="start_date"
                  type="datetime-local"
                  required
                  value={form.start_date}
                  onChange={handleChange}
                  className="bg-[#1a1a1a] border border-[#444] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#646cff] transition-colors scheme-dark"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  className="text-sm text-[#aaa] font-medium"
                  htmlFor="end_date"
                >
                  End date <span className="text-red-400">*</span>
                </label>
                <input
                  id="end_date"
                  name="end_date"
                  type="datetime-local"
                  required
                  value={form.end_date}
                  onChange={handleChange}
                  className="bg-[#1a1a1a] border border-[#444] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#646cff] transition-colors scheme-dark"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 py-3 px-6 bg-[#646cff] text-white font-semibold rounded-lg hover:bg-[#535bf2] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Create Event"}
            </button>
          </form>
        )}
      </main>
    </div>
  );
}

export default CreateEventPage;
