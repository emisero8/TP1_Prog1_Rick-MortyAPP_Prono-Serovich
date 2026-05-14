import { getCharacters } from './api.js';
import { renderCharacters, updatePaginationUI } from './ui.js';

let currentPage = 1;
let totalPages = 1;

// Referencias a los elementos del DOM (el Integrante 1 deberá crearlos en el HTML)
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

async function loadPage(page) {
    const data = await getCharacters(page);

    if (data) {
        totalPages = data.info.pages;
        currentPage = page;

        renderCharacters(data.results);
        updatePaginationUI(data.info, currentPage);
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
