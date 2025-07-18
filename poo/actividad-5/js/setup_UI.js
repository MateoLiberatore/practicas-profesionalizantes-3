import { Keyboard } from './character_controler.js';
import { ResourceLoader } from './resourceLoader.js';

export class SetupUI 
{
    constructor() 
    {
        this.isLoaded = false;
        this.images = 
        {
            'blue_bot': './css/static/images/magenta_bot.svg',
            'city': './css/static/backgrounds/city.jpg'
        };
        this.canvas = document.createElement('canvas');
        this.context = null;
        this.buttons = 
        {
            spawnBotButton: document.createElement('button'),
        };
        this.charactersList = null;
    }
    
}

export class InstanceManager 
{
    constructor() 
    {
        this.loader = new ResourceLoader();
        this.setupUI = new SetupUI();
        
        this.characters = [];       // new Character's
        this.controller = null;     // new Controller
        this.nextCharacterId = 1;
        this.selectedCharacterId = null;
    }

    characterSelection(event) 
    {
        if (event && event.stopPropagation) 
        {
            event.stopPropagation();
        }

        const clickedElement = event.currentTarget;
        const charId = parseInt(clickedElement.dataset.characterId);

        if (!isNaN(charId)) 
        {
            this.selectCharacter(charId);
        } 
        else 
        {
            console.warn("Error: No se pudo obtener el ID del personaje del elemento clickeado.");
        }
    }

    addToList(character) 
    {
        const listItem = document.createElement('li');
        listItem.classList.add('character-list-item');
        listItem.dataset.characterId = character.id;
        listItem.id = 'blue-button';

        const textSpan = document.createElement('span');
        textSpan.textContent = `Personaje ID: ${character.id}`;
        listItem.appendChild(textSpan);

        const selectButton = document.createElement('button');
        selectButton.textContent = 'Seleccionar';
        selectButton.classList.add('select-btn');
        selectButton.dataset.characterId = character.id;
        listItem.appendChild(selectButton);

        // Bind 'this' to the characterSelection method when adding the event listener
        selectButton.addEventListener('click', this.characterSelection.bind(this));
        listItem.addEventListener('click', this.characterSelection.bind(this));

        // Ensure charactersList is initialized before appending
        if (this.setupUI.charactersList) 
        {
            this.setupUI.charactersList.appendChild(listItem);
        } else 
        {
            console.error("Error: setupUI.charactersList is not initialized.");
        }
    }

    selectCharacter(charId) 
    {
        const foundCharacter = this.characters.find(function matchId(c) 
        {
            return c.id === charId;
        });

        if (foundCharacter)
        {
            this.selectedCharacterId = charId;

            if (this.controller) 
            {
                this.controller.setControlledCharacter(foundCharacter);
            } 
            else 
            {
                console.error("Error: El controlador 'this.controller' no ha sido inicializado al intentar seleccionar un personaje.");
                return;
            }

            console.log(`Controlador reasignado al Personaje ID: ${charId}`);

            this.updateHiglight();
        } 
        else 
        {
            console.warn(`Advertencia: No se encontró el personaje con ID: ${charId} para seleccionar.`);
        }
    }

    updateHiglight() 
    {
        if (this.setupUI.charactersList) 
        {
            const listItems = this.setupUI.charactersList.querySelectorAll('.character-list-item');

            listItems.forEach(function eachListItem(item) 
            {
                if (parseInt(item.dataset.characterId) === this.selectedCharacterId) 
                {
                    item.classList.add('selected');
                } 
                else 
                {
                    item.classList.remove('selected');
                }
            }.bind(this)); // Bind 'this' for the forEach callback
        }
    }
}