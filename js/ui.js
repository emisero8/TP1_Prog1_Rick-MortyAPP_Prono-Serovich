export function renderCharacters(characters) {
    const grid = document.getElementById('characters-grid');
    grid.innerHTML = '';

    if (!characters || characters.length === 0) {
        grid.innerHTML = '<p>No se encontraron personajes.</p>';
        return;
    }

    const htmlString = characters.map(character => {
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

    grid.innerHTML = htmlString;
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function updatePaginationUI(info, currentPage) {
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const spanCurrent = document.getElementById('current-page');
    const spanTotal = document.getElementById('total-pages');

    if (info) {
        spanCurrent.textContent = currentPage;
        spanTotal.textContent = info.pages;
        btnPrev.disabled = !info.prev;
        btnNext.disabled = !info.next;
    }
}

// Lógica de UI para desplegar los filtros
document.addEventListener('DOMContentLoaded', () => {
    const btnToggle = document.getElementById('btn-toggle-filters');
    const filtersContainer = document.getElementById('filters-container');
    
    if (btnToggle && filtersContainer) {
        btnToggle.addEventListener('click', () => {
            filtersContainer.classList.toggle('hidden');
        });
    }
});
