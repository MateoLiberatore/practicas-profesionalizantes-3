import { Character } from './js/character_animations.js';
import { Keyboard } from './js/character_controler.js';

window.addEventListener('DOMContentLoaded' , function () 
    {
        let character = new Character("./sprites/robots/blue_robot_vector.svg");
        let controller = new Keyboard(character);

        function gameLoop()
        {  
            character.update();
            requestAnimationFrame(gameLoop);
        }
        gameLoop();
    });