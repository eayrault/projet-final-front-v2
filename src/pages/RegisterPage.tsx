import { Link } from "react-router-dom";
import Register from "../components/Register";

function RegisterPage() {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <Register />
      <p style={{ marginTop: "20px" }}>
        Already have an account?{" "}
        <Link
          to="/login"
          style={{
            color: "#007bff",
            textDecoration: "underline",
          }}
        >
          Login
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;
