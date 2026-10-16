import { buildBooksStack } from "./react-app/src/structures/Stack.js";

const stack = buildBooksStack();

console.log("Tamaño:", stack.size());
console.log("Tope (peek):", stack.peek().name);
console.log("--- print (del último al primero) ---");
stack.print();

stack.push({ name: "Rayuela", isbn: "978-84-376-0494-7", author: "Julio Cortázar", editorial: "Alfaguara" });
console.log("--- tras push de 'Rayuela' ---");
console.log("Tope (peek):", stack.peek().name);

console.log("pop:", stack.pop().name);
console.log("pop:", stack.pop().name);
console.log("Tamaño:", stack.size(), "· ¿vacía?", stack.isEmpty());