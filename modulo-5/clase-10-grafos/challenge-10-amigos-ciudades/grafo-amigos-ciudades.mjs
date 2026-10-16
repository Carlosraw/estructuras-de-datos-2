import { buildFriendsGraph } from "./react-app/src/structures/Graph.js";

const graph = buildFriendsGraph();

console.log("--- grafo completo (lista de adyacencia) ---");
graph.printGraph();

console.log("--- adyacencia de Ana ---");
graph.printAdjacency("persona:Ana");

for (const city of ["Cali", "Medellín", "Bogotá"]) {
  console.log(`--- personas que viven en ${city} ---`);
  graph.getPeopleByCity(city).forEach((p) => console.log(`${p.name} (${p.age} años)`));
}

graph.addPerson("Valentina", 24, "Cali");
graph.addFriendship("Valentina", "Ana");

console.log("--- personas que viven en Cali tras agregar a Valentina ---");
graph.getPeopleByCity("Cali").forEach((p) => console.log(`${p.name} (${p.age} años)`));

console.log("--- adyacencia de Valentina ---");
graph.printAdjacency("persona:Valentina");