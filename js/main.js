import { getCharacters } from './api.js';
// Importaremos la función de renderizado cuando el Integrante 1 (UI) la tenga lista
// import { renderCharacters } from './ui.js';

let currentPage = 1;
let totalPages = 1;

// Referencias a los elementos del DOM (el Integrante 1 deberá crearlos en el HTML)
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const pageInfo = document.getElementById('page-info');

async function loadPage(page) {
    const data = await getCharacters(page);
    
    if (data) {
        totalPages = data.info.pages;
        currentPage = page;
        
        // Cuando esté lista la UI, aquí llamaremos a:
        // renderCharacters(data.results);
        
        // Por ahora lo mostramos en consola para probar
        console.log(`Personajes cargados (Página ${currentPage} de ${totalPages}):`, data.results);
        
        updatePaginationUI();
    }
}

function updatePaginationUI() {
    if (pageInfo) {
        pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
    }
    
    if (btnPrev) {
        btnPrev.disabled = currentPage <= 1;
    }
    
    if (btnNext) {
        btnNext.disabled = currentPage >= totalPages;
    }
}

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
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    loadPage(currentPage);
});
