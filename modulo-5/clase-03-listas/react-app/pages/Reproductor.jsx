import { useState } from "react";
import { buildPlaylist } from "../structures/LinkedList";

const playlist = buildPlaylist();

export default function Reproductor() {
  const [current, setCurrent] = useState(playlist.head);

  const siguiente = () => {
    if (current.next) setCurrent(current.next);
  };

  return (
    <div>
      <h2>Reproductor</h2>
      <p>{current.value.title} - {current.value.artist}</p>

      <button onClick={siguiente} disabled={!current.next}>
        Siguiente
      </button>
    </div>
  );
}
