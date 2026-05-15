import { getCharacters } from './api.js';
import { renderCharacters, updatePaginationUI } from './ui.js';

let currentPage = 1;
let totalPages = 1;
let currentFilters = {
    search: '',
    status: '',
    species: '',
    type: '',
    gender: ''
};

// Referencias a los elementos del DOM (p/ llamar en el HTML)
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const searchInput = document.getElementById('search-input');
const advancedSearchForm = document.getElementById('advanced-search-form');

// Carga y renderiza los personajes de la página aplicando los filtros necesarios
async function loadPage(page) {
    // Llamamos a la API para obtener los datos de la página
    const data = await getCharacters(page, currentFilters);

    // Si la API responde correctamente, actualizamos el estado y la vista
    if (data) {
        // Guardamos el total de páginas disponibles para limitar la navegación
        totalPages = data.info ? data.info.pages : 1;
        currentPage = page;

        renderCharacters(data.results);
        updatePaginationUI(data.info, currentPage);
    }
}

// Implementación de Debounce para la búsqueda en tiempo real
let searchTimeout;

// Configura todos los eventos interactivos de la aplicación (botones y formularios)
function setupEventListeners() {
    // Evento para retroceder de página
    if (btnPrev) {
        btnPrev.addEventListener('click', () => {
            // Evitamos hacer una petición si ya estamos en la primera página
            if (currentPage > 1) {
                loadPage(currentPage - 1);
            }
        });
    }

    // Evento para avanzar de página
    if (btnNext) {
        btnNext.addEventListener('click', () => {
            // Evitamos hacer una petición si ya alcanzamos la última página disponible
            if (currentPage < totalPages) {
                loadPage(currentPage + 1);
            }
        });
    }

    // Búsqueda en tiempo real (solo por nombre o ID)
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            // Cancelamos el temporizador anterior si el usuario sigue escribiendo
            clearTimeout(searchTimeout);

            // Creamos un nuevo temporizador que se ejecutará solo cuando el usuario deje de escribir
            searchTimeout = setTimeout(() => {
                currentFilters.search = e.target.value;
                // Siempre que hacemos una nueva búsqueda, volvemos a la primera página de resultados
                loadPage(1);
            }, 500); // Esperamos 500ms antes de disparar la búsqueda para no saturar la API con peticiones innecesarias
        });
    }

    // Búsqueda avanzada a través de un formulario con múltiples filtros combinados
    if (advancedSearchForm) {
        advancedSearchForm.addEventListener('submit', (e) => {
            // Evitamos que el formulario recargue la página al enviarse
            e.preventDefault();

            // Extraemos todos los valores seleccionados o ingresados en el formulario
            const formData = new FormData(advancedSearchForm);

            // Actualizamos el estado global de los filtros con la información obtenida
            currentFilters.status = formData.get('status') || '';
            currentFilters.species = formData.get('species') || '';
            currentFilters.type = formData.get('type') || '';
            currentFilters.gender = formData.get('gender') || '';

            // Si el input de búsqueda está dentro del formulario también lo actualizamos
            const formSearchInput = formData.get('search');
            if (formSearchInput !== null) {
                currentFilters.search = formSearchInput;
            }

            loadPage(1); // Resetear a página 1 al aplicar filtros
        });
    }
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    // Preparamos la interfaz escuchando las interacciones del usuario
    setupEventListeners();
    // Hacemos la carga inicial para mostrar los personajes en pantalla
    loadPage(currentPage);
});
