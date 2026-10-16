import { useState } from "react";
import { buildBooksStack } from "../structures/Stack";

const stack = buildBooksStack();
const EMPTY_FORM = { name: "", isbn: "", author: "", editorial: "" };

export default function Libros() {
  const [books, setBooks] = useState(stack.toArray());
  const [form, setForm] = useState(EMPTY_FORM);

  const refresh = () => setBooks(stack.toArray());

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    stack.push({ ...form });
    refresh();
    setForm(EMPTY_FORM);
  };

  const handlePop = () => {
    stack.pop();
    refresh();
  };

  return (
    <main>
      <h1>Pila de libros</h1>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required />
        <input name="isbn" placeholder="ISBN" value={form.isbn} onChange={handleChange} required />
        <input name="author" placeholder="Autor" value={form.author} onChange={handleChange} required />
        <input name="editorial" placeholder="Editorial" value={form.editorial} onChange={handleChange} required />
        <button type="submit">Agregar a la pila (push)</button>
      </form>

      <p>
        Tamaño: <strong>{stack.size()}</strong> · Tope (peek):{" "}
        <strong>{stack.peek() ? stack.peek().name : "pila vacía"}</strong>
      </p>
      <button onClick={handlePop} disabled={stack.isEmpty()}>Quitar el de arriba (pop)</button>
      <button onClick={() => stack.print()}>print() en consola</button>

      <ul className="list">
        {books.map((book, i) => (
          <li key={book.isbn + i}>
            {i === 0 && <span className="badge">TOPE</span>}
            <strong>{book.name}</strong>
            <div>ISBN: {book.isbn}</div>
            <div>Autor: {book.author}</div>
            <div>Editorial: {book.editorial}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}