let pokemonUrls = [];
let currentPokemonIndex = 0;
let offset = 0;
const limit = 20;

// Global DOM elements
const content = document.getElementById("content");
const overlay = document.getElementById('overlay');

// Initializes the app: loads all Pokémon URLs and loads the first batch
async function init() {
    await getPokemonUrl();
    await loadPokemon();
}

// Fetches all available Pokémon URLs from the API and stores them in a global list
async function getPokemonUrl() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`);
    const data = await response.json();
    pokemonUrls = data.results;
}

// Fetches detailed data from a specific Pokémon URL
async function getPokemonData(url) {
    const response = await fetch(url);
    return response.json();
}

// Loads a batch of Pokémon data (default: 20) starting from a given index
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

// Loads the next group of Pokémon and displays them
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

// Renders a list of Pokémon cards onto the page
function showPokemon(pokemonData) {
    for (let i = 0; i < pokemonData.length; i++) {
        const pokemon = pokemonData[i];
        const card = createPokemonCard(pokemon);
        content.appendChild(card);
        showPokemonType(pokemon);
    };
}

// Displays the type(s) of a Pokémon inside its card
function showPokemonType(pokemon) {
    let typeContent = document.getElementById('card_type_' + pokemon.id);
    pokemon.types.forEach(element => {
        typeContent.innerHTML += templatePokemonType(element);
    });
}


// Opens the overlay and displays the "About" section for a Pokémon by its ID
async function openOverlayAboutById(id) {
    const pokemon = await getPokemonData(pokemonUrls.find(p => p.url.includes(`/${id}/`)).url);
    openOverlayAbout(pokemon);
}

// Opens the overlay and displays the "Base Stats" section for a Pokémon by its ID
async function openOverlayBaseStatsById(id) {
    const pokemon = await getPokemonData(pokemonUrls.find(p => p.url.includes(`/${id}/`)).url);
    openOverlayBaseStats(pokemon);
}

// Opens an overlay window with detailed Pokémon info (base stats view)
function openOverlayBaseStats(pokemon) {
    document.body.classList.add('scroll_none');
    overlay.classList.remove('d-none');
    overlay.innerHTML = templatePokemonOverlay(pokemon);
    showPokemonBaseStats(pokemon);
    showStatsBg();
    currentPokemonIndex = pokemonUrls.findIndex(p => p.name === pokemon.name);
}

// Opens an overlay window with detailed Pokémon info (about section view)
function openOverlayAbout(pokemon) {
    document.body.classList.add('scroll_none');
    overlay.classList.remove('d-none');
    overlay.innerHTML = templatePokemonOverlay(pokemon);
    showPokemonAbout(pokemon);
    showAboutBg();
    currentPokemonIndex = pokemonUrls.findIndex(p => p.name === pokemon.name);
}

// Navigates through Pokémon in the overlay (next or previous)
async function navigatePokemon(direction) {
    currentPokemonIndex += direction;
    if (currentPokemonIndex < 0) currentPokemonIndex = 0;
    if (currentPokemonIndex >= pokemonUrls.length) currentPokemonIndex = pokemonUrls.length - 1;

    const pokemon = await getPokemonData(pokemonUrls[currentPokemonIndex].url);
    toggleLoadingSpinner();
    openOverlayAbout(pokemon);
    toggleLoadingSpinner();
}

// Closes the overlay if the user clicks the background or close button
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

//############# About-Section ###############
// Displays the "About" section in the Pokémon overlay
function showPokemonAbout(pokemon) {
    let pokemonDescription = document.getElementById('pokemon-description-content');
    pokemonDescription.innerHTML = templateAboutPokemon(pokemon);
    pokemonAboutType(pokemon);
    pokemonAboutAbility(pokemon);
}

// Shows the type(s) of a Pokémon in the overlay
function pokemonAboutType(pokemon) {
    let overlayType = document.getElementById("overlay_typ_" + pokemon.id);
    for (let i = 0; i < pokemon.types.length; i++) {
        let element = pokemon.types[i];
        overlayType.innerHTML += templatePokemonOverlayType(element);
        if (i < pokemon.types.length - 1) {
            overlayType.innerHTML += ", ";
        }
    }
}

// Shows the ability/abilities of a Pokémon in the overlay
function pokemonAboutAbility(pokemon) {
    let overlayAbility = document.getElementById("overlay_ability_" + pokemon.id);
    for (let i = 0; i < pokemon.abilities.length; i++) {
        let element = pokemon.abilities[i].ability.name;
        overlayAbility.innerHTML += templatePokemonOverlayAbility(element);
        if (i < pokemon.abilities.length - 1) {
            overlayAbility.innerHTML += ", ";
        }
    }
}
//###################################################

// Displays base stats of the Pokémon in the overlay
function showPokemonBaseStats(pokemon) {
    let descriptionContent = document.getElementById('pokemon-description-content');
    let baseStatsData = pokemon.stats;
    for (let i = 0; i < baseStatsData.length; i++) {
        descriptionContent.innerHTML += templateBaseStats(baseStatsData[i]);
    }
}

// Handles user search input for Pokémon
async function searchPokemon() {
    const inputData = getInput().toLowerCase();

    if (shouldResetSearch(inputData)) {
        await resetSearch();
        return;
    }

    if (inputData.length <= 2) return;

    const filtered = filterPokemon(inputData);
    await displayFilteredPokemon(filtered);
}

// Returns true if the search input is empty
function shouldResetSearch(input) {
    return input === "";
}

// Resets the search state and reloads the Pokémon list
async function resetSearch() {
    content.innerHTML = "";
    offset = 0;
    await loadPokemon();
    showLoadBtn();
}

// Filters Pokémon names that start with the given query
function filterPokemon(query) {
    return pokemonUrls.filter(p =>
        p.name.toLowerCase().startsWith(query)
    );
}

// Displays the search result Pokémon
async function displayFilteredPokemon(filtered) {
    content.innerHTML = "";
    removeLoadBtn();
    toggleLoadingSpinner();

    for (let i = 0; i < filtered.length; i++) {
        await renderPokemonCard(filtered[i].url);
    }

    toggleLoadingSpinner();
}

// Fetches and renders a single Pokémon card
async function renderPokemonCard(url) {
    try {
        const data = await getPokemonData(url);
        const card = createPokemonCard(data);
        content.appendChild(card);
        showPokemonType(data);
    } catch (err) {
        console.error(err);
    }
}

// Gets the user's input value from the search input field
function getInput() {
    const input = document.getElementById("search_input");
    return input.value.toLowerCase().trim();
}

// Creates the DOM element for a Pokémon card
function createPokemonCard(data) {
    const card = document.createElement("div");
    const mainType = data.types[0].type.name;
    card.className = `pokemon-card ${mainType}`;
    card.onclick = () => openOverlayAbout(data);
    card.innerHTML = templatePokemonCard(data);
    return card;
}
