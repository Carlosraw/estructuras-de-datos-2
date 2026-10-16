import { useEffect, useState } from "react";
import Stack from "../structures/Stack";
import { agregar, eliminar, listar } from "../registros";

function construir(filas) {
  const pila = new Stack();
  filas.forEach((fila) => pila.push(fila));
  return pila;
}

export default function Pila() {
  const [filas, setFilas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    listar("pila")
      .then((datos) => setFilas(construir(datos).toArray()))
      .catch((err) => setError(err.message));
  }, []);

  async function apilar(e) {
    e.preventDefault();
    setError("");
    try {
      const fila = await agregar("pila", { titulo });
      const pila = construir(filas);
      pila.push(fila);
      setFilas(pila.toArray());
      setTitulo("");
    } catch (err) {
      setError(err.message);
    }
  }

  async function desapilar() {
    setError("");
    try {
      const pila = construir(filas);
      const tope = pila.pop();
      await eliminar(tope.id);
      setFilas(pila.toArray());
    } catch (err) {
      setError(err.message);
    }
  }

  const visibles = [...filas].reverse();

  return (
    <main>
      <h1>Pila de libros</h1>
      <form onSubmit={apilar}>
        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título del libro"
          required
        />
        <div>
          <button type="submit">Apilar</button>
          <button type="button" onClick={desapilar} disabled={filas.length === 0}>
            Desapilar
          </button>
        </div>
      </form>
      {error && <p className="msg">{error}</p>}
      <p>Libros en la pila: {filas.length}</p>
      <ul className="list">
        {visibles.map((fila, i) => (
          <li key={fila.id}>
            {i === 0 && <span className="badge">TOPE</span>}
            {fila.datos.titulo}
          </li>
        ))}
      </ul>
    </main>
  );
}
