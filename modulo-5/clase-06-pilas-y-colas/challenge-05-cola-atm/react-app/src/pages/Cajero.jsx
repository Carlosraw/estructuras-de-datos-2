import { useState } from "react";
import { buildAtmQueue, createPerson } from "../structures/Queue";

const queue = buildAtmQueue();

const money = (n) =>
  n.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

export default function Cajero() {
  const [people, setPeople] = useState(queue.toArray());
  const [name, setName] = useState("");
  const [withdrawal, setWithdrawal] = useState("");

  const refresh = () => setPeople(queue.toArray());

  const handleSubmit = (e) => {
    e.preventDefault();
    queue.enqueue(createPerson(name, withdrawal));
    queue.sortByArrival();
    refresh();
    setName("");
    setWithdrawal("");
  };

  const handleDequeue = () => {
    queue.dequeue();
    refresh();
  };

  return (
    <main>
      <h1>Cola del cajero (ATM)</h1>

      <form onSubmit={handleSubmit}>
        <input placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="number" min="1" placeholder="Monto a retirar" value={withdrawal} onChange={(e) => setWithdrawal(e.target.value)} required />
        <button type="submit">Agregar a la cola (enqueue)</button>
      </form>

      <p>
        Personas en cola: <strong>{queue.size()}</strong> · Siguiente (peek):{" "}
        <strong>{queue.peek() ? queue.peek().name : "cola vacía"}</strong>
      </p>
      <button onClick={handleDequeue} disabled={queue.isEmpty()}>Atender siguiente (dequeue)</button>
      <button onClick={() => queue.print()}>print() en consola</button>

      <ul className="list">
        {people.map((p, i) => (
          <li key={p.id}>
            {i === 0 && <span className="badge">SIGUIENTE</span>}
            <strong>{i + 1}. {p.name}</strong>
            <div>Retiro: {money(p.withdrawal)}</div>
            <div>Llegada: {p.arrivalDate.toLocaleString("es-CO")}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}