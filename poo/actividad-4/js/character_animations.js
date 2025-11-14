// js/character_animations.js
import { drawFrame, flipView } from "./draw.js";
import { setupCanvas, setupContext, loadSprite } from "./character_setup.js";


export class Character 
{
    /**
     * clase Character
     * @param {string} src                              - La ruta al archivo del sprite del personaje.
     */
    constructor(src) 
    {
        /** 
         * @constructor
        */
        this.canvas  = setupCanvas();
        this.context = setupContext(this.canvas);

        this.image   = loadSprite(src, this.loadImageFlag.bind(this));

        //posiciones y valores base de movimiento
        this.canvasX = 500;
        this.canvasY = 640;                             // Posición inicial Y (suelo)
        this.speed   = 3;                               // siempre numeros redondos cuando se trabaja con pixeles

        // proporcion
        this.scale  = 6;                                // siempre numeros redondos cuando se trabaja con pixeles
        this.width  = 32;           
        this.height = 32;           
        
        // escalado de las proporciones
        this.scaledWidth  = this.scale * this.width; 
        this.scaledHeight = this.scale * this.height;

        // acciones
        this.rightStepAction = new RightStep(this);
        this.leftStepAction  = new LeftStep(this);
        this.jumpAction      = new Jump(this);
        this.stopAction      = new Stop(this);

        // estados de las animaciones
        this.currentState = null;
        this.currentAction = null;                      // Referencia a la instancia de la acción actual
        this.animationFrameId = null;                   // ID del requestAnimationFrame para el salto, si aplica
        this.isJumping = false;                         // Bandera para controlar si el personaje está saltando
    }
    loadImageFlag() 
    {
        
        this.setState('idle');                           //estado inicial
    }
    cancelAnimation()
    {
        if (this.animationFrameId !== null)
        {
            window.cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }
    setState(newState, direction = 0) 
    {
        /**
        * @param {string} newState                      - El nombre del nuevo estado (ej. 'idle', 'walkingRight').
        * @param {number} [direction=0]                 - Dirección para el salto (1 derecha,-1 izquierda,0 vertical).
        */

        if (this.isJumping && newState === 'jumping')
        
        { return; }                                     //Cancelar un posible doble salto
        
        if (newState === 'jumping') 
        
        {   this.cancelAnimation(); }                   //Si hay un salto cancela cualquier animacion anterior
        

        this.currentState = newState;                   //Actualiza el estado

        
        switch (newState)                               //Manejo de estados
        {
            case 'walkingRight': this.currentAction = this.rightStepAction; break;
            case 'walkingLeft':  this.currentAction = this.leftStepAction;  break;
            case 'jumping':      this.currentAction = this.jumpAction;
                
                this.jumpAction.init(direction);        // Inicia el salto, que manejará su propio requestAnimationFrame

            case 'idle':         this.currentAction = this.stopAction;      break;
            case 'shutdown':     this.currentAction = this.shutDownAction;  break;
            default:
                console.warn(`setState: Estado desconocido: ${newState}`);
                this.currentAction = this.stopAction;   // Vuelve a idle por defecto
        } 
        
        
        if (this.currentAction && this.currentAction.init) 
            
        {  this.currentAction.init(); }                 // Reinicia el estado de la acción actual si es necesario 
    }

    update()
    {
        
        this.context.clearRect(                         // Limpia todo el canvas en cada frame
        0, 0,
        this.canvas.width,
        this.canvas.height);

        if (this.currentAction && !this.isJumping)      // Si hay una acción actual y no esta saltando
        {
            if (this.currentAction.update)
            {
                this.currentAction.update(); 
            } 
            else 
            {
                console.warn(`Character.update: currentAction (${this.currentState}) no tiene método update.`);
            }
        }
        else if (this.isJumping)
        {
            /*
                 Este bloque está vacío intencionalmente.
                 La clase Jump maneja su propio bucle de dibujo y actualización
                 a través de requestAnimationFrame, que se inicia en Jump.init().
            */
        }
        else 
        {
            console.warn('Character.update: currentAction es nulo o indefinido.');
        }
    }
}

class RightStep 
{
    /**
     * @param {Character} character                     - La instancia del personaje.
     */
    constructor(character) 
    {
        this.character  = character;
        this.canvas     = character.canvas;
        this.context    = character.context;
        this.img        = character.image;
        this.cycleLoop  = [0,1,2,3,4,5];                // Frames de animación para caminar a la derecha
        this.loopIndex  = 0;                            // Índice del frame actual en el ciclo
        this.frameCount = 0;                            // Contador para controlar la velocidad de la animación
        this.speed      = character.speed;              
        
        this.init       = this.init.bind(this);         // Enlaza el contexto 'this' al método init
        this.update     = this.update.bind(this);  // Enlaza el contexto 'this' al método update
    }

    init() 
    {
        this.loopIndex = 0; 
        this.frameCount = 0; 
    }
    update() 
    {
        this.character.canvasX += this.speed;           // Movimiento a la derecha

        const maxX = this.canvas.width - this.character.scaledWidth;
        if (this.character.canvasX > maxX) 
        {
            this.character.canvasX = maxX;              // Limitar el movimiento por el canvas
        }
        
        this.frameCount++;                              //regular animacion (fps = 15)
        if (this.frameCount >= 15) 
        {
            this.frameCount = 0;
            this.loopIndex = (this.loopIndex + 1) % this.cycleLoop.length;
        }

       
        drawFrame(                                      // Dibuja el frame actual del personaje
            this.cycleLoop[this.loopIndex], 1,          // 1 = 2da fila de imagenes 
            this.character.canvasX,
            this.character.canvasY,
            this.context,
            this.img,
            this.character.width,
            this.character.height,
            this.character.scaledWidth,
            this.character.scaledHeight
        );
    }
}
class LeftStep 
{
    /**
     * @param {Character} character                      - La instancia del personaje.
     */
    constructor(character) 
    {
        this.character  = character;
        this.canvas     = character.canvas;
        this.context    = character.context;
        this.img        = character.image;
        this.cycleLoop  = [0,1,2,3,4,5];                 // Frames de animación para caminar a la izquierda
        this.loopIndex  = 0;                             // Índice del frame actual en el ciclo
        this.frameCount = 0;                             // Contador para controlar la velocidad de la animación
        this.speed      = character.speed;

        this.init       = this.init.bind(this);          // Enlaza el contexto 'this' al método init
        this.update     = this.update.bind(this);        // Enlaza el contexto 'this' al método jump
    }

    init() 
    {
        this.loopIndex = 0;
        this.frameCount = 0;
    }

    update()
    {
       this.character.canvasX -= this.speed;                // Mueve el personaje a la izquierda

                                                        
        if (this.character.canvasX < 0)                     // Limitar el movimiento por el canvas
        {
            this.character.canvasX = 0;
        }
        
        this.frameCount++;
        if (this.frameCount >= 15)                          //regular animacion (fps = 15)
        {
            this.frameCount = 0;
            this.loopIndex = (this.loopIndex + 1) % this.cycleLoop.length;
        }

        
        flipView(                                           // Dibuja el frame actual del personaje, volteado horizontalmente
            this.cycleLoop[this.loopIndex], 1,              // 1 = 2da fila de imagenes
            this.character.canvasX,
            this.character.canvasY,
            this.context,
            this.img,
            this.character.width,
            this.character.height,
            this.character.scaledWidth,
            this.character.scaledHeight
        );
    }
}
class Jump 
{
    /**
     * @param {Character} character                         - La instancia del personaje.
     */
    constructor(character)
    {
        this.character      = character;
        this.canvas         = character.canvas;
        this.context        = character.context;
        this.img            = character.image;

        this.x              = character.canvasX;            // Posición X actual del salto
        this.y              = character.canvasY;            // Posición Y actual del salto
        
        this.cycleLoop      = [5, 5, 5, 5, 5, 5, 5, 5];     // Repetimos el índice 5
        this.loopIndex      = 0;
        this.frameCount     = 0;

        this.gravity        = 0.09;                         // gravedad para aplicar a los movimient0s
        this.velocityY      = -5;                           // Velocidad ascendente 
        this.velocityX      = 1;                            // Velocidad horizontal durante el salto

        this.init           = this.init.bind(this);
        this.update         = this.update.bind(this);       // Enlaza el contexto 'this' al método jump
    }

    
    init(direction = 0) 
    /**
        * 
        * @function init                                    - inicializa el salto del personaje.
        * @param {number} [direction=0]                     - Dirección horizontal del salto (1: derecha, -1: izquierda, 0: vertical).
    */
    {
        if (this.character.isJumping) return;               // Si ya está saltando, no inicia otro salto
        this.character.isJumping = true;                    

        
        this.x = this.character.canvasX;
        this.y = this.character.canvasY;                   // Establece las posiciones iniciales del salto a las del personaje

        this.velocityY = -5;                               // Velocidad inicial de salto 
        this.velocityX = 3 * direction;                    // Velocidad horizontal basada en la dirección

        // Inicia el bucle de animación del salto
        this.character.animationFrameId = requestAnimationFrame(this.update);
    }
    update() 
    {
        this.velocityY += this.gravity;                     // Aplica la gravedad a la velocidad vertical
        this.y += this.velocityY;                           // Actualiza la posición Y
        this.x += this.velocityX;                           // Actualiza la posición X

        this.character.canvasX = this.x;                    //coordenadas X actuales en el canvas para character
        this.character.canvasY = this.y;                    //coordenadas Y actuales en el canvas para character

        
        const maxX = this.canvas.width - this.character.scaledWidth;

        if (this.character.canvasX > maxX) 
        {
            this.character.canvasX = maxX;
        }
        if (this.character.canvasX < 0) 
        {
            this.character.canvasX = 0;
        }                                                   // Limita la posición X para que no se salga del canvas con el salto

        this.frameCount++;
        if (this.frameCount >= 1)
        {
            this.frameCount = 0;
            this.loopIndex = (this.loopIndex + 1) % this.cycleLoop.length;
        }

        const currentFrameX = this.cycleLoop[this.loopIndex];
        const currentFrameY = 0;

        if (this.velocityX < 0) 
        { 
            flipView(                                       // Si se mueve a la izquierda mientras salta flipea el sprite
                currentFrameX,
                currentFrameY,
                this.character.canvasX,
                this.character.canvasY,
                this.context,
                this.img,
                this.character.width,
                this.character.height,
                this.character.scaledWidth,
                this.character.scaledHeight
            );
        } else {                                            // Si se mueve a la derecha o no hay movimiento horizontal
            drawFrame(
                currentFrameX,
                currentFrameY,
                this.character.canvasX,
                this.character.canvasY,
                this.context,
                this.img,
                this.character.width,
                this.character.height,
                this.character.scaledWidth,
                this.character.scaledHeight
            );
        }
        
        const suelo = 640;                                  // Verificar si toca el suelo
        if (this.y >= suelo) 
        {
            console.log('Jump: Aterrizando.');
            this.y = suelo;                                 // Ajusta la posición al suelo
            this.velocityY = 0;                             // Velocidad vertical = 0
            this.character.canvasY = suelo;                 // Actualiza la posición Y del personaje
            this.character.isJumping = false;               // Anuncia que el personaje ya no está saltando

            this.character.setState('idle');                // Vuelve al estado 'idle'
            this.character.cancelAnimation();               // Cancela el bucle de animación del salto
            return;                                         // Detiene el bucle de requestAnimationFrame del salto
        }

        this.character.animationFrameId = requestAnimationFrame(this.update);
        /** 
         * Necesario usar esta linea porque Jump tiene su propia duracion y fisicas
         * Es autonoma y depende del tiempo
         * las acciones mas complejas manejan sus propios bucles y actualizaciones temporales 
        */

    }
}
class Stop 
{
    /**
     * @param {Character} character                         - La instancia del personaje.
     */
    constructor(character) {
        this.character    = character;
        this.canvas       = character.canvas;
        this.context      = character.context;
        this.img          = character.image;
        this.width        = character.width;
        this.height       = character.height;
        this.scaledWidth  = character.scaledWidth;
        this.scaledHeight = character.scaledHeight;
    }

    init() 
    { /* nada necesario que colocar */ }

    update()
    {
        drawFrame(
            0, 0,                                           // Si state = Stop(), dibuja 'idle'
            this.character.canvasX,
            this.character.canvasY,
            this.context,
            this.img,
            this.width,
            this.height,
            this.scaledWidth,
            this.scaledHeight
        );
    }
}