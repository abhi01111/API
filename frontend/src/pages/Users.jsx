import { useEffect, useState } from "react";
import "../styles/light.css";

const BASE_URL = "http://localhost:5000";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${BASE_URL}/api/users`)
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const deleteUser = async (id) => {
    await fetch(`${BASE_URL}/api/users/${id}`, {
      method: "DELETE"
    });

    setUsers(users.filter(u => u._id !== id));
  };

  return (
    <div className="page">
      <h2>Users Explorer</h2>
      <p>Users fetched using HTTP GET</p>

      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {users.map(user => (
        <div key={user._id} className="card">
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Role:</b> {user.role}</p>

          <button
            style={{
              background: "#ef4444",
              color: "white",
              border: "none",
              padding: "8px 12px",
              cursor: "pointer"
            }}
            onClick={() => deleteUser(user._id)}
          >
            Delete (DELETE)
          </button>
        </div>
      ))}
    </div>
  );
}
