// Punto 3: Crear un proyecto en React con 2 páginas nuevas,
// una para la lista enlazada y otra para la doblemente enlazada.

import { useState } from "react";
import Reproductor from "./pages/Reproductor";
import Historial from "./pages/Historial";

export default function App() {
  const [page, setPage] = useState("reproductor");

  return (
    <div>
      <nav>
        <button onClick={() => setPage("reproductor")}>Reproductor</button>
        <button onClick={() => setPage("historial")}>Historial</button>
      </nav>

      {page === "reproductor" ? <Reproductor /> : <Historial />}
    </div>
  );
}
