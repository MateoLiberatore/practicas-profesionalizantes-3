import { Character } from './js/character_animations.js';
import { Keyboard } from './js/character_controler.js';
import {addToList,instances, UIsetup} from './js/setup_UI.js'

function gameLoop()
{
    UIsetup.context.clearRect(0, 0, UIsetup.canvas.width, UIsetup.canvas.height);
    const cityImage = instances.loader.getImage('city');
    
    if (cityImage) 
    {
        UIsetup.context.drawImage(cityImage, 0, 0, UIsetup.canvas.width, UIsetup.canvas.height);
    }

    for (let i = 0; i < instances.characters.length; i++)
    {
        let character = instances.characters[i];
        if(character)
        {
            character.update();
        }
    }
    requestAnimationFrame(gameLoop);
}

function handleLoad(event)
{
     const payload = event.detail;
     if (payload  && payload.size > 0)
     {
         for (const [key, value] of payload.entries())
         {
             console.log('Imagen cargada con exito:', key, value);
         }
         UIsetup.isLoaded = true;
         console.log('Carga terminada: ', UIsetup.isLoaded);

         UIsetup.buttons.spawnBotButton.disabled = false;
         UIsetup.buttons.spawnBotButton.innerText = 'Spawn bot';
         UIsetup.buttons.spawnBotButton.addEventListener('click', spawnBot);

         gameLoop(); // <-- Única llamada inicial a gameLoop
     }
     else
     {
         UIsetup.isLoaded = false;
         console.error('Carga terminada: ', UIsetup.isLoaded);
         UIsetup.buttons.spawnBotButton.innerText = 'Error de Carga';
         UIsetup.buttons.spawnBotButton.disabled = true;
     }
}

function loadResources()
{
    instances.loader.addEventListener('loaded', handleLoad);
    instances.loader.loadImages(UIsetup.images);
}

function spawnCharacter(imageKey)
{
    if(UIsetup.isLoaded)
    {
        let characterImage = instances.loader.getImage(imageKey);

        if(characterImage)
        {
            let newCharacterId = instances.nextCharacterId++;

            let newCharacter = new Character(characterImage);
            newCharacter.id = newCharacterId;

            instances.characters.push(newCharacter);

            console.log(`Personaje ID ${newCharacter.id} (${imageKey}) instanciado y añadido al array.`);

            addToList(newCharacter);

            if (instances.characters.length === 1)
            {
                if (instances.controller) 
                {                                                                       // Aseguramos que el controlador global ya esté inicializado
                    instances.controller.setControlledCharacter(newCharacter);          // Llama al nuevo método del controlador
                    instances.selectedCharacterId = newCharacter.id;                    // Actualiza el ID seleccionado globalmente
                    console.log(`Personaje ID ${newCharacter.id} automáticamente seleccionado y asignado al controlador global.`);
                } 
                else 
                {
                    console.error("Error: El controlador global 'instances.controller' no ha sido inicializado aún.");
                }
            }
        }
        else
        {
            console.error(`La imagen '${imageKey}' no está disponible en el loader al intentar spawnear.`);
        }
    }
    else
    {
        console.warn('Recursos aún no cargados. No se puede spawnear el personaje.');
    }
}

function spawnBot()
{
    spawnCharacter('blue_bot')
}

function main()
{

    instances.controller = new Keyboard();

    UIsetup.buttons.spawnBotButton.innerText = 'Spawn bot';
    UIsetup.buttons.spawnBotButton.classList.add('bot_button');
    UIsetup.buttons.spawnBotButton.id = 'spawn_button';
    UIsetup.buttons.spawnBotButton.disabled = true;

    UIsetup.canvas.id = 'canvas';
    UIsetup.canvas.width = 1200;        
    UIsetup.canvas.height = 800;    

    UIsetup.charactersList = document.createElement('ul');
    UIsetup.charactersList.id = 'spawnedCharactersList';
    UIsetup.charactersList.classList.add('character-list');

    document.body.appendChild(UIsetup.buttons.spawnBotButton);
    document.body.appendChild(UIsetup.canvas);
    document.body.appendChild(UIsetup.charactersList);

    UIsetup.context = UIsetup.canvas.getContext('2d');

    if (!UIsetup.context)
    {
        console.error('main: ERROR! No se pudo obtener el contexto 2D del canvas.');
        return;
    }

    loadResources();
};

window.onload = main;