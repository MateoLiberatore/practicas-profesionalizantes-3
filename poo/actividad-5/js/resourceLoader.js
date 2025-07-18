

export class ResourceLoader extends EventTarget 
{
    /**
     * @class
     */
    constructor() {
        super();
        this.cache = new Map();
        this.totalResources = 0;
        this.loadedResources = 0;
        this.percentage = 0;
        // escribir esto en el codigo cuando se usa
        //https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image
        //fetch
        this.loadCompleteEvent = new CustomEvent('loaded', { detail: this.cache }); 
    }

    /**
     * @method loadImages 
     * @param {dict} sources - dict de src's de las imagenes a cargar.    
     */
    loadImages(dict) 
    {
        let total = Object.keys(dict).length
        this.resetLoader(total);

        if (this.totalResources === 0) 
        { this.dispatchLoadComplete(); return;} // si no hay nada para cargar corta

        for (const id in dict) {
            //fech para control de carga
            if (dict.hasOwnProperty(id)) {
                this.loadImage(id, dict[id]);
            }
        }
    }

    /**
     * @method resetLoader 
     * @param {Int} total - cantidad de recursos a cargar 
     */
    resetLoader(total) 
    {
        this.totalResources = total;
        this.loadedResources = 0;
        this.percentage = 0;
        this.cache.clear();
    }

    /**
     * @method loadImage
     * @param {int} id - id en diccionario
     * @param {string} resource - src de la imagen en diccionario
     */
     loadImage(id, src) 
    {
        const img = new Image();
        img.src = src;
        img.onload = this.handleResourceLoad.bind(this, id, img);
        img.onerror = this.handleResourceError.bind(this, id, src);
    }
    
    /**
     * @method handleResourceLoad
     * @param {int} id 
     * @param {src} resource 
     */
    handleResourceLoad(id, src) 
    {
        this.cache.set(id, src);
        this.incrementLoaded();
    }

    /**
     * @method handleResourceError
     * @param {int} id 
     * @param {src} resource  
     */
    handleResourceError(id, src) 
    {
        console.error(`ResourceLoader: No se pudo cargar el recurso con ID "${id}" desde: ${src}.`);
        this.cache.set(id, null); // null a el error y seguie la ejecucion
        this.incrementLoaded();
    }

    /**
     * @method incrementLoaded - tracker de la carga
     */
    incrementLoaded() {
        this.loadedResources++;

        this.checkIfLoadComplete();
    }

    /**
     * @method updatePercentage - percentage tarcker
     */
    updatePercentage() {
        this.percentage = (this.loadedResources / this.totalResources) * 100;
        this.dispatchEvent(new CustomEvent('progress', { detail: this.percentage }));
    }

    /**
     * @method checkIfLoadComplete 
     */
    checkIfLoadComplete() {
        if (this.loadedResources === this.totalResources) {
            this.dispatchLoadComplete();
        }
    }

    /**
     * @method dispatchLoadComplete - despacha el evento
     */
    dispatchLoadComplete() 
    { this.dispatchEvent(this.loadCompleteEvent);}

    /**
     * @method getImage
     * @param {int} id - ubicacion en cache
     * @returns {img} - imagen
     */
    getImage(id) 
    { return this.cache.get(id);}
}
