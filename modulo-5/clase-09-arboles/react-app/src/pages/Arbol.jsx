import { useState, useRef, useEffect } from "react";
import Tree from "react-d3-tree";
import { buildArbol } from "../structures/BinaryTree";

const arbol = buildArbol();

export default function Arbol() {
  const [data] = useState(arbol.toD3Format());
  const [valor, setValor] = useState("");
  const [resultado, setResultado] = useState(null);
  const contenedorRef = useRef(null);
  const [translate, setTranslate] = useState({ x: 0, y: 60 });

  useEffect(() => {
    if (contenedorRef.current) {
      const { width } = contenedorRef.current.getBoundingClientRect();
      setTranslate({ x: width / 2, y: 60 });
    }
  }, []);

  const buscar = (e) => {
    e.preventDefault();
    const num = Number(valor);
    setResultado(arbol.contiene(num));
  };

  return (
    <main>
      <h1>Árbol binario</h1>

      <form onSubmit={buscar}>
        <input
          placeholder="Valor a buscar"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          required
        />
        <button type="submit">Buscar (contiene)</button>
      </form>

      {resultado !== null && (
        <p>
          ¿Está {valor} en el árbol? <strong>{resultado ? "Sí" : "No"}</strong>
        </p>
      )}

      <div ref={contenedorRef} style={{ width: "100%", height: "500px" }}>
        <Tree
          data={data}
          translate={translate}
          orientation="vertical"
          pathFunc="step"
        />
      </div>
    </main>
  );
}
