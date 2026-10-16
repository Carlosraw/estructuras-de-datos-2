# Documento final: Plataforma de estructuras de datos

Curso: Estructuras de Datos II, Universidad Autónoma de Occidente.
Autor: Carlos Andrés Aristizábal Hernández (código 2230750). Trabajo individual.

## 1. Alcance

Plataforma web con cuatro módulos visuales, cada uno basado en una estructura de datos implementada desde cero en JavaScript. Todas las operaciones se guardan en una base de datos, de modo que la información se conserva al recargar la página.

| Módulo | Ruta | Estructura | Caso de uso |
| --- | --- | --- | --- |
| Pila | `/pila` | Pila (Stack) | Libros apilados |
| Cola | `/cola` | Cola (Queue) | Personas esperando en un cajero |
| Buscador | `/buscador` | Trie y MinHeap | Búsqueda de productos por prefijo, con los más populares primero |
| Grafo | `/grafo` | Grafo no dirigido | Personas, ciudades y amistades |

Con esto se cubren 2 estructuras de Listas/Pilas/Colas (pila y cola), 2 de Árboles/Tries/Heaps (trie y heap) y el Grafo.

## 2. Tecnologías

- React 18 y Vite como base del frontend.
- react-router-dom para la navegación entre módulos.
- react-d3-graph para dibujar el grafo.
- Supabase (PostgreSQL) como base de datos, consumida con `@supabase/supabase-js`.
- Netlify para publicar el sitio.
- Git y GitHub para el control de versiones.

## 3. Estructuras de datos y justificación

**Pila.** Los libros se apilan y solo se puede retirar el que está arriba. Es el comportamiento exacto de una pila (último en entrar, primero en salir): `push`, `pop`, `peek`, `isEmpty`, `size`.

**Cola.** Las personas del cajero se atienden por orden de llegada. La cola (primero en entrar, primero en salir) garantiza ese orden: `enqueue`, `dequeue`, `peek`, `isEmpty`, `size`.

**Trie.** Para sugerir productos a partir de un prefijo, el trie evita recorrer todo el catálogo: se baja letra por letra hasta el prefijo y desde ahí se recogen solo los productos que coinciden. El costo depende de la longitud del prefijo y no del número total de productos.

**MinHeap.** Para mostrar los K productos más populares de un prefijo se usa un heap mínimo de tamaño K. Cada producto nuevo entra al heap y, si el heap supera K elementos, sale el menos popular. Así se obtiene el top K sin ordenar todos los resultados.

**Grafo.** Las personas y las ciudades son nodos; las amistades y la residencia son aristas. Se implementó con lista de adyacencia, que es eficiente para grafos con pocas conexiones por nodo y permite consultar rápido las personas que viven en una ciudad o los amigos de una persona.

## 4. Persistencia y transacciones

Una sola tabla `registros` guarda los datos de los cuatro módulos:

- `id`: identificador autoincremental, que además conserva el orden de inserción.
- `estructura`: módulo al que pertenece (`pila`, `cola`, `producto`, `grafo`).
- `datos`: contenido en formato JSONB.
- `creado_en`: fecha de creación.

Operaciones que se envían a la base de datos:

- Insertar un registro (apilar, encolar, guardar producto, agregar ciudad, persona o amistad).
- Consultar los registros de un módulo al abrir la página.
- Eliminar un registro (desapilar, atender, eliminar producto).

Al cargar cada página, la estructura se reconstruye en memoria a partir de los registros guardados, en el mismo orden en que se insertaron.

## 5. Arquitectura y despliegue

No se desarrolló un servidor propio. Supabase actúa como backend administrado (BaaS): expone la base de datos mediante una API que el frontend consume directamente con la URL del proyecto y una clave publicable. Por eso no hay un servicio de backend adicional que desplegar.

El frontend se publica en Netlify, que construye el proyecto desde la carpeta `proyecto-final` con `npm run build`. Las credenciales se configuran como variables de entorno (`VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`) y no se guardan en el repositorio. Un archivo `netlify.toml` define el directorio de construcción y una redirección para que las rutas de React Router funcionen al recargar.

## 6. Control de versiones

Cada reto del curso y el proyecto final viven en su propia rama `feature/...` del repositorio. El proyecto final se construyó en pasos pequeños, con un commit por funcionalidad: base del proyecto, conexión a Supabase, pila, cola, buscador y grafo. Todas las ramas se fusionan en `main`.

## 7. Limitaciones

- La tabla tiene una política de acceso abierta y no hay inicio de sesión: cualquier visitante puede leer y modificar los datos. Para un uso real habría que agregar autenticación y reglas por usuario.
- El grafo permite agregar ciudades, personas y amistades, pero no eliminarlas.
- Los nombres de ciudades y personas del grafo son únicos.
- Los datos de los módulos se comparten entre todos los visitantes del sitio.
