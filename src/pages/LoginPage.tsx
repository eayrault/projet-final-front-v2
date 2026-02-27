import { Link } from "react-router-dom";
import Login from "../components/Login";

function LoginPage() {
  return (
    <div className="text-center p-5">
      <Login />
      <p className="mt-5">
        Don't have an account?{" "}
        <Link to="/register" className="text-[#007bff] underline">
          Register
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
