import "../styles/light.css";

export default function Docs() {
  return (
    <div className="page">
      <h2>HTTP Methods Documentation</h2>

      <div className="card">
        <p><b>GET</b> – Fetch resource</p>
        <p><b>POST</b> – Create resource</p>
        <p><b>PUT</b> – Replace resource</p>
        <p><b>PATCH</b> – Partial update</p>
        <p><b>DELETE</b> – Remove resource</p>
      </div>
    </div>
  );
}
