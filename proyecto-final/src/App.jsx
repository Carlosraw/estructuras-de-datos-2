import { NavLink, Route, Routes } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Pila from "./pages/Pila";
import Cola from "./pages/Cola";
import Buscador from "./pages/Buscador";

export default function App() {
  return (
    <>
      <header className="topbar">
        <strong>Estructuras de Datos II</strong>
        <nav>
          <NavLink to="/" end>Inicio</NavLink>
          <NavLink to="/pila">Pila</NavLink>
          <NavLink to="/cola">Cola</NavLink>
          <NavLink to="/buscador">Trie y Heap</NavLink>
          <NavLink to="/grafo">Grafo</NavLink>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/pila" element={<Pila />} />
        <Route path="/cola" element={<Cola />} />
        <Route path="/buscador" element={<Buscador />} />
        <Route path="*" element={<main><h1>Página no encontrada</h1></main>} />
      </Routes>
    </>
  );
}
