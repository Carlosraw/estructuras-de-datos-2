class Nodo {
  constructor(valor) {
    this.valor = valor;
    this.izquierda = null;
    this.derecha = null;
  }
}

class ArbolBinario {
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

  preorden(nodo = this.raiz, resultado = []) {
    if (!nodo) return resultado;
    resultado.push(nodo.valor);
    this.preorden(nodo.izquierda, resultado);
    this.preorden(nodo.derecha, resultado);
    return resultado;
  }

  inorden(nodo = this.raiz, resultado = []) {
    if (!nodo) return resultado;
    this.inorden(nodo.izquierda, resultado);
    resultado.push(nodo.valor);
    this.inorden(nodo.derecha, resultado);
    return resultado;
  }

  postorden(nodo = this.raiz, resultado = []) {
    if (!nodo) return resultado;
    this.postorden(nodo.izquierda, resultado);
    this.postorden(nodo.derecha, resultado);
    resultado.push(nodo.valor);
    return resultado;
  }

  contiene(valor, actual = this.raiz) {
    if (!actual) return false;
    if (valor === actual.valor) return true;

    if (valor < actual.valor) {
      return this.contiene(valor, actual.izquierda);
    } else {
      return this.contiene(valor, actual.derecha);
    }
  }
}

const arbol = new ArbolBinario();
[25, 15, 50, 10, 22, 35, 70, 4, 12, 18, 24, 31, 44, 66, 90].forEach((n) =>
  arbol.insertar(n)
);

console.log("PreOrder:", arbol.preorden().join(" "));
console.log("InOrder: ", arbol.inorden().join(" "));
console.log("PostOrder:", arbol.postorden().join(" "));

console.log(arbol.contiene(44));
console.log(arbol.contiene(18));
console.log(arbol.contiene(100));
console.log(arbol.contiene(1));

module.exports = { Nodo, ArbolBinario, arbol };
