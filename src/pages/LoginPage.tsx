import { Link } from "react-router-dom";
import Login from "../components/Login";

function LoginPage() {
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

      <main className="max-w-md mx-auto px-8 py-12">
        <h2 className="text-3xl font-bold m-0 mb-2 text-center">
          Welcome back
        </h2>
        <p className="text-[#9B9080] text-center mb-8">
          Sign in to your LOCKED account
        </p>

        <div className="bg-[#272535] rounded-xl p-8 shadow-lg">
          <Login />
        </div>

        <p className="text-center mt-6 text-[#9B9080] text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#DDC01C] hover:text-[#B89E18]">
            Register
          </Link>
        </p>
      </main>
    </div>
  );
}

export default LoginPage;
