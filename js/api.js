const API_BASE_URL = 'https://rickandmortyapi.com/api';

/**
 * Recuperamos los personajes de la API de Rick and Morty.
 * @param {number} page - Número de página a consultar.
 * @param {Object} filters - Objeto con los filtros a aplicar.
 * @returns {Promise<Object>} Un objeto con la información (info) y los resultados (results).
 */
export async function getCharacters(page = 1, filters = {}) {
    try {
        // 1. Si hay una búsqueda por ID (un número exacto en el campo search)
        if (filters.search && !isNaN(filters.search) && filters.search.trim() !== '') {
            const response = await fetch(`${API_BASE_URL}/character/${filters.search.trim()}`);
            if (!response.ok) {
                if (response.status === 404) return { info: { pages: 0, next: null, prev: null }, results: [] };
                throw new Error(`Error HTTP: ${response.status}`);
            }
            const data = await response.json();
            // Lo envolvemos en un array para simular la misma estructura de la API paginada
            return {
                info: { pages: 1, next: null, prev: null },
                results: [data]
            };
        }

        // 2. Búsqueda por parámetros normales (nombre, estado, etc)
        let queryParams = `?page=${page}`;
        if (filters.search && isNaN(filters.search)) queryParams += `&name=${filters.search}`;
        if (filters.status) queryParams += `&status=${filters.status}`;
        if (filters.species) queryParams += `&species=${filters.species}`;
        if (filters.type) queryParams += `&type=${filters.type}`;
        if (filters.gender) queryParams += `&gender=${filters.gender}`;

        const response = await fetch(`${API_BASE_URL}/character${queryParams}`);
        if (!response.ok) {
            if (response.status === 404) return { info: { pages: 0, next: null, prev: null }, results: [] };
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        return data; // Retorna { info, results }
    } catch (error) {
        console.error("Error al obtener personajes:", error);
        return null;
    }
}
