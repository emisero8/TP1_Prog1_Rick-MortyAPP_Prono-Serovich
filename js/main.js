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

// Referencias a los elementos del DOM (el Integrante 1 deberá crearlos en el HTML)
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const searchInput = document.getElementById('search-input');
const advancedSearchForm = document.getElementById('advanced-search-form');

async function loadPage(page) {
    const data = await getCharacters(page, currentFilters);

    if (data) {
        totalPages = data.info ? data.info.pages : 1;
        currentPage = page;

        renderCharacters(data.results);
        updatePaginationUI(data.info, currentPage);
    }
}

// Implementación de Debounce para la búsqueda en tiempo real
let searchTimeout;

function setupEventListeners() {
    if (btnPrev) {
        btnPrev.addEventListener('click', () => {
            if (currentPage > 1) {
                loadPage(currentPage - 1);
            }
        });
    }

    if (btnNext) {
        btnNext.addEventListener('click', () => {
            if (currentPage < totalPages) {
                loadPage(currentPage + 1);
            }
        });
    }

    // Búsqueda en tiempo real (solo por nombre o ID)
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                currentFilters.search = e.target.value;
                loadPage(1); // Resetear a página 1 al buscar
            }, 500); // 500ms de retraso para no saturar la API
        });
    }

    // Búsqueda avanzada con formulario y botón (filtros adicionales)
    if (advancedSearchForm) {
        advancedSearchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Capturar datos del formulario
            const formData = new FormData(advancedSearchForm);
            
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
    setupEventListeners();
    loadPage(currentPage);
});
