function templatePokemonCard(pokemon) {
    const pokemonImg = pokemon.sprites.other.home.front_default;
    return `
        <div class="card-header d-flex-sa">
            <p><b>${capitalizeFirstLetter(pokemon.name)}</b></p>
            <p>#${pokemon.id}</p>
        </div>
        <div class="d-flex-sb">
            <div class="card-type d-flex-c-fd-c" id="card_type_${pokemon.id}"></div>
            <img src="${pokemonImg}" alt="${pokemon.name}">
        </div>
    `;
}

function templatePokemonOverlay(pokemon) {
    const pokemonImg = pokemon.sprites.other.home.front_default;
    const firstPokemontype = pokemon.types[0].type.name;
    return `
        <div class="nav-button-desktop d-flex-c" onclick="navigatePokemon(-1)">&#9664;</div>
        <div class="pokemon-overlay-card d-flex-fd-c ${firstPokemontype}">
            <div class="pokemon-title w100 d-flex-sb">
                <p class="fs-b"># ${pokemon.id}</p>
                <span id="overlay_close_btn_${pokemon.id}" class="overlay-close-btn" onclick="closeOverlay(event, ${pokemon.id})">X</span>
            </div>
            <img src="${pokemonImg}" alt="${pokemon.name}">
            <div class="pokemon-overlay-data">
                <div class="w100 d-flex-sa pokemon-overlay-description">
                    <div onclick="" class="w50 d-flex-c" id="about">About</div>
                    <div onclick="" class="w50 d-flex-c" id="stats">Base Stats</div>
                </div>
                <div class="pokemon-overlay-content d-flex-c-fd-c" id="pokemon-description-content">
                </div>
            </div>
        </div>
        <div class="overlay-navigation w100">
            <div class="nav-button-mobile d-flex-c" onclick="navigatePokemon(-1)">&#9664;</div>
            <div class="nav-button-mobile d-flex-c" onclick="navigatePokemon(1)">&#9654;</div>
        </div>
        <div class="nav-button-desktop d-flex-c" onclick="navigatePokemon(1)">&#9654;</div>
    `;
}

function templatePokemonType(pokemon) {
    return `<span class="pokemon-type ${pokemon.type.name}">${capitalizeFirstLetter(pokemon.type.name)}</span> `;
}

function templatePokemonOverlayType(pokemon) {
    return `<span>${capitalizeFirstLetter(pokemon.type.name)}</span> `;
}

function templatePokemonOverlayAbility(pokemon) {
    return `<span>${capitalizeFirstLetter(pokemon)}</span> `;
}

function templateAboutPokemon(pokemon) {
    let sound = pokemon.cries.latest
    return `
            <table id="about_table">
                <tr>
                    <td class="td-about-pokemon">Name: </td>
                    <td>${capitalizeFirstLetter(pokemon.name)}</td>
                </tr>
                <tr>
                    <td class="td-about-pokemon">Type: </td>
                    <td id="overlay_typ_${pokemon.id}"></td>
                </tr>
                <tr>
                    <td class="td-about-pokemon">Height: </td>
                    <td>${calculateHeightWeight(pokemon.height)} m</td>
                </tr>
                <tr>
                    <td class="td-about-pokemon">Weight: </td>
                    <td>${calculateHeightWeight(pokemon.weight)} kg</td>
                </tr>
                <tr>
                    <td class="td-about-pokemon">Ability: </td>
                    <td id="overlay_ability_${pokemon.id}"></td>
                </tr>
            </table>
            <button class="sound-btn" onclick="playPokemonAudio('${sound}')">Play sound</button>
    `;
}



function templateBaseStats(pokemon) {
    return `
        <table id="stats_table" class="overlay-base-stats">
            <tr>
                <td class="td-left">${capitalizeFirstLetter(pokemon.stat.name)}</td>
                <td class="td-m">&#10147;</td>
                <td class="stats-range d-flex-c" style="width: ${pokemon.base_stat}%;">${pokemon.base_stat}</td>
            </tr>
        </table>
    `;
}

