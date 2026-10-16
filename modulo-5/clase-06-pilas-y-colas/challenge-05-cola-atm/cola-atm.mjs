import { buildAtmQueue, createPerson } from "./react-app/src/structures/Queue.js";

const show = (p) => `${p.name} - $${p.withdrawal} - llegó ${p.arrivalDate.toLocaleTimeString("es-CO")}`;

const queue = buildAtmQueue();

console.log("Tamaño:", queue.size());
console.log("Siguiente (peek):", show(queue.peek()));
console.log("--- print ---");
queue.print();

queue.enqueue(createPerson("Valentina", 80000));
queue.sortByArrival();
console.log("--- tras enqueue de 'Valentina' (ordenada por llegada) ---");
queue.toArray().forEach((p, i) => console.log(`${i + 1}. ${show(p)}`));

console.log("--- atendiendo (dequeue) ---");
while (!queue.isEmpty()) {
  console.log("Atendido:", show(queue.dequeue()));
}