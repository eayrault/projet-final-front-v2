import { useState } from "react";
import "./App.css";
import { useAuth } from "./contexts/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const { isAuthenticated, logout } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <div style={{ textAlign: "center", padding: "20px" }}>
          {showRegister ? (
            <>
              <Register />
              <p style={{ marginTop: "20px" }}>
                Already have an account?{" "}
                <button
                  onClick={() => setShowRegister(false)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#007bff",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Login here
                </button>
              </p>
            </>
          ) : (
            <>
              <Login />
              <p style={{ marginTop: "20px" }}>
                Don't have an account?{" "}
                <button
                  onClick={() => setShowRegister(true)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#007bff",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Register
                </button>
              </p>
            </>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>Welcome! You are logged in</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Logout
        </button>
      </div>
    </>
  );
}

export default App;
