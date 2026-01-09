import { Link } from "react-router-dom";
import Login from "../components/Login";

function LoginPage() {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <Login />
      <p style={{ marginTop: "20px" }}>
        Don't have an account?{" "}
        <Link
          to="/register"
          style={{
            color: "#007bff",
            textDecoration: "underline",
          }}
        >
          Register
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
