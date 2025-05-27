let pokemonUrls = [];
let currentPokemonIndex = 0;
let offset = 0;
const limit = 20;

async function init() {
    await getPokemonUrl();
    console.log(pokemonUrls);
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
    let listContainer = document.getElementById('content');
    toggleLoadingSpinner();
    try {
        const newData = await loadCurrentPokemon(offset, offset + limit);
        showPokemon(newData);
        offset += limit;
    } catch (error) {
        console.log(error);
        listContainer.innerHTML = "An error occurred while loading Pokémon: " + error;
    }
    toggleLoadingSpinner();
}

// Displays a list of Pokémon cards on the page
function showPokemon(pokemonData) {
    let listContainer = document.getElementById('content');
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

// Displays the type(s) of a given Pokémon in its card
function showPokemonType(pokemon) {
    let typeContent = document.getElementById('card_type_' + pokemon.id);
    pokemon.types.forEach(element => {
        typeContent.innerHTML += `<span class="pokemon-type ${element.type.name}">${capitalizeFirstLetter(element.type.name)}</span> `;
    });
}

// Opens an overlay with detailed information about the selected Pokémon
function openOverlay(pokemon) {
    document.body.classList.add('scroll_none');
    let singlePokemonOverlay = document.getElementById('overlay');
    singlePokemonOverlay.classList.remove('d-none');
    singlePokemonOverlay.innerHTML = templatePokemonOverlay(pokemon);
    showPokemonBaseStats(pokemon);
    currentPokemonIndex = pokemonUrls.findIndex(p => p.name === pokemon.name);
    console.log(currentPokemonIndex);
}

// Overlay Navigation
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
        let singlePokemonOverlay = document.getElementById('overlay');
        singlePokemonOverlay.classList.add('d-none');
        document.body.classList.remove("scroll_none");
    }
    if (event.target.id === ('overlay_close_btn_' + index)) {
        let singlePokemonOverlay = document.getElementById('overlay');
        singlePokemonOverlay.classList.add('d-none');
        document.body.classList.remove("scroll_none");
    }
}

// Displays the about section of the selected Pokémon in the overlay
function showPokemonAbout(pokemon) {
    let pokemonDescription = document.getElementById('pokemon-description-content');
    pokemonDescription.innerHTML = templateAboutPokemon(pokemon);
}

function showPokemonBaseStats(pokemon) {
    let content = document.getElementById('pokemon-description-content');
    let baseStatsData = pokemon.stats;
    for (let i = 0; i < baseStatsData.length; i++) {
        content.innerHTML += templateBaseStats(baseStatsData[i])
    }
}

async function searchPokemon() {
    const input = document.getElementById("search_input");
    const inputData = input.value.toLowerCase().trim();
    const listContainer = document.getElementById('content');

    if (inputData === "") {
        listContainer.innerHTML = "";
        offset = 0;
        await loadPokemon();
        return;
    }

    if (inputData.length <= 3) {
        return;
    }

    const filteredPokemon = pokemonUrls.filter(pokemon =>
        pokemon.name.toLowerCase().startsWith(inputData)
    );

    listContainer.innerHTML = "";

    toggleLoadingSpinner();

    for (let i = 0; i < filteredPokemon.length; i++) {
        const pokemon = filteredPokemon[i];
        try {
            const data = await getPokemonData(pokemon.url);
            const card = document.createElement("div");
            const mainType = data.types[0].type.name;
            card.className = `pokemon-card ${mainType}`;
            card.onclick = () => openOverlay(data);
            card.innerHTML = templatePokemonCard(data);
            listContainer.appendChild(card);
            showPokemonType(data);
        } catch (error) {
            console.error("Fehler beim Laden eines Pokémon:", error);
        }
    }

    toggleLoadingSpinner();
}




