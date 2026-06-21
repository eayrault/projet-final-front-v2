import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import NavCard from "../components/NavCard";

function HomePage() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#1D1B26]">
      <header className="bg-[#272535] px-8 py-4 shadow-md flex justify-between items-center">
        <h1 className="m-0 text-[#DDC01C] text-2xl">LOCKED</h1>
        <div className="flex gap-4 items-center">
          <Link
            to="/profile"
            className="w-9 h-9 flex items-center justify-center text-[#FFF8E7] font-bold text-base transition-colors select-none"
            title="My profile"
          >
            My profile
          </Link>
          <button
            onClick={handleLogout}
            className="py-2 px-4 text-sm bg-red-600 text-[#FFF8E7] border-none rounded cursor-pointer hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-12">
        <section className="text-center mb-12">
          <h2 className="text-4xl mb-4">Welcome !</h2>
        </section>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 mt-8">
          <NavCard
            to="/events"
            title="Events"
            description="Browse and join upcoming gaming events in your area"
          />
          <NavCard
            to="/events/create"
            title="Create an Event"
            description="Organize a new gaming event and manage its tournaments"
          />
          <NavCard
            to="/my-created-events"
            title="My Created Events"
            description="View and manage the events you have organized"
          />
          <NavCard
            to="/my-events"
            title="My Events"
            description="View and manage your event registrations"
          />
        </div>
      </main>
    </div>
  );
}

export default HomePage;
