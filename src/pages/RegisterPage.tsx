import { Link } from "react-router-dom";
import Register from "../components/Register";

function RegisterPage() {
  return (
    <div className="text-center p-5">
      <Register />
      <p className="mt-5">
        Already have an account?{" "}
        <Link to="/login" className="text-[#007bff] underline">
          Login
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;
