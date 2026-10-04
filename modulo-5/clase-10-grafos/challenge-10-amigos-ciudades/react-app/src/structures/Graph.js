const cityId = (name) => `ciudad:${name}`;
const personId = (name) => `persona:${name}`;

export class Graph {
  constructor() {
    this.nodes = [];
    this.adjList = {};
  }

  addNode(node) {
    if (this.searchNode(node.id)) return false;
    this.nodes.push(node);
    this.adjList[node.id] = [];
    return true;
  }

  addEdge(id1, id2) {
    if (!this.searchNode(id1) || !this.searchNode(id2)) return false;
    if (this.adjList[id1].includes(id2)) return false;
    this.adjList[id1].push(id2);
    this.adjList[id2].push(id1);
    return true;
  }

  searchNode(id) {
    return this.nodes.find((n) => n.id === id);
  }

  printAdjacency(id) {
    if (this.searchNode(id)) {
      console.log(this.adjList[id]);
    }
  }

  printGraph() {
    console.log(this.adjList);
  }

  addCity(name) {
    if (!name) return false;
    return this.addNode({ id: cityId(name), type: "city", name });
  }

  addPerson(name, age, cityName) {
    if (!name || !this.searchNode(cityId(cityName))) return false;
    const added = this.addNode({ id: personId(name), type: "person", name, age: Number(age) });
    if (!added) return false;
    this.addEdge(personId(name), cityId(cityName));
    return true;
  }

  addFriendship(name1, name2) {
    if (name1 === name2) return false;
    return this.addEdge(personId(name1), personId(name2));
  }

  getNodesByType(type) {
    return this.nodes.filter((n) => n.type === type);
  }

  getPeopleByCity(cityName) {
    const id = cityId(cityName);
    if (!this.searchNode(id)) return [];
    return this.adjList[id]
      .map((nodeId) => this.searchNode(nodeId))
      .filter((n) => n.type === "person");
  }

  toD3Data(width = 700) {
    const cities = this.getNodesByType("city");
    const positions = {};
    cities.forEach((city, i) => {
      const cityX = ((i + 1) * width) / (cities.length + 1);
      positions[city.id] = { x: cityX, y: 80 };
      const residents = this.getPeopleByCity(city.name);
      residents.forEach((person, j) => {
        positions[person.id] = {
          x: cityX + (j - (residents.length - 1) / 2) * 90,
          y: 220 + (j % 2) * 120,
        };
      });
    });

    const links = [];
    this.nodes.forEach((node) => {
      this.adjList[node.id].forEach((targetId) => {
        if (node.id < targetId) links.push({ source: node.id, target: targetId });
      });
    });

    const nodes = this.nodes.map((node) => ({
      ...node,
      ...positions[node.id],
      color: node.type === "city" ? "#f59e0b" : "#2563eb",
      symbolType: node.type === "city" ? "square" : "circle",
    }));
    return { nodes, links };
  }
}

export function buildFriendsGraph() {
  const graph = new Graph();
  graph.addCity("Cali");
  graph.addCity("Medellín");
  graph.addCity("Bogotá");
  graph.addPerson("Ana", 25, "Cali");
  graph.addPerson("María", 28, "Cali");
  graph.addPerson("Luis", 30, "Medellín");
  graph.addPerson("Sofía", 27, "Medellín");
  graph.addPerson("Carlos", 22, "Bogotá");
  graph.addFriendship("Ana", "María");
  graph.addFriendship("Ana", "Luis");
  graph.addFriendship("Luis", "Sofía");
  graph.addFriendship("Carlos", "Sofía");
  return graph;
}