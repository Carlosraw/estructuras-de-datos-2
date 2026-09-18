import { useState } from "react";
import { buildHistory } from "../structures/DoublyLinkedList";

const history = buildHistory();

export default function Historial() {
  const [current, setCurrent] = useState(history.head);

  const atras = () => {
    if (current.prev) setCurrent(current.prev);
  };

  const adelante = () => {
    if (current.next) setCurrent(current.next);
  };

  return (
    <div>
      <h2>Historial</h2>
      <p>{current.value.title} - {current.value.url}</p>

      <button onClick={atras} disabled={!current.prev}>
        Atrás
      </button>
      <button onClick={adelante} disabled={!current.next}>
        Adelante
      </button>
    </div>
  );
}
