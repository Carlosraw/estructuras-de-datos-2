import { useState } from "react";
import { buildMenu } from "../structures/Nodo";

function MenuItem({ nodo, nivel }) {
  const [abierto, setAbierto] = useState(false);
  const tieneHijos = nodo.hijos.length > 0;

  return (
    <li>
      <div
        className="item"
        style={{ paddingLeft: `${1 + nivel}rem` }}
        onClick={() => tieneHijos && setAbierto(!abierto)}
      >
        {nodo.valor.titulo}
        {tieneHijos && <span className="flecha">{abierto ? "▲" : "▼"}</span>}
      </div>
      {tieneHijos && abierto && (
        <ul>
          {nodo.hijos.map((hijo, i) => (
            <MenuItem key={hijo.valor.link + i} nodo={hijo} nivel={nivel + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function Sidebar() {
  const [menu] = useState(buildMenu());

  return (
    <aside className="sidebar">
      <ul>
        {menu.hijos.map((nodo, i) => (
          <MenuItem key={nodo.valor.link + i} nodo={nodo} nivel={0} />
        ))}
      </ul>
    </aside>
  );
}
