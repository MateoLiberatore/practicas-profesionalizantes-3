import { Keyboard } from './character_controler.js';
import { ResourceLoader } from './resourceLoader.js';

export let instances =
{
    loader : new ResourceLoader(),
    characters : [],
    controller : null,
    nextCharacterId : 1,
    selectedCharacterId : null
}

export let UIsetup = 
{
    isLoaded: false,
    images : 
    {
        'blue_bot': './css/static/images/blue_robot_vector.svg',
        'city' : './css/static/backgrounds/city.jpg'
    },
    canvas: document.createElement('canvas'),
    context : null,
    buttons : 
    {
        spawnBotButton : document.createElement('button'),
        //spawnKnightButton : document.childElement('button'),
        //spawnReaperButton : documetn.childElement('button')
    },
    charactersList : null
}

export function characterSelection(event) 
{
    if (event && event.stopPropagation) 
    {
        event.stopPropagation();                                // evita que todos los eventos 'click' escuchen esta accion
    }                                                           // evita comportamientos duplicados, solo se procesa donde sucede el evento                      

    const clickedElement = event.currentTarget;                 // elemento al que se le asocio el listener de eventos
    const charId = parseInt(clickedElement.dataset.characterId);// id del personaje

    if (!isNaN(charId)) 
    {
        selectCharacter(charId); //selecciona
    } 
    else 
    {
        console.warn("Error: No se pudo obtener el ID del personaje del elemento clickeado.");
    }
}


export function addToList(character) 
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

    selectButton.addEventListener('click', characterSelection);

    listItem.addEventListener('click', characterSelection);
    
    UIsetup.charactersList.appendChild(listItem);
}


export function selectCharacter(charId) 
{
    function matchId(c)
    {
        return c.id === charId;
    }
    const foundCharacter = instances.characters.find(matchId);

    if (foundCharacter) 
    {
        instances.selectedCharacterId = charId;                             // Actualiza el ID del personaje actualmente seleccionado.
        
        if (instances.controller) 
        { // Aseguramos que el controlador global ya esté inicializado
            instances.controller.setControlledCharacter(foundCharacter);    // Llamamos al nuevo método
        } 
        else 
        {
            console.error("Error: El controlador global 'instances.controller' no ha sido inicializado al intentar seleccionar un personaje.");
            return; // No se puede seleccionar si no hay controlador
        }

        console.log(`Controlador reasignado al Personaje ID: ${charId}`);

        updateHiglight();                                                   // Actualiza el resaltado visual en la lista del DOM.
    } 
    else 
    {
        console.warn(`Advertencia: No se encontró el personaje con ID: ${charId} para seleccionar.`);
    }
}


export function updateHiglight() 
{
    function eachListItem(item)
    {
        if (parseInt(item.dataset.characterId) === instances.selectedCharacterId)
        {     
            item.classList.add('selected');
        }
        else
        {
            item.classList.remove('selected');
        }
    }

    if (UIsetup.charactersList) 
    {
        const listItems = UIsetup.charactersList.querySelectorAll('.character-list-item');
        listItems.forEach(eachListItem);
    }
}