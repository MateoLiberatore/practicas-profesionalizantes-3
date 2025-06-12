export class Keyboard {
    
    constructor() 
    {
        this.character = null;

        this.keys = {
            left: false,
            right: false,
            jump: false
        };
        this.controlledCharacter = null;
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);

        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
        
    }
    setControlledCharacter(character) 
    {
        controlledCharacter = character;
        console.log(`Keyboard: Control asignado al Personaje ID: ${character ? character.id : 'ninguno'}`);
    
    }

    handleKeyDown(event) 
    { 
        if (!this.controlledCharacter) return;

        switch (event.code) 
        {
            case 'ArrowLeft':
                if (!this.keys.left) 
                {
                    this.keys.left = true;
                    if (!this.controlledCharacter.isJumping)
                    {
                        this.controlledCharacter.setState('walkingLeft');
                    }
                }
                break;
            case 'ArrowRight':
                if (!this.keys.right) 
                {
                    this.keys.right = true;
                    if (!this.controlledCharacter.isJumping)
                    {
                        this.controlledCharacter.setState('walkingRight');
                    }
                }
                break;
            case 'Space':
            case 'ArrowUp':
                if (!this.keys.jump && !this.controlledCharacter.isJumping)
                {
                    this.keys.jump = true;
                    this.controlledCharacter.setState('jumping', this.keys.right ? 1 : this.keys.left ? -1 : 0);
                }
                break;
            
            default:
                break;
        }
    }

    handleKeyUp(event) 
    {
        if (!this.controlledCharacter) return;

        switch (event.code) {
            case 'ArrowLeft':
                this.keys.left = false;
                if (!this.keys.right && !this.controlledCharacter.isJumping) 
                {
                    this.controlledCharacter.setState('idle');
                } 
                else if (this.keys.right && !this.controlledCharacter.isJumping) 
                {
                    this.controlledCharacter.setState('walkingRight');
                }
                break;

            case 'ArrowRight':
                this.keys.right = false;
                if (!this.keys.left && !this.controlledCharacter.isJumping) 
                {
                    this.controlledCharacter.setState('idle');
                } 
                else if (this.keys.left && !this.controlledCharacter.isJumping)
                {
                    this.controlledCharacter.setState('walkingLeft');
                }
                break;

            case 'Space':
            case 'ArrowUp':
                this.keys.jump = false;
                break;
        }
    }
}