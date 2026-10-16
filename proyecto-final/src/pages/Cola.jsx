import { useEffect, useState } from "react";
import Queue from "../structures/Queue";
import { agregar, eliminar, listar } from "../registros";

function construir(filas) {
  const cola = new Queue();
  filas.forEach((fila) => cola.enqueue(fila));
  return cola;
}

function pesos(valor) {
  return Number(valor).toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });
}

export default function Cola() {
  const [filas, setFilas] = useState([]);
  const [nombre, setNombre] = useState("");
  const [retiro, setRetiro] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    listar("cola")
      .then((datos) => setFilas(construir(datos).toArray()))
      .catch((err) => setError(err.message));
  }, []);

  async function encolar(e) {
    e.preventDefault();
    setError("");
    try {
      const fila = await agregar("cola", { nombre, retiro: Number(retiro) });
      const cola = construir(filas);
      cola.enqueue(fila);
      setFilas(cola.toArray());
      setNombre("");
      setRetiro("");
    } catch (err) {
      setError(err.message);
    }
  }

  async function atender() {
    setError("");
    try {
      const cola = construir(filas);
      const primero = cola.dequeue();
      await eliminar(primero.id);
      setFilas(cola.toArray());
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main>
      <h1>Cola del cajero</h1>
      <form onSubmit={encolar}>
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre de la persona"
          required
        />
        <input
          type="number"
          min="1"
          value={retiro}
          onChange={(e) => setRetiro(e.target.value)}
          placeholder="Valor a retirar"
          required
        />
        <div>
          <button type="submit">Encolar</button>
          <button type="button" onClick={atender} disabled={filas.length === 0}>
            Atender
          </button>
        </div>
      </form>
      {error && <p className="msg">{error}</p>}
      <p>Personas en la cola: {filas.length}</p>
      <ul className="list">
        {filas.map((fila, i) => (
          <li key={fila.id}>
            {i === 0 && <span className="badge">SIGUIENTE</span>}
            {fila.datos.nombre} — {pesos(fila.datos.retiro)}
          </li>
        ))}
      </ul>
    </main>
  );
}
