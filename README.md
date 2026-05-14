# Catálogo de personajes de Rick and Morty - TP1 Programación 2.

![Rick and Morty API](https://rickandmortyapi.com/api/character/avatar/1.jpeg)

## Integrantes del equipo:
* **Prono Felipe - DNI 43.165.905**
* **Serovich Emilio - DNI 43.770.166**

## Descripción del proyecto:
Esta aplicación web ofrece un catálogo completo de los personajes de la serie animada Rick and Morty, con funcionalidades de explorador interactivo para navegar por continuas páginas que contienen todos los personajes de la tira. La aplicación se conecta a la API pública oficial de Rick and Morty [(https://rickandmortyapi.com/)] para obtener datos en tiempo real de los personajes, incluyendo su imagen, estado de vida, especie, origen y última ubicación conocida.

El proyecto cuenta con un diseño responsivo, utilizando técnicas de CSS moderno, y está dividido lógicamente aplicando buenas prácticas de JavaScript (Módulos ES6). Se implementó un sistema de paginación para poder navegar a lo largo de los diferentes personajes que provee la API.

## Tecnologías utilizadas:
* **HTML5** (Estructura semántica)
* **CSS3** (Variables, Flexbox, CSS Grid)
* **JavaScript (ES6)** (Fetch API, Promesas, Async/Await, Módulos)
* **Git y GitHub** (Control de versiones colaborativo)

## Cómo correr el proyecto localmente:

1. Clona este repositorio en tu máquina local:
   ```bash
   git clone https://github.com/emisero8/TP1_Prog1_Rick-MortyAPP_Prono-Serovich.git
   ```
2. Navega a la carpeta del proyecto:
   ```bash
   cd TP1_Prog1_Rick-MortyAPP_Prono-Serovich
   ```
3. Para visualizar correctamente los módulos de JavaScript, se debe abrir el archivo `index.html` utilizando un servidor local. 
   - Si se usa Visual Studio Code, recomendamos instalar la extensión **Live Server**.
   - Se debe seleccionar el archivo `index.html` y abrirlo preferentemente con Live Server.

## Uso de Inteligencia Artificial (IA) en el desarrollo:

Durante el desarrollo de este trabajo práctico, utilizamos herramientas de IA (LLMs) como asistentes de programación (Pair Programming). 

**¿Para qué la utilizamos?**
1. **Planificación y Arquitectura:** La IA nos ayudó a estructurar un documento con un plan de implementación para dividir las tareas equitativamente, definiendo qué archivos tocaría cada uno para evitar conflictos de merge en Git.
2. **Generación de Código Base:** Nos asistió en la creación del maquetado HTML y los estilos base (CSS) con estéticas modernas.
3. **Resolución de Errores (Debugging):** Al realizar la integración (Merge) de nuestras ramas de trabajo, surgieron problemas de comunicación entre `main.js` y `ui.js`. La IA fue clave para analizar el código, identificar qué variables no se estaban importando/exportando correctamente y solucionar la sincronización de la paginación.
4. **Comandos de Git:** Nos guió en algunas pocas dudas sobre el flujo colaborativo de ramas (crear rama, pull request y merge).

**Prompts destacados utilizados:**
* *"Ya hicimos con mi compañero el merge de nuestro primer paso cada uno, pero ahora cuando levantado el index, no se muestran los personajes, por que?"*
* *"Lee el implementation_plan.md, ya completamos el primer paso y llegamos a hacer hasta el Pull Request completo. Como sigue mi trabajo? Soy el integrante 2"*

---
*Trabajo Práctico N° 1 - Programación 1*
