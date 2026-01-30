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
    <div style={{ minHeight: "100vh", backgroundColor: "#1a1a1a" }}>
      {/* Header/Navbar */}
      <header
        style={{
          backgroundColor: "#2d2d2d",
          padding: "1rem 2rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ margin: 0, color: "#646cff", fontSize: "1.5rem" }}>
          LOCKED
        </h1>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <button
            onClick={handleLogout}
            style={{
              padding: "0.5rem 1rem",
              fontSize: "14px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "3rem 2rem",
        }}
      >
        {/* Welcome Section */}
        <section style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            Welcome !
          </h2>
        </section>

        {/* Navigation Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
            marginTop: "2rem",
          }}
        >
          {/* Events Card */}
          <Link
            to="/events"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                backgroundColor: "#2d2d2d",
                padding: "2rem",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
                border: "2px solid transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 20px rgba(100, 108, 255, 0.3)";
                e.currentTarget.style.borderColor = "#646cff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
                e.currentTarget.style.borderColor = "transparent";
              }}
            >
              <h3
                style={{
                  fontSize: "1.5rem",
                  marginBottom: "0.5rem",
                  color: "#646cff",
                  textAlign: "center",
                }}
              >
                Events
              </h3>
              <p
                style={{
                  color: "#888",
                  textAlign: "center",
                  lineHeight: "1.6",
                }}
              >
                Browse and join upcoming gaming events in your area
              </p>
              <div
                style={{
                  marginTop: "1.5rem",
                  padding: "0.75rem",
                  backgroundColor: "#1a1a1a",
                  borderRadius: "8px",
                  textAlign: "center",
                  fontSize: "0.9rem",
                  color: "#aaa",
                }}
              >
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
