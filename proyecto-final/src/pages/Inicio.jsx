import { Link } from "react-router-dom";

const estructuras = [
  { ruta: "/pila", nombre: "Pila", texto: "Libros apilados: el último en entrar es el primero en salir." },
  { ruta: "/cola", nombre: "Cola", texto: "Personas en un cajero: el primero en llegar es el primero en ser atendido." },
  { ruta: "/buscador", nombre: "Trie y Heap", texto: "Buscador de productos por prefijo, con los más populares primero." },
  { ruta: "/grafo", nombre: "Grafo", texto: "Personas y ciudades conectadas por amistades y residencia." },
];

export default function Inicio() {
  return (
    <main>
      <h1>Plataforma de estructuras de datos</h1>
      <p>Cada estructura funciona con datos guardados en una base de datos.</p>
      <div className="cards">
        {estructuras.map((e) => (
          <Link key={e.ruta} to={e.ruta} className="card">
            <h3>{e.nombre}</h3>
            <p>{e.texto}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
