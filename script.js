let pokemonUrls = [];
let offset = 0;
const limit = 20;

async function init() {
    await getPokemonUrl();
    console.log(pokemonUrls);
    await loadPokemon();
}

//holt sich die gesamten pokemonUrls aus der Api und speichert diese in einer globalen Liste ab
async function getPokemonUrl() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`);
    const data = await response.json();
    pokemonUrls = data.results;
}

//holt sich die daten aus der url der einzelnen Pokemon 
//immer nur 20 Stueck
async function getPokemonData(url) {
    const response = await fetch(url);
    return response.json();
}

// läd die ersten 20 Pokemon und gibt die geladen daten als liste zurück
async function loadCurrentPokemon(startIndex, endIndex) {
    const datas = [];
    const slice = pokemonUrls.slice(startIndex, endIndex);

    for (let i = 0; i < slice.length; i++) {
        try {
            const data = await getPokemonData(slice[i].url);
            datas.push(data);
        } catch (err) {
            console.error(err);
        }
    }
    console.log(datas);

    return datas;
}

async function loadPokemon() {
    let listContainer = document.getElementById("content");
    toggleLoadingSpinner();
    try {
        const newData = await loadCurrentPokemon(offset, offset + limit);
        showPokemon(newData);
        offset += limit;
    } catch (error) {
        console.log(error);
        listContainer.innerHTML = "Das ist ein Fehler unterlaufen: " + error;
    }
    toggleLoadingSpinner();
}

function showPokemon(pokemonData) {
    let listContainer = document.getElementById("content");
    for (let i = 0; i < pokemonData.length; i++) {
        const pokemon = pokemonData[i];
        const mainType = pokemon.types[0].type.name;
        const card = document.createElement('div');
        card.className = `pokemon-card ${mainType}`;
        card.onclick = () => openOverlay(pokemon);
        card.innerHTML = templatePokemonCard(pokemon);
        listContainer.appendChild(card);
        showPokemonType(pokemon);
    }
}


function showPokemonType(pokemon) {
    let typeContent = document.getElementById("card_type_" + pokemon.id);
    pokemon.types.forEach(element => {
        typeContent.innerHTML += `<span class="pokemon-type ${element.type.name}">${capitalizeFirstLetter(element.type.name)}</span> `;
    });
}

function openOverlay(pokemon) {
    let singlePokemonOverlay = document.getElementById('overlay');
    singlePokemonOverlay.classList.remove('d-none');
    singlePokemonOverlay.innerHTML = "";
    singlePokemonOverlay.innerHTML = templatePokemonOverlay(pokemon);
}

function closeOverlay() {
    let singlePokemonOverlay = document.getElementById('overlay');
    singlePokemonOverlay.classList.add('d-none');
}

function showPokemonAbout(pokemon) {
    let pokemonDescription = document.getElementById('pokemon-description-content');
    pokemonDescription.innerHTML = "";
    pokemonDescription.innerHTML = templateAboutPokemon(pokemon);
}