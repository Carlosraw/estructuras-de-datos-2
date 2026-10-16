import { useEffect, useMemo, useState } from "react";
import Trie from "../structures/Trie";
import { agregar, eliminar, listar } from "../registros";

export default function Buscador() {
  const [filas, setFilas] = useState([]);
  const [nombre, setNombre] = useState("");
  const [popularidad, setPopularidad] = useState("");
  const [prefijo, setPrefijo] = useState("");
  const [k, setK] = useState(3);
  const [error, setError] = useState("");

  useEffect(() => {
    listar("producto")
      .then(setFilas)
      .catch((err) => setError(err.message));
  }, []);

  const trie = useMemo(() => {
    const arbol = new Trie();
    filas.forEach((fila) => arbol.insert(fila.datos.nombre, fila.datos.popularidad));
    return arbol;
  }, [filas]);

  const resultados = prefijo ? trie.searchTopK(prefijo, Number(k)) : [];

  async function guardar(e) {
    e.preventDefault();
    setError("");
    try {
      const fila = await agregar("producto", {
        nombre,
        popularidad: Number(popularidad),
      });
      setFilas([...filas, fila]);
      setNombre("");
      setPopularidad("");
    } catch (err) {
      setError(err.message);
    }
  }

  async function quitar(id) {
    setError("");
    try {
      await eliminar(id);
      setFilas(filas.filter((fila) => fila.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main>
      <h1>Buscador de productos</h1>
      <form onSubmit={guardar}>
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del producto"
          required
        />
        <input
          type="number"
          min="0"
          value={popularidad}
          onChange={(e) => setPopularidad(e.target.value)}
          placeholder="Popularidad (0 a 100)"
          required
        />
        <div>
          <button type="submit">Guardar producto</button>
        </div>
      </form>
      {error && <p className="msg">{error}</p>}

      <h2>Buscar por prefijo</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          value={prefijo}
          onChange={(e) => setPrefijo(e.target.value)}
          placeholder="Escribe un prefijo, por ejemplo: air"
        />
        <select value={k} onChange={(e) => setK(e.target.value)}>
          <option value={1}>Top 1</option>
          <option value={2}>Top 2</option>
          <option value={3}>Top 3</option>
          <option value={5}>Top 5</option>
        </select>
      </form>
      <ul className="list">
        {resultados.map((p) => (
          <li key={p.name}>
            <span className="badge">{p.popularity}</span>
            {p.name}
          </li>
        ))}
      </ul>
      {prefijo && resultados.length === 0 && <p>Sin resultados.</p>}

      <h2>Productos guardados ({filas.length})</h2>
      <ul className="list">
        {filas.map((fila) => (
          <li key={fila.id}>
            <span className="badge">{fila.datos.popularidad}</span>
            {fila.datos.nombre}{" "}
            <button type="button" onClick={() => quitar(fila.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
