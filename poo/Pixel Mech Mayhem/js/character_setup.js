
/**
 * Configura y devuelve un elemento canvas.
 * @returns {HTMLCanvasElement} El elemento canvas encontrado.
 */
export function setupCanvas() 
{
    const canvas = document.getElementById('canvas');
    
    if (canvas) {
        console.log('setupCanvas: Canvas encontrado.', canvas);
    } else {
        console.error('setupCanvas: ¡ERROR! Canvas no encontrado.');
    }
    return canvas;
}

/**
 * @param {Document} canvas - el canvas del html    
 * @returns {context} El elemento canvas encontrado.
 */
export function setupContext(canvas)
{
    if (!canvas) {
        console.error('setupContext: ¡ERROR! Canvas es nulo o indefinido.');
        return null;
    }
    const context = canvas.getContext('2d');
    if (context) {
        console.log('setupContext: Contexto 2D obtenido.', context);
    } else {
        console.error('setupContext: ¡ERROR! No se pudo obtener el contexto 2D.');
    }
    return context;
}


