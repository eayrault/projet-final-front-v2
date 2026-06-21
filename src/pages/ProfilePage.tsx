import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProfilePage() {
  const { user } = useAuth();
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

      <main className="max-w-2xl mx-auto px-8 py-12">
        <h2 className="text-3xl font-bold m-0 mb-8">My Profile</h2>

        <div className="border border-[#444] rounded-xl p-6 text-sm">
          <div className="flex items-center gap-5 mb-6 pb-6 border-b border-[#444]">
            <div>
              <p className="text-xl font-semibold text-[#FFF8E7] m-0">
                {user?.username ?? "—"}
              </p>
              <p className="text-[#9B9080] mt-1 m-0">{user?.email ?? "—"}</p>
            </div>
          </div>

          <div className="flex py-3 border-b border-[#333]">
            <span className="text-[#9B9080] w-40">Username</span>
            <span className="text-[#FFF8E7]">{user?.username ?? "—"}</span>
          </div>
          <div className="flex py-3 border-b border-[#333]">
            <span className="text-[#9B9080] w-40">First name</span>
            <span className="text-[#FFF8E7]">{user?.first_name ?? "—"}</span>
          </div>
          <div className="flex py-3 border-b border-[#333]">
            <span className="text-[#9B9080] w-40">Last name</span>
            <span className="text-[#FFF8E7]">{user?.last_name ?? "—"}</span>
          </div>
          <div className="flex py-3 border-b border-[#333]">
            <span className="text-[#9B9080] w-40">Email</span>
            <span className="text-[#FFF8E7]">{user?.email ?? "—"}</span>
          </div>
          <div className="flex py-3">
            <span className="text-[#9B9080] w-40">Role</span>
            <span className="text-[#FFF8E7] capitalize">
              {user?.role ?? "—"}
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
