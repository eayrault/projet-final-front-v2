import { Link } from "react-router-dom";
import Register from "../components/Register";

function RegisterPage() {
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

      <main className="max-w-md mx-auto px-8 py-12">
        <h2 className="text-3xl font-bold m-0 mb-2 text-center">
          Create an account
        </h2>
        <p className="text-[#888] text-center mb-8">
          Join the LOCKED community
        </p>

        <div className="bg-[#2d2d2d] rounded-xl p-8 shadow-lg">
          <Register />
        </div>

        <p className="text-center mt-6 text-[#888] text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-[#646cff] hover:text-[#535bf2]">
            Login
          </Link>
        </p>
      </main>
    </div>
  );
}

export default RegisterPage;
