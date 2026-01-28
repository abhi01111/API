import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Playground from "./pages/Playground";
import Users from "./pages/Users";
import Docs from "./pages/Docs";
import About from "./pages/About";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/users" element={<Users />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Layout>
  );
}
