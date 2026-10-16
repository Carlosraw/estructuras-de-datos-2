import { useState } from "react";
import { Graph as D3Graph } from "react-d3-graph";
import { buildFriendsGraph } from "../structures/Graph";

const graph = buildFriendsGraph();

const config = {
  width: 700,
  height: 450,
  directed: false, staticGraphWithDragAndDrop: true,
  nodeHighlightBehavior: true,
  node: { size: 500, fontSize: 14, highlightFontSize: 14, labelProperty: "name" },
  link: { highlightColor: "#f59e0b" },
};

export default function Grafo() {
  const [data, setData] = useState(() => graph.toD3Data());
  const [selectedCity, setSelectedCity] = useState(() => graph.getNodesByType("city")[0].name);
  const [cityName, setCityName] = useState("");
  const [person, setPerson] = useState({ name: "", age: "", city: "" });
  const [friends, setFriends] = useState({ first: "", second: "" });
  const [message, setMessage] = useState("");

  const cities = graph.getNodesByType("city");
  const people = graph.getNodesByType("person");
  const inhabitants = graph.getPeopleByCity(selectedCity);

  const update = (ok, errorText) => {
    setMessage(ok ? "" : errorText);
    if (ok) setData(graph.toD3Data());
    return ok;
  };

  const handleAddCity = (e) => {
    e.preventDefault();
    if (update(graph.addCity(cityName.trim()), "Esa ciudad ya existe")) setCityName("");
  };

  const handleAddPerson = (e) => {
    e.preventDefault();
    if (update(graph.addPerson(person.name.trim(), person.age, person.city), "Esa persona ya existe")) {
      setPerson({ name: "", age: "", city: "" });
    }
  };

  const handleAddFriendship = (e) => {
    e.preventDefault();
    if (update(graph.addFriendship(friends.first, friends.second), "Elige dos personas distintas que aún no sean amigas")) {
      setFriends({ first: "", second: "" });
    }
  };

  return (
    <main>
      <h1>Grafo de amigos y ciudades</h1>

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

      <div className="graph">
        <D3Graph id="grafo-amigos-ciudades" data={data} config={config} />
      </div>
      <p className="legend">Círculo azul: persona · Cuadrado naranja: ciudad</p>

      <h2>Personas que viven en</h2>
      <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
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
        {inhabitants.length === 0 && <li>Nadie vive en {selectedCity}</li>}
      </ul>
    </main>
  );
}