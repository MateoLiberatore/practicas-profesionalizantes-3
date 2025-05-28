export class Keyboard {
    constructor(character) 
    {
        this.character = character;

        this.keys = {
            left: false,
            right: false,
            jump: false
        };

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);

        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
    }

    handleKeyDown(event) {
        switch (event.code) {
            case 'ArrowLeft':
                if (!this.keys.left) {
                    this.keys.left = true;
                    this.character.setState('walkingLeft');
                }
                break;
            case 'ArrowRight':
                if (!this.keys.right) {
                    this.keys.right = true;
                    this.character.setState('walkingRight');
                }
                break;
            case 'Space':
            case 'ArrowUp':
                if (!this.keys.jump) {
                    this.keys.jump = true;
                    this.character.setState('jumping', this.keys.right ? 1 : this.keys.left ? -1 : 0);
                }
                break;
            
            default:
                break;
        }
    }

    handleKeyUp(event) 
    {
        switch (event.code) 
        {
            case 'ArrowLeft':
                this.keys.left = false;
                if (!this.keys.right) 
                    {
                    this.character.setState('idle');
                } 
                else 
                {
                    this.character.setState('walkingRight');
                }
                break;

            case 'ArrowRight':
                this.keys.right = false;
                if (!this.keys.left) 
                {
                    this.character.setState('idle');
                } 
                else 
                {
                    this.character.setState('walkingLeft');
                }
                break;

            case 'Space':
            case 'ArrowUp':
                this.keys.jump = false;
                break;
        }
    }
}
