import "../styles/dark.css";
import { useState } from "react";

const BASE_URL = "http://localhost:5000";

export default function Playground() {
  const [method, setMethod] = useState("GET");
  const [endpoint, setEndpoint] = useState("/api/users");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState("");

  const sendRequest = async () => {
    try {
      const options = {
        method,
        headers: {
          "Content-Type": "application/json"
        }
      };

      if (method !== "GET" && method !== "DELETE" && body) {
        options.body = body;
      }

      const res = await fetch(`${BASE_URL}${endpoint}`, options);
      const text = await res.text();

      setStatus(`${res.status} ${res.statusText}`);
      setResponse(text || "(no response body)");
    } catch (err) {
      setStatus("ERROR");
      setResponse(err.message);
    }
  };

  return (
    <div className="dark">
      <div className="page">
        <h2>API Playground</h2>
        <p style={{ color: "#94a3b8" }}>
          Send real HTTP requests to the backend.
        </p>

        {/* Request Panel */}
        <div className="panel">
          <h4>Request</h4>

          <label>HTTP Method</label>
          <select value={method} onChange={e => setMethod(e.target.value)}>
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>PATCH</option>
            <option>DELETE</option>
          </select>

          <label>Endpoint</label>
          <input
            value={endpoint}
            onChange={e => setEndpoint(e.target.value)}
            placeholder="/api/users"
          />

          <label>Request Body (JSON)</label>
          <textarea
            rows="6"
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder='{"name":"Abhi","email":"abhi@test.com","role":"DevOps"}'
          />

          <button onClick={sendRequest}>Send Request</button>
        </div>

        {/* Response Panel */}
        <div className="panel">
          <h4>Response</h4>
          <pre>
Status: {status}

{response}
          </pre>
        </div>
      </div>
    </div>
  );
}
