import { Character } from './js/character_animations.js';
import { Keyboard } from './js/character_controler.js';
import { SetupUI, InstanceManager } from './js/setup_UI.js';

let setupUI; 
let instanceManager; 

function gameLoop() {
    setupUI.context.clearRect(0, 0, setupUI.canvas.width, setupUI.canvas.height);
    
    const cityImage = instanceManager.loader.getImage('city');

    if (cityImage) {
        setupUI.context.drawImage(cityImage, 0, 0, setupUI.canvas.width, setupUI.canvas.height);
    }

    for (let i = 0; i < instanceManager.characters.length; i++) {
        let character = instanceManager.characters[i];
        if (character) {
            character.update();
            character.draw();
        }
    }
    requestAnimationFrame(gameLoop);
}

function handleLoad(event) {
    const payload = event.detail;
    if (payload && payload.size > 0) {
        console.log('Todas las imágenes cargadas con éxito:');
        for (const [key, value] of payload.entries()) {
            console.log(`- ${key}: ${value.src}`);
        }
        setupUI.isLoaded = true;
        console.log('Carga terminada: ', setupUI.isLoaded);

        setupUI.buttons.spawnBotButton.disabled = false;
        setupUI.buttons.spawnBotButton.innerText = 'Spawn Blue Bot';
        setupUI.buttons.spawnBotButton.addEventListener('click', spawnBot);

        gameLoop(); 
    } else {
        setupUI.isLoaded = false;
        console.error('Carga terminada: ', setupUI.isLoaded);
        setupUI.buttons.spawnBotButton.innerText = 'Error de Carga';
        setupUI.buttons.spawnBotButton.disabled = true;
    }
}

function loadResources() {
    instanceManager.loader.addEventListener('loaded', handleLoad);
    instanceManager.loader.loadImages(setupUI.images);
}

function spawnCharacter(imageKey) {
    if (setupUI.isLoaded) {
        let characterImage = instanceManager.loader.getImage(imageKey);

        if (characterImage) {
            let newCharacterId = instanceManager.nextCharacterId++;

            let newCharacter = new Character(characterImage, setupUI.canvas, setupUI.context);
            newCharacter.id = newCharacterId;

            instanceManager.characters.push(newCharacter);

            console.log(`Personaje ID ${newCharacter.id} (${imageKey}) instanciado y añadido al array.`);

            instanceManager.addToList(newCharacter); 

            if (instanceManager.characters.length === 1) {
                if (instanceManager.controller) {
                    instanceManager.controller.setControlledCharacter(newCharacter);
                    instanceManager.selectedCharacterId = newCharacter.id;
                    console.log(`Personaje ID ${newCharacter.id} automáticamente seleccionado y asignado al controlador.`);
                } else {
                    console.error("Error: El controlador 'instanceManager.controller' no ha sido inicializado aún.");
                }
            }
        } else {
            console.error(`La imagen '${imageKey}' no está disponible en el loader al intentar spawnear.`);
        }
    } else {
        console.warn('Recursos aún no cargados. No se puede spawnear el personaje.');
    }
}

function spawnBot() {
    spawnCharacter('blue_bot');
}

function main() {
    setupUI = new SetupUI(); 
    instanceManager = new InstanceManager(); 
    
    instanceManager.setupUI = setupUI; 

    instanceManager.controller = new Keyboard(); 
    setupUI.buttons.spawnBotButton.classList.add('bot_button');
    setupUI.buttons.spawnBotButton.id = 'spawn_button';
    setupUI.buttons.spawnBotButton.disabled = true;

    setupUI.canvas.id = 'canvas';
    setupUI.canvas.width = 1200;        
    setupUI.canvas.height = 800;    

    setupUI.charactersList = document.createElement('ul');
    setupUI.charactersList.id = 'spawnedCharactersList';
    setupUI.charactersList.classList.add('character-list');

    document.body.appendChild(setupUI.buttons.spawnBotButton);
    document.body.appendChild(setupUI.canvas);
    document.body.appendChild(setupUI.charactersList);

    setupUI.context = setupUI.canvas.getContext('2d');

    if (!setupUI.context) {
        console.error('main: ¡ERROR! No se pudo obtener el contexto 2D del canvas.');
        return;
    }

    loadResources();
}

window.onload = main;