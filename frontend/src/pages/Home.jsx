import "../styles/light.css";

export default function Home() {
  return (
    <div className="page">
      <h1>HTTP Methods Lab</h1>
      <p>Learn, test, and understand HTTP methods visually.</p>

      <div className="card">
        <h3>What you’ll learn</h3>
        <ul>
          <li>GET, POST, PUT, PATCH, DELETE</li>
          <li>Request / Response lifecycle</li>
          <li>Real API behavior</li>
        </ul>
      </div>
    </div>
  );
}
