/**
 * Renderiza las tarjetas de los personajes en el DOM.
 * @param {Array<Object>} characters - Arreglo de objetos que contienen la información de cada personaje.
 */
export function renderCharacters(characters) {
    // Obtenemos el contenedor principal donde se van a mostrar las tarjetas y lo limpiamos
    const grid = document.getElementById('characters-grid');
    grid.innerHTML = '';

    // Manejamos el caso en el que la API no devuelva resultados o haya un error en la búsqueda
    if (!characters || characters.length === 0) {
        grid.innerHTML = '<p>No se encontraron personajes.</p>';
        return;
    }

    // Recorremos el arreglo de personajes y generamos el bloque HTML para cada tarjeta
    const htmlString = characters.map(character => {
        // Convertimos el estado a minúsculas para usarlo como clase CSS (ej: 'alive', 'dead')
        const statusClass = character.status.toLowerCase();

        return `
            <article class="glass-card">
                <div class="card-image-wrapper">
                    <img src="${character.image}" alt="${character.name}" loading="lazy" onerror="this.onerror=null; this.src='img/notfound.png';">
                </div>
                <div class="card-content">
                    <h2>${character.name}</h2>
                    <div class="status-badge">
                        <span class="status-dot ${statusClass}"></span> ${character.status} - ${character.species}
                    </div>
                    <div class="info-group">
                        <span class="label">Origen:</span>
                        <p class="value">${character.origin.name}</p>
                    </div>
                    <div class="info-group">
                        <span class="label">Última ubicación conocida:</span>
                        <p class="value">${character.location.name}</p>
                    </div>
                </div>
            </article>
        `;
    }).join('');

    // Insertamos todo el HTML generado de una sola vez en el DOM (mejora rendimiento)
    grid.innerHTML = htmlString;

    // Scroll suave hacia la parte superior de la página para mostrar los nuevos resultados
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Actualiza los controles de la interfaz de usuario correspondientes a la paginación.
 * @param {Object} info - Objeto con la información de paginación de la API (pages, next, prev).
 * @param {number} currentPage - El número de la página actual.
 */
export function updatePaginationUI(info, currentPage) {
    // Seleccionamos los elementos de la interfaz relacionados con la navegación entre páginas
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const spanCurrent = document.getElementById('current-page');
    const spanTotal = document.getElementById('total-pages');

    // Verificamos que tengamos información válida antes de intentar actualizar la interfaz
    if (info) {
        spanCurrent.textContent = currentPage;
        spanTotal.textContent = info.pages;
        btnPrev.disabled = !info.prev;
        btnNext.disabled = !info.next;
    }
}

/**
 * Inicializa la lógica de la UI para desplegar u ocultar los filtros avanzados.
 * Se ejecuta una vez que el DOM está completamente cargado.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Capturamos el botón que controla la visibilidad y el contenedor de los filtros
    const btnToggle = document.getElementById('btn-toggle-filters');
    const filtersContainer = document.getElementById('filters-container');

    // Comprobamos que los elementos existan en la página para evitar errores de referencia
    if (btnToggle && filtersContainer) {
        btnToggle.addEventListener('click', () => {
            // Alternamos la clase 'hidden' para mostrar u ocultar la sección de filtros avanzados
            filtersContainer.classList.toggle('hidden');
        });
    }
});
