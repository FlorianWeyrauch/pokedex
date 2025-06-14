let pokemonUrls = [];
let currentPokemonIndex = 0;
let offset = 0;
const limit = 20;


//global attributes
const content = document.getElementById("content");
const overlay = document.getElementById('overlay');

async function init() {
    await getPokemonUrl();
    await loadPokemon();
}

// Fetches all Pokémon URLs from the API and stores them in a global list
async function getPokemonUrl() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`);
    const data = await response.json();
    pokemonUrls = data.results;
}

// Fetches data from a single Pokémon URL
async function getPokemonData(url) {
    const response = await fetch(url);
    return response.json();
}

// Loads a batch of Pokémon data (20 at a time) based on the current index range
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

// Handles loading and displaying the next set of Pokémon cards
async function loadPokemon() {
    toggleLoadingSpinner();
    try {
        const newData = await loadCurrentPokemon(offset, offset + limit);
        showPokemon(newData);
        offset += limit;
    } catch (error) {
        console.log(error);
        content.innerHTML = "An error occurred while loading Pokémon: " + error;
    }
    toggleLoadingSpinner();
}

// Displays a list of Pokémon cards on the page
function showPokemon(pokemonData) {
    for (let i = 0; i < pokemonData.length; i++) {
        const pokemon = pokemonData[i];
        const card = createPokemonCard(pokemon)
        content.appendChild(card);
        showPokemonType(pokemon);
    };
}

// Displays the type(s) of a given Pokémon in its card
function showPokemonType(pokemon) {
    let typeContent = document.getElementById('card_type_' + pokemon.id);
    pokemon.types.forEach(element => {
        typeContent.innerHTML += templatePokemonType(element);
    });
}

// Opens an overlay with detailed information about the selected Pokémon
function openOverlay(pokemon) {
    document.body.classList.add('scroll_none');
    overlay.classList.remove('d-none');
    overlay.innerHTML = templatePokemonOverlay(pokemon);
    showPokemonBaseStats(pokemon);
    currentPokemonIndex = pokemonUrls.findIndex(p => p.name === pokemon.name);
}

// Overlay Navigation
// 
async function navigatePokemon(direction) {
    currentPokemonIndex += direction;
    if (currentPokemonIndex < 0) {
        currentPokemonIndex = 0;
    }
    if (currentPokemonIndex >= pokemonUrls.length) {
        currentPokemonIndex = pokemonUrls.length - 1;
    }
    const pokemon = await getPokemonData(pokemonUrls[currentPokemonIndex].url);
    openOverlay(pokemon);
}

// Closes the Pokémon details overlay
// Check id 
function closeOverlay(event, index) {
    if (event.target.id === 'overlay') {
        overlay.classList.add('d-none');
        document.body.classList.remove("scroll_none");
    }
    if (event.target.id === ('overlay_close_btn_' + index)) {
        overlay.classList.add('d-none');
        document.body.classList.remove("scroll_none");
    }
}

// Displays the about section of the selected Pokémon in the overlay
function showPokemonAbout(pokemon) {
    let pokemonDescription = document.getElementById('pokemon-description-content');
    pokemonDescription.innerHTML = templateAboutPokemon(pokemon);
}

function showPokemonBaseStats(pokemon) {
    let descriptionContent = document.getElementById('pokemon-description-content');
    let baseStatsData = pokemon.stats;
    for (let i = 0; i < baseStatsData.length; i++) {
        descriptionContent.innerHTML += templateBaseStats(baseStatsData[i])
    }
}

async function searchPokemon() {
    const inputData = getInput();
    if (inputData === "") {
        content.innerHTML = "";
        offset = 0;
        await loadPokemon();
        toggleLoadBtn();
        return;
    }
    if (inputData.length <= 3) {
        return;
    }
    const filteredPokemon = pokemonUrls.filter(pokemon =>
        pokemon.name.toLowerCase().startsWith(inputData)
    );
    content.innerHTML = "";
    toggleLoadingSpinner();
    for (let i = 0; i < filteredPokemon.length; i++) {
        const pokemon = filteredPokemon[i];
        try {
            toggleLoadBtn();
            const data = await getPokemonData(pokemon.url);
            const card = createPokemonCard(data);
            content.appendChild(card);
            showPokemonType(data);
        } catch (error) {
            console.error("Fehler beim Laden eines Pokémon:", error);
        }
    }
    toggleLoadingSpinner();
}


// gets the name of the entered pokemon
function getInput() {
    const input = document.getElementById("search_input");
    return input.value.toLowerCase().trim();
}

//create the pokemon card
function createPokemonCard(data) {
    const card = document.createElement("div");
    const mainType = data.types[0].type.name;
    card.className = `pokemon-card ${mainType}`;
    card.onclick = () => openOverlay(data);
    card.innerHTML = templatePokemonCard(data);
    return card;
}
