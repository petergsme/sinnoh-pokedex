# Memoria del Proyecto Pokedex Sinnoh

## Índice

- [La premisa](#la-premisa)
- [Filosofía y proceso](#filosofía-y-proceso)
- [Diseño y prototipado](#diseño-y-prototipado)
- [Herramientas](#herramientas)
- [Bases de la app](#bases-de-la-app)
  - [Estilos](#estilos)
  - [Iconos](#iconos)
- [Primeros componentes](#primeros-componentes)
- [PokéAPI](#pokéapi)
- [PokemonCards y PokemonModal](#pokemoncards-y-pokemonmodal)
- [La famosa Pokédex](#la-famosa-pokédx)
- [Funcionalidades avanzadas](#funcionalidades-avanzadas)
  - [Favoritos](#favoritos)
  - [Paginación](#paginación)
  - [Custom hooks](#custom-hooks)
- [Utilidades](#utilidades)
- [Mayores desafíos](#mayores-desafíos)
- [Inteligencia artificial](#inteligencia-artificial)
- [Mi aprendizaje](#mi-aprendizaje)

---

## La premisa

La prueba técnica consistía en desarrollar una app web para mostrar todos los Pokémon de Sinnoh, con vista listado, vista detalle, paginación, modo oscuro/claro, y la opción de cambiar entre vista cuadrícula y lista. También había opción de entregar algunos extras como un diseño responsive, TypeScript, un sistema de favoritos, custom properties con CSS y testing.

## Filosofía y proceso

Soy un junior y me queda mucho por aprender, pero intento adherirme al método que conozco y me funciona. Siempre pienso antes de programar e intento anotar cómo debería funcionar la lógica que quiero implementar, y luego voy programando de menos a más. Implemento las versiones más básicas de la lógica que quiero crear, voy poco a poco comprobando que funciona y apilando un ladrillito sobre otro, hasta que eventualmente tengo una torre. Y luego pinto la torre, que para mí significa simplificar mis componentes para que el código sea mucho más accesible.

Para la Pokédex, por ejemplo, fui montando todo poco a poco en el componente principal y luego extraje los componentes `Pagination` y `PokedexControls`, y el custom hook `useLocalStorage`.

## Diseño y prototipado

Mi objetivo era crear **una Pokédex para casuals**, algo moderno, sencillo, funcional y ligero. Me gustan los Pokémon pero hace tiempo que no estoy en el mundillo, así que quería que fuera accesible para gente como yo que no necesariamente es experta pero quiere explorar de manera intuitiva.

Dediqué el primer día a diseñar y prototipar en Figma. Para mí es importante establecer unas bases sólidas en el diseño antes de escribir una sola línea de código. Creé un sistema de diseño completo con variables tokenizadas para espaciados, colores y tipografías, y componentes y prototipos interactivos. Las variables fueron especialmente importantes para definir rápidamente una base de estilos súper sólida en custom properties de SCSS y clases de utilidad de textos.

**[→ Diseño completo en Figma](https://www.figma.com/design/gw80fyuct5lqBJH9Ffxogq/Pokedex-Sinnoh?node-id=0-1&t=m5UZ57NE6q7k1XN6-1)**

## Herramientas

React + Vite - Fue mi elección principal porque es donde me siento más cómodo trabajando, es lo que mejor conozco.

TypeScript - Ya tenía experiencia previa con TypeScript, pero durante el proyecto me he encontrado alguna cosita nueva que aprender como los type assertions.

SCSS con la librería `classnames` - Utilizo la nomenclatura BEM así que mis clases pueden volverse largas y repetitivas. Esta librería me ayuda a ver las clases de manera más clara y facilita hacer clases dependientes de variables. En cuanto a SCSS es una mejora de CSS y me resulta más cómodo por lo que ofrece. También uso CSS Modules como buena práctica para evitar que las hojas de estilos puedan llegar a chafarse entre ellas.

React Router - Para manejar las rutas del paginado y las no existentes.

vite-plugin-svgr - He utilizado este package para crear la librería de iconos del proyecto. La había usado antes y mi profesor nos dio una clase sobre el tema.

## Bases de la app

### Estilos

Lo primero fue trasladar todas las variables de Figma a SCSS. La carpeta styles conforma la base de estilos del proyecto e incluye: `variables.scss` que contiene todas las custom properties globales, `index.scss` que incluye el entry point CSS, `mixins.scss` con unos media queries globales, `reset.scss` que es un simple CSS reset, y `utilities.scss` que incluye clases de utilidad globales principalmente de estilos de texto.

La idea era crear esa base sólida donde cada componente pudiera beber de las mismas variables pero mantener su independencia de estilos. Lo bueno es que puedo cambiar toda la paleta de colores modificando unas pocas líneas en `variables.scss`.

```scss
--space-8: 8px;
--purple-800: #553c9a;
--bg-primary-lightmode: linear-gradient(180deg, var(--yellow-200) 0%, var(--purple-200) 100%);
```

### Iconos

Para los iconos, implementé un sistema usando vite-plugin-svgr que permite importar SVGs directamente como componentes React.

```
src/assets/icons/
├── Icon.tsx
├── icons.ts
└── assets/
    ├── icon-sun.svg
    ├── icon-moon.svg
    └── ...
```

En `icons.ts` exporto todos los iconos usando la sintaxis `?react` del paquete. El componente `Icon` (`src/assets/icons/Icon.tsx`) utiliza `createElement` para renderizar dinámicamente el icono correcto según el nombre que le pases como prop `<Icon icon="Heart" size="small" />`. También maneja automáticamente los colores según el tema activo usando `theme` del context del tema.

## Primeros componentes

```
src/components/
├── Button/
├── PokemonLogo/
└── ThemeSwitcher/
```

Empecé por lo más básico. `Button` (`src/components/Button/Button.tsx`) es el componente base para todos los botones de la aplicación. Soporta estados toggle para cosas como favoritos, diferentes tamaños, y recibe children para poder meter iconos o texto.

`PokemonLogo` (`src/components/PokemonLogo/PokemonLogo.tsx`) es un componente simple, pero componentizarlo permite ahorrarse tener un logo claro y otro oscuro, cambiamos el color del SVG con clases condicionales que dependen de `theme` del `ThemeContext`.

Para el `ThemeSwitcher` (`src/components/ThemeSwitcher/ThemeSwitcher.tsx`), los botones que cambian el modo de color de la página, creé un contexto global para manejar el tema. No había trabajado mucho con contextos pero fue sencillo siguiendo la documentación de React y TypeScript. El contexto guarda la preferencia en localStorage usando la clave `theme`, detecta la preferencia del sistema por defecto si no hay nada guardado, y aplica las clases CSS correspondientes al fondo del `body` de la app. Este componente simplemente renderiza dos botones que llaman a las funciones `setLightMode` y `setDarkMode` del custom hook del contexto. Casi todos componentes se suscriben al `ThemeContext` para cambiar sus clases al cambiar el modo de color.

## PokéAPI

```
src/
├── services/
│   └── pokeApi.ts
└── models/
    ├── Pokemon.ts
    ├── PokemonApiResponse.ts
    └── PokemonSpeciesResponse.ts
```

La API de Pokémon fue un desafío. No había trabajado casi nada con APIs, así que tuve que volver a aprender a tipar los datos que recibimos y los datos que queremos usar, transformarlos y crear funciones fetch para hacer llamadas. Para empezar estuve viendo tutoriales de gente que había hecho una pokedex (como [este](https://www.youtube.com/watch?v=XNEhQiIAzOo) o [este](https://www.youtube.com/watch?v=RMrA3xkbMMs)), para tener una idea de cómo trabajar con la API, y luego consulté mucho la documentación de PokeAPI.

Para los tipados creé interfaces para las respuestas de los endpoints como `PokeApiResponse` y `PokeSpeciesResponse`, y para mi objeto `Pokemon`.

Con la documentación de PokéAPI me di cuenta de que la manera más directa para sacar los Pokémon de Sinnoh era usar el endpoint normal (`/pokemon`) con IDs específicos. Así que monté un array `sinnohPokemonIds` con todos los IDs de los Pokémon de la región Sinnoh extendida, ordenados según aparecen en la pokedex.

`pokeApi.ts` incluye cuatro funciones principales:

- `getDescription()` obtiene descripciones desde el endpoint `pokemon-species` y fue interesante porque las descripciones vienen con caracteres extraños, saltos de línea y espacios duplicados que tuve que limpiar con regex. Por suerte estaba avisado en la documentación y mostraba cómo solucionarlo [aquí](https://github.com/veekun/pokedex/issues/218#issuecomment-339841781).
- `transformPokemon()` transforma la respuesta del API a mi interface `Pokemon`
- `fetchPokemon()` hace el fetch combinando datos del endpoint principal con la descripción del species y utiliza `transformPokemon()`.
- `fetchMultiplePokemon()` utiliza `Promise.all` para obtener múltiples Pokémon en paralelo.

## PokemonCards y PokemonModal

```
src/components/
├── PokemonCard/
├── PokemonModal/
├── PokemonType/
└── PokemonStatBar/
```

`PokemonCard` (`src/components/PokemonCard/PokemonCard.tsx`) es el auténtico corazón de la app. Se trata de la tarjeta del Pokemon y su vista detalle. Renderiza diferentes versiones según el `viewMode` prop (grid o lista) y al hacer click abre el modal con toda la información detallada del mismo Pokémon.

`PokemonModal` (`src/components/PokemonModal/PokemonModal.tsx`) funciona como un contenedor vacío que recibe todo el contenido desde `PokemonCard`. Maneja las animaciones de entrada/salida con el estado `isClosing`, que se activa cuando se va a cerrar el modal, disparando la animación de salida con un timeout antes de cerrar realmente el modal y limpiar el estado. También bloquea scroll en desktop pero no en móvil, y está suscrito a `ThemeContext`.

`PokemonType` (`src/components/PokemonType/PokemonType.tsx`) muestra el tipo del Pokémon, y `PokemonStatBar` (`src/components/PokemonStatBar/PokemonStatBar.tsx`) muestra barras de progreso para sus stats de vida, ataque y defensa. Ambos reciben sus props de `pokemon` en `PokemonCard`, que contiene todos los datos.

Para los favoritos, `PokemonCard` tiene un estado local `isFavorite` que controla si el botón de corazón aparece lleno o vacío. Cuando haces click, se ejecuta `togglePokemonFavorite()` que cambia el estado local, actualiza `localStorage` y actualiza el estado en el padre con `onFavoritesChange` manteniendo los favoritos sincronizados.

## La famosa Pokedex

```
src/components/
├── Pokedex/
├── PokedexControls/
└── Pagination/
```

La `Pokedex` (`src/components/Pokedex/Pokedex.tsx`) es el sistema nervioso de la app. Alberga el fetch del API, el mapeo de los pokemon, los controles de vista y favoritos, y la paginación. También es desde donde se maneja la mayor parte de la lógica de estado:

- `pokemon`: array que contiene los Pokémon que se están mostrando actualmente
- `isLoading` y `error`: manejan los estados de carga y errores de la API
- `viewMode`: controla si se muestran las cards en formato grid o lista (persiste en localStorage)
- `showPokemon`: determina si se muestran todos los Pokémon o solo favoritos
- `favorites`: mantiene sincronizado el estado local con lo guardado en localStorage

El fetch de los Pokémon está en el `useEffect` principal que se dispara cuando cambian `showPokemon`, `favorites` o cambia la página. Lo que hace es determinar qué IDs de Pokémon necesita cargar según si estamos en modo "todos" o "favoritos", usa la función utility `getPaginatedIds` para obtener solo los IDs de la página actual (evitando cargar todo de una vez), y luego llama a `fetchMultiplePokemon` que hace las llamadas a la API en paralelo, actualiza el estado `pokemon`, y finalmente se mapea este array para renderizar cada `PokemonCard` con sus datos y callbacks.

`PokedexControls` (`src/components/PokedexControls/PokedexControls.tsx`) agrupa los controles de la interfaz para cambiar entre todos/favoritos y vista de grid/lista.

La `Pagination` (`src/components/Pagination/Pagination.tsx`) pinta una numeración inteligente que permite navegar entre las páginas de Pokémon.

## Funcionalidades avanzadas

### Favoritos

```
src/utils/favoritesUtils.ts
```

El sistema de favoritos utiliza localStorage para la persistencia. Además he creado funciones de utilidad para simplificar la lógica en `PokemonCard` y `Pokedex`.

- `getFavorites()`: lee los favoritos desde localStorage. Usado en `Pokedex` para mostrar la lista de favoritos y en `PokemonCard` para verificar estado inicial.
- `isPokemonFavorite()`: verifica si un ID específico está en la lista de favoritos. Usado en `PokemonCard` para determinar el estado local inicial del que depende el toggle del botón de favoritos.
- `togglePokemonFavorite()`: en PokemonCard, se encarga de agregar/quitar favoritos y actualiza localStorage y estado local en Pokedex.

### Paginación

```
src/components/Pagination.ts
src/hooks/usePagination.ts
src/utils/paginationUtils.ts
```

La paginación fue un reto interesante, me daba mucho respeto así que fue lo último que implementé, pero resultó no ser para nada tan difícil como creía.

El componente `Pagination` (`src/components/Pagination/Pagination.tsx`) renderiza la interfaz de navegación al final de la página, mostrando siempre página anterior y siguiente a la actual, y botones para ir a la primera/última página. Hace uso del custom hook que menciono abajo.

Implementé el custom hook `usePagination` que recibe el total de elementos y elementos por página, y maneja automáticamente el cálculo de páginas totales y navegación, expone:

- `currentPage`: usado para resaltar la página activa y determinar qué números mostrar
- `totalPages`: para calcular si mostrar botones de primera/última página y puntos suspensivos
- `goToPage()`: función que llama el componente cuando haces click en cualquier número de página

La función utility `getPaginatedIds` en `paginationUtils.ts` se encarga de obtener solo los IDs correspondientes a una página específica sin cargar todo el array completo, y la utilizamos en `Pokedex`.

## Inteligencia artificial

Sí, he usado IA (Claude para ser más exacto) pero como una **compañera**, no para que me haga los deberes. No escribo código que no entiendo, eso no me serviría de nada. Si dejo que una máquina lo haga todo no voy a pensar ni aprender, y **quiero** aprender.

Siempre intento pensar primero, y buscar después tutoriales, guías o documentación. Uso Claude principalmente para acelerar tareas repetitivas como arreglar las custom properties rotas del conversor de Figma a CSS, como compañero para pedir consejo, o para buscarme recursos y guías más rápido de lo que yo lo haría buscando en internet. También lo he usado para ayudarme a estructurar esta memoria y revisar posibles errores ortográficos que pueda haber cometido escribiéndola, por ejemplo.

## Mi aprendizaje

Este proyecto ha sido muy entretenido y un poco cañero, estaba un poco oxidado entre el verano y los viajes, así que me ha venido bien para entrar en forma a septiembre. Una de las cosas que más me ha ayudado ha sido leer **documentación oficial** en lugar de irme directo a guías o buscar puntos específicos. No son muy largas y te ayudan a tener una visión mucho más completa de todo, la de TypeScript me ha gustado especialmente y la volveré a leer. Además me he sentido realizado aprendiendo finalmente a trabajar con APIs, como lo había tocado tan poquito le tenía cierto respeto. También estoy bastante contento por cómo he gestionado los componentes poco a poco, pensando paso a paso, y los he ido complicando y luego simplificando.
