let pokemonUrls = [];
let offset = 0;
const limit = 20;

async function init() {
    await getPokemonUrl();
    console.log(pokemonUrls);
    await loadPokemon();
}

const typeColors = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD'
};



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
    return datas;
}

async function loadPokemon() {
    toggleLoadingSpinner();
    const newData = await loadCurrentPokemon(offset, offset + limit);
    showPokemon(newData);
    offset += limit;
    toggleLoadingSpinner();
}

function showPokemon(pokemonData) {
    let listContainer = document.getElementById("content");

    for (let i = 0; i < pokemonData.length; i++) {
        const pokemon = pokemonData[i];
        const mainType = pokemon.types[0].type.name;
        const bgColor = typeColors[mainType];

        const card = document.createElement('div');
        card.className = 'pokemon-card';
        card.style.backgroundColor = bgColor;
        card.innerHTML = templatePokemonCard(pokemon);
        listContainer.appendChild(card);

        showPokemonType(pokemon);
    }
}


function showPokemonType(pokemon) {
    let typeContent = document.getElementById("card_type_" + pokemon.id);
    pokemon.types.forEach(element => {
        typeContent.innerHTML += `<span class="pokemon-type">${capitalizeFirstLetter(element.type.name)}</span> `;
    });
}

