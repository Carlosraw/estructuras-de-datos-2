import { useEffect, useMemo, useState } from "react";
import { Graph as D3Graph } from "react-d3-graph";
import Graph from "../structures/Graph";
import { agregar, agregarVarios, listar } from "../registros";

const config = {
  width: 700,
  height: 450,
  directed: false,
  staticGraphWithDragAndDrop: true,
  nodeHighlightBehavior: true,
  node: { size: 500, fontSize: 14, highlightFontSize: 14, labelProperty: "name" },
  link: { highlightColor: "#f59e0b" },
};

const ejemplo = [
  { tipo: "ciudad", nombre: "Cali" },
  { tipo: "ciudad", nombre: "Medellín" },
  { tipo: "ciudad", nombre: "Bogotá" },
  { tipo: "persona", nombre: "Ana", edad: 25, ciudad: "Cali" },
  { tipo: "persona", nombre: "María", edad: 28, ciudad: "Cali" },
  { tipo: "persona", nombre: "Luis", edad: 30, ciudad: "Medellín" },
  { tipo: "persona", nombre: "Sofía", edad: 27, ciudad: "Medellín" },
  { tipo: "persona", nombre: "Carlos", edad: 22, ciudad: "Bogotá" },
  { tipo: "amistad", a: "Ana", b: "María" },
  { tipo: "amistad", a: "Ana", b: "Luis" },
  { tipo: "amistad", a: "Luis", b: "Sofía" },
  { tipo: "amistad", a: "Carlos", b: "Sofía" },
];

function construir(filas) {
  const grafo = new Graph();
  filas.forEach(({ datos }) => {
    if (datos.tipo === "ciudad") grafo.addCity(datos.nombre);
    if (datos.tipo === "persona") grafo.addPerson(datos.nombre, datos.edad, datos.ciudad);
    if (datos.tipo === "amistad") grafo.addFriendship(datos.a, datos.b);
  });
  return grafo;
}

export default function Grafo() {
  const [filas, setFilas] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [cityName, setCityName] = useState("");
  const [person, setPerson] = useState({ name: "", age: "", city: "" });
  const [friends, setFriends] = useState({ first: "", second: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    listar("grafo")
      .then(setFilas)
      .catch((err) => setMessage(err.message));
  }, []);

  const grafo = useMemo(() => construir(filas), [filas]);
  const data = useMemo(() => grafo.toD3Data(), [grafo]);
  const cities = grafo.getNodesByType("city");
  const people = grafo.getNodesByType("person");
  const currentCity = selectedCity || cities[0]?.name || "";
  const inhabitants = grafo.getPeopleByCity(currentCity);

  async function guardar(valido, datos, errorText) {
    if (!valido) {
      setMessage(errorText);
      return false;
    }
    try {
      const fila = await agregar("grafo", datos);
      setFilas([...filas, fila]);
      setMessage("");
      return true;
    } catch (err) {
      setMessage(err.message);
      return false;
    }
  }

  async function handleAddCity(e) {
    e.preventDefault();
    const nombre = cityName.trim();
    const ok = await guardar(construir(filas).addCity(nombre), { tipo: "ciudad", nombre }, "Esa ciudad ya existe");
    if (ok) setCityName("");
  }

  async function handleAddPerson(e) {
    e.preventDefault();
    const nombre = person.name.trim();
    const ok = await guardar(
      construir(filas).addPerson(nombre, person.age, person.city),
      { tipo: "persona", nombre, edad: Number(person.age), ciudad: person.city },
      "Esa persona ya existe"
    );
    if (ok) setPerson({ name: "", age: "", city: "" });
  }

  async function handleAddFriendship(e) {
    e.preventDefault();
    const ok = await guardar(
      construir(filas).addFriendship(friends.first, friends.second),
      { tipo: "amistad", a: friends.first, b: friends.second },
      "Elige dos personas distintas que aún no sean amigas"
    );
    if (ok) setFriends({ first: "", second: "" });
  }

  async function cargarEjemplo() {
    try {
      const nuevas = await agregarVarios("grafo", ejemplo);
      setFilas([...filas, ...nuevas]);
      setMessage("");
    } catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <main>
      <h1>Grafo de amigos y ciudades</h1>

      {filas.length === 0 && (
        <p>
          <button type="button" onClick={cargarEjemplo}>Cargar datos de ejemplo</button>
        </p>
      )}

      <form onSubmit={handleAddCity}>
        <input placeholder="Nombre de la ciudad" value={cityName} onChange={(e) => setCityName(e.target.value)} required />
        <button type="submit">Agregar ciudad</button>
      </form>

      <form onSubmit={handleAddPerson}>
        <input placeholder="Nombre" value={person.name} onChange={(e) => setPerson({ ...person, name: e.target.value })} required />
        <input type="number" min="0" placeholder="Edad" value={person.age} onChange={(e) => setPerson({ ...person, age: e.target.value })} required />
        <select value={person.city} onChange={(e) => setPerson({ ...person, city: e.target.value })} required>
          <option value="">Ciudad</option>
          {cities.map((c) => (
            <option key={c.id} value={c.name}>{c.name}</option>
          ))}
        </select>
        <button type="submit">Agregar persona</button>
      </form>

      <form onSubmit={handleAddFriendship}>
        <select value={friends.first} onChange={(e) => setFriends({ ...friends, first: e.target.value })} required>
          <option value="">Persona 1</option>
          {people.map((p) => (
            <option key={p.id} value={p.name}>{p.name}</option>
          ))}
        </select>
        <select value={friends.second} onChange={(e) => setFriends({ ...friends, second: e.target.value })} required>
          <option value="">Persona 2</option>
          {people.map((p) => (
            <option key={p.id} value={p.name}>{p.name}</option>
          ))}
        </select>
        <button type="submit">Hacerlos amigos</button>
      </form>

      {message && <p className="msg">{message}</p>}

      {data.nodes.length > 0 ? (
        <div className="graph">
          <D3Graph key={`${data.nodes.length}-${data.links.length}`} id="grafo-amigos-ciudades" data={data} config={config} />
        </div>
      ) : (
        <p>Agrega una ciudad para empezar.</p>
      )}
      <p className="legend">Círculo azul: persona · Cuadrado naranja: ciudad</p>

      <h2>Personas que viven en</h2>
      <select value={currentCity} onChange={(e) => setSelectedCity(e.target.value)}>
        {cities.map((c) => (
          <option key={c.id} value={c.name}>{c.name}</option>
        ))}
      </select>
      <ul className="list">
        {inhabitants.map((p) => (
          <li key={p.id}>
            <strong>{p.name}</strong> · {p.age} años
          </li>
        ))}
        {inhabitants.length === 0 && currentCity && <li>Nadie vive en {currentCity}</li>}
      </ul>
    </main>
  );
}
