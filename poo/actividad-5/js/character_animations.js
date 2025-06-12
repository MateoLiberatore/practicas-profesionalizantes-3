import { drawFrame, flipView } from "./draw.js";
import { setupCanvas, setupContext} from "./character_setup.js";


export class Character
{
    constructor(img)
    {
        this.canvas  = setupCanvas();
        this.context = setupContext(this.canvas);

        this.image   = img
        this.canvasX = 500;     //pos. de dibujo inicial
        this.canvasY = 640;     //pos. de dibujo inicial
        this.groundY = 640;
        this.speed   = 2;

        this.scale  = 6;
        this.width  = 32;
        this.height = 32;

        this.scaledWidth  = this.scale * this.width;
        this.scaledHeight = this.scale * this.height;

        this.rightStepAction = new RightStep(this);
        this.leftStepAction  = new LeftStep(this);
        this.jumpAction      = new Jump(this);
        this.stopAction      = new Stop(this);

        this.states = 
        {
            'walkingRight': this.rightStepAction,
            'walkingLeft':  this.leftStepAction,
            'jumping':      this.jumpAction,
            'idle':         this.stopAction,
        };

        this.currentState = 'idle';
        this.currentAction = this.states[this.currentState];
        this.characterDirection = null;
    }

    setState(newState, direction = 0)
    {
        // Esta verificación evita que se inicie un nuevo salto si ya está en uno.
        // Es buena práctica y ya la tenías en tu código original.
        if (this.isJumping && newState === 'jumping') {
            return;
        }

        this.currentState = newState;

        switch (newState)
        {
            case 'walkingRight':
                this.currentAction = this.rightStepAction;
                break;

            case 'walkingLeft':
                this.currentAction = this.leftStepAction;
                break;

            case 'jumping':
                this.currentAction = this.jumpAction;
                this.jumpAction.init(direction);
                break;

            case 'idle':
                this.currentAction = this.stopAction;
                this.cancelAnimation();
                break;
                
            default:
                console.warn(`setState: Estado desconocido: ${newState}`);
                this.currentAction = this.stopAction;
        }

        // Inicia la acción si no es 'jumping', ya que 'jumping' se inicia a sí mismo
        if (this.currentAction && this.currentAction.init && newState !== 'jumping')
        {
            this.currentAction.init();
        }
    }
    cancelAnimation()
    {
        if (this.animationFrameId !== null)
        {
            window.cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }
    update()
    {
        this.currentAction.update(); // Primero, actualiza el estado interno de la acción (posición, frame de animación)
        this.draw();                 // Luego, dibuja el personaje usando los datos actualizados
    }
    draw()
    {
        const currentFrameX = this.loopIndex;
        const currentFrameY = this.frameY; // Usar el frameY del Character (que fue actualizado por la acción)

        if (this.characterDirection === 'left')
        {
            flipView(   currentFrameX,      currentFrameY,
                        this.canvasX,       this.canvasY,
                        this.context,       this.image,
                        this.width,         this.height,
                        this.scaledWidth,   this.scaledHeight   );
        } 
        else 
        {
            drawFrame(  currentFrameX,      currentFrameY,
                        this.canvasX,       this.canvasY,
                        this.context,       this.image,
                        this.width,         this.height,
                        this.scaledWidth,   this.scaledHeight   );
        }
    }
}

class RightStep
{
    constructor(character)
    {
        this.character    = character;
        this.cycleLoop    = [0,1,2,3,4,5];
        this.loopIndex    = 0;
        this.frameY       = 1;
        this.frameCount   = 0;
    }

    init()
    {
        this.loopIndex = 0;
        this.character.characterDirection = 'right';
    }

    update()
    {
        this.character.canvasX += this.character.speed;

        if (this.character.canvasX > this.character.canvas.width - this.character.scaledWidth) 
        {
            this.character.canvasX = this.character.canvas.width - this.character.scaledWidth;
        }

        this.frameCount++;
        if (this.frameCount >= 15) 
        {
            this.frameCount = 0;
            this.loopIndex = (this.loopIndex + 1) % this.cycleLoop.length;
        }
        this.character.loopIndex = this.cycleLoop[this.loopIndex];
        this.character.frameY = this.frameY;
    }
}

class LeftStep
{
    constructor(character)
    {
        this.character    = character;
        this.cycleLoop    = [0,1,2,3,4,5];
        this.loopIndex    = 0;
        this.frameCount   = 0;
        this.frameY       = 1;
    }

    init()
    {
        this.loopIndex = 0;
        this.character.characterDirection = 'left';
    }

    update()
    {
        this.character.canvasX -= this.character.speed;

        if (this.character.canvasX < 0) {
            this.character.canvasX = 0;
        }

        this.frameCount++;
        if (this.frameCount >= 15) {
            this.frameCount = 0;
            this.loopIndex = (this.loopIndex + 1) % this.cycleLoop.length;
        }
        this.character.loopIndex = this.cycleLoop[this.loopIndex];
        this.character.frameY = this.frameY;
    }
}

class Jump 
{
    /**
     * @param       {Character} character - La instancia del personaje.
     * @property    {canvas}    canvas
     */
    constructor(character)
    {
        this.character      = character;
        this.canvas         = character.canvas;
        this.context        = character.context;
        this.img            = character.image;

        this.x              = character.canvasX;                        // Posición X actual del salto
        this.y              = character.canvasY;                        // Posición Y actual del salto
        
        this.cycleLoop      = [5];                                      // Repetimos el índice 5
        this.loopIndex      = 0;
        this.frameCount     = 0;
        this.frameY         = 0;                                        // fila para la animacion de salto

        this.gravity                    = 0.08;                         // gravedad para aplicar a los movimient0s
        this.initialJumpVelocity        = -4.5;                         // Ajusta este valor para una altura de salto mayor/menor

        this.velocityY      = 0;                                        // Velocidad ascendente 
        this.velocityX      = 0;                                        // Velocidad horizontal durante el salto
        this.jumpDirection  = 0;                                        // -1 para izquierda, 0 para arriba, 1 para derecha
        
        this.init           = this.init.bind(this);
        this.update         = this.update.bind(this);                   // Enlaza el contexto 'this' al método jump
    }

    
    init(jumpDirection) 
    { 
        this.character.isJumping = true;
        this.character.velocityY = this.initialJumpVelocity;            // Usa la velocidad inicial definida en el constructor
        this.jumpDirection = jumpDirection;                             // direccion del salto

        this.character.frameY = this.frameY;                            // fila delsprite
        this.character.loopIndex = this.cycleLoop;                      // frame del salto
    }
    update() 
    {
        this.character.canvasY += this.character.velocityY;             // -7 + 0.15 = -6.85 ... -6.85 + 0.15 = -6.7 ...
        this.character.velocityY += this.gravity;                       // hasta que se vuelve positivo ej: de (-7) a 7
                                                                        // asi se emula una parabola
                     
        if (this.jumpDirection === 1)                                   // Mover horizontalmente durante el salto
        {
            this.character.canvasX += this.character.speed;
            this.character.characterDirection = 'right';
        } 
        else if (this.jumpDirection === -1) 
        {
            this.character.canvasX -= this.character.speed;
            this.character.characterDirection = 'left';
        }

        if (this.character.canvasX < 0)                                 // Limitar la posición horizontal
        {
            this.character.canvasX = 0;
        } 
        else if (this.character.canvasX > this.character.canvas.width - this.character.scaledWidth) 
        {
            this.character.canvasX = this.character.canvas.width - this.character.scaledWidth;
        }

        // Aterrizaje
        if (this.character.canvasY >= this.character.groundY) 
        {
            this.character.canvasY = this.character.groundY;
            this.character.isJumping = false;
            this.character.velocityY = 0;
            this.character.setState('idle');                    // Vuelve al estado 'idle'
            this.character.cancelAnimation();                   // Cancela el bucle de animación del salto
            return;
        }
    }
}

class Stop
{
    constructor(character) {
        this.character    = character;
        this.canvas       = character.canvas;
        this.context      = character.context;
        this.img          = character.image;
        this.width        = character.width;
        this.height       = character.height;
        this.scaledWidth  = character.scaledWidth;
        this.scaledHeight = character.scaledHeight;

        this.loopIndex = 0;
        this.frameCount = 0;
        this.frameY = 0;
    }

    init()
    {
        this.loopIndex = 0;
        this.frameCount = 0;
        this.character.characterDirection = 'right';
    }

    update()
    {
       this.loopIndex = 0;
       this.frameCount = 0;
       this.character.loopIndex = this.loopIndex;
       this.character.frameY = this.frameY;
    }
}