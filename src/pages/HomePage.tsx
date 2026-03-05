import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

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
    <div className="min-h-screen bg-[#1a1a1a]">
      <header className="bg-[#2d2d2d] px-8 py-4 shadow-md flex justify-between items-center">
        <h1 className="m-0 text-[#646cff] text-2xl">LOCKED</h1>
        <div className="flex gap-4 items-center">
          <button
            onClick={handleLogout}
            className="py-2 px-4 text-sm bg-red-600 text-white border-none rounded cursor-pointer hover:bg-red-700 transition-colors"
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
          <Link to="/events" className="no-underline text-inherit">
            <div className="bg-[#2d2d2d] p-8 rounded-xl shadow-lg transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-[#646cff] hover:-translate-y-1">
              <h3 className="text-2xl mb-2 text-[#646cff] text-center">
                Events
              </h3>
              <p className="text-[#888] text-center leading-relaxed">
                Browse and join upcoming gaming events in your area
              </p>
              <div className="mt-6 p-3 bg-[#1a1a1a] rounded-lg text-center text-sm text-[#aaa]">
                GO
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
