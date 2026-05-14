const API_BASE_URL = 'https://rickandmortyapi.com/api';

/**
 * Obtiene los personajes de la API de Rick and Morty.
 * @param {number} page - Número de página a consultar.
 * @returns {Promise<Object>} Un objeto con la información (info) y los resultados (results).
 */
export async function getCharacters(page = 1) {
    try {
        const response = await fetch(`${API_BASE_URL}/character?page=${page}`);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        return data; // Retorna { info, results }
    } catch (error) {
        console.error("Error al obtener personajes:", error);
        return null;
    }
}
