import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="navbar">
      <h3>HTTP Methods Lab</h3>

      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/playground">Playground</Link>
        <Link to="/users">Users</Link>
        <Link to="/docs">Docs</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
}
