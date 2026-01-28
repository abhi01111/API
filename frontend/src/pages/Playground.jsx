import "../styles/dark.css";
import { useState } from "react";

export default function Playground() {
  const [method, setMethod] = useState("GET");

  return (
    <div className="dark">
      <div className="page">
        <h2>API Playground</h2>
        <p style={{ color: "#94a3b8" }}>
          Manually test HTTP methods like a developer tool.
        </p>

        {/* Request */}
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
          <input placeholder="/api/users" />

          <label>Request Body (JSON)</label>
          <textarea rows="6" placeholder='{"key":"value"}' />

          <button>Send Request</button>
        </div>

        {/* Response */}
        <div className="panel">
          <h4>Response</h4>
          <pre>
Status: 200 OK

{`{
  "message": "Response will appear here"
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
