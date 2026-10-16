export class Nodo {
  constructor(valor) {
    this.valor = valor;
    this.izquierda = null;
    this.derecha = null;
  }
}

export class ArbolBinario {
  constructor() {
    this.raiz = null;
  }

  insertar(valor) {
    const nuevoNodo = new Nodo(valor);

    if (!this.raiz) {
      this.raiz = nuevoNodo;
      return;
    }

    let actual = this.raiz;
    while (true) {
      if (valor < actual.valor) {
        if (!actual.izquierda) {
          actual.izquierda = nuevoNodo;
          return;
        }
        actual = actual.izquierda;
      } else {
        if (!actual.derecha) {
          actual.derecha = nuevoNodo;
          return;
        }
        actual = actual.derecha;
      }
    }
  }

  contiene(valor, actual = this.raiz) {
    if (!actual) return false;
    if (valor === actual.valor) return true;
    if (valor < actual.valor) return this.contiene(valor, actual.izquierda);
    return this.contiene(valor, actual.derecha);
  }

  toD3Format(nodo = this.raiz) {
    if (!nodo) return null;
    const hijos = [];
    const izq = this.toD3Format(nodo.izquierda);
    const der = this.toD3Format(nodo.derecha);
    if (izq) hijos.push(izq);
    if (der) hijos.push(der);
    return { name: String(nodo.valor), children: hijos };
  }
}

export function buildArbol() {
  const arbol = new ArbolBinario();
  [25, 15, 50, 10, 22, 35, 70, 4, 12, 18, 24, 31, 44, 66, 90].forEach((n) =>
    arbol.insertar(n)
  );
  return arbol;
}
