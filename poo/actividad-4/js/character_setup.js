// js/character_setup.js

/**
 * Configura y devuelve un elemento canvas.
 * @returns {HTMLCanvasElement} El elemento canvas encontrado.
 */
export function setupCanvas() 
{
    const canvas = document.querySelector('canvas');
    if (canvas) {
        console.log('setupCanvas: Canvas encontrado.', canvas);
    } else {
        console.error('setupCanvas: ¡ERROR! Canvas no encontrado.');
    }
    return canvas;
}

/**
 * Obtiene y devuelve el contexto de renderizado 2D de un canvas.
 * @param {HTMLCanvasElement} canvas - El elemento canvas.
 * @returns {CanvasRenderingContext2D} El contexto de renderizado 2D.
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

/**
 * Carga una imagen de sprite y ejecuta un callback cuando la imagen está completamente cargada.
 * @param {string} src - La ruta al archivo de la imagen del sprite.
 * @param {function} callback - La función a ejecutar una vez que la imagen ha cargado.
 * @returns {HTMLImageElement} La instancia de la imagen.
 */
export function loadSprite(src, callback)
{
    let img = new Image();
    img.src = src;
    img.onload = () => {
        console.log(`loadSprite: Imagen cargada correctamente: ${src}`);
        if (callback) {
            callback();
        }
    };
    img.onerror = () => {
        console.error(`loadSprite: ¡ERROR! No se pudo cargar la imagen: ${src}. Verifica la ruta.`);
        // Opcional: cargar una imagen de placeholder si la original falla
        img.src = "https://placehold.co/32x32/FF0000/FFFFFF?text=ERROR"; 
    };
    console.log(`loadSprite: Intentando cargar imagen desde: ${src}`);
    return img; 
}
