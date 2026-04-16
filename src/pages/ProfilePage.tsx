import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <header className="bg-[#2d2d2d] px-8 py-4 shadow-md flex justify-between items-center">
        <h1 className="m-0 text-[#646cff] text-2xl">LOCKED</h1>
        <Link to="/" className="text-[#646cff] hover:text-[#535bf2] text-sm">
          ← Back to home
        </Link>
      </header>
      <h2 className="text-3xl font-bold mb-8">My Profile</h2>

      <div className="border border-[#444] rounded-xl p-6 text-sm">
        <div className="flex items-center gap-5 mb-6 pb-6 border-b border-[#444]">
          <div>
            <p className="text-xl font-semibold">{user?.username ?? "—"}</p>
            <p className="text-[#888] mt-1">{user?.email ?? "—"}</p>
          </div>
        </div>

        <div className="flex py-3 border-b border-[#333]">
          <span className="text-[#888] w-40">Username</span>
          <span>{user?.username ?? "—"}</span>
        </div>
        <div className="flex py-3 border-b border-[#333]">
          <span className="text-[#888] w-40">First name</span>
          <span>{user?.first_name ?? "—"}</span>
        </div>
        <div className="flex py-3 border-b border-[#333]">
          <span className="text-[#888] w-40">Last name</span>
          <span>{user?.last_name ?? "—"}</span>
        </div>
        <div className="flex py-3 border-b border-[#333]">
          <span className="text-[#888] w-40">Email</span>
          <span>{user?.email ?? "—"}</span>
        </div>
        <div className="flex py-3">
          <span className="text-[#888] w-40">Role</span>
          <span className="capitalize">{user?.role ?? "—"}</span>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
