

function templatePokemonCard(pokemon) {
    return `
        <div class="card-header d-flex-sa">
            <p><b>${capitalizeFirstLetter(pokemon.name)}</b></p>
            <p>#${pokemon.id}</p>
        </div>
        <div class="d-flex-sb">
            <div class="card-type d-flex-c-fd-c" id="card_type_${pokemon.id}"></div>
            <img src="${pokemon.sprites.other.home.front_default}" alt="${pokemon.name}">
        </div>
    `;
}

function templatePokemonOverlay(pokemon) {
    return `
        <div class="nav-button-desktop d-flex-c" onclick="navigatePokemon(-1)">&#9664;</div>
        <div class="pokemon-overlay-card d-flex-fd-c ${pokemon.types[0].type.name}">
            <div class="pokemon-title w100 d-flex-sb">
                <p class="fs-b"># ${pokemon.id}</p>
                <span id="overlay_close_btn_${pokemon.id}" class="overlay-close-btn" onclick="closeOverlay(event, ${pokemon.id})">X</span>
            </div>
            <img src="${pokemon.sprites.other.home.front_default}" alt="${pokemon.name}">
            <div class="pokemon-overlay-data">
                <div class="w100 d-flex-sa pokemon-overlay-description">
                    <div onclick="" class="w50 d-flex-c" id="about">About</div>
                    <div onclick="" class="w50 d-flex-c" id="stats">Base Stats</div>
                </div>
                <div class="pokemon-overlay-content d-flex-c-fd-c" id="pokemon-description-content">
                </div>
            </div>
        </div>
        <div class="overlay-navigation">
            <div class="nav-button-mobile d-flex-c" onclick="navigatePokemon(-1)">&#9664;</div>
            <div class="nav-button-mobile d-flex-c" onclick="navigatePokemon(1)">&#9654;</div>
        </div>
        <div class="nav-button-desktop d-flex-c" onclick="navigatePokemon(1)">&#9654;</div>
    `;
}

function templatePokemonType(pokemon) {
    return `<span class="pokemon-type ${pokemon.type.name}">${capitalizeFirstLetter(pokemon.type.name)}</span> `;
}

function templateAboutPokemon(pokemon) {
    return `
            <table id="about_table">
                <tr>
                    <td>Height: </td>
                    <td>${pokemon.height}</td>
                </tr>
                <tr>
                    <td>Weight: </td>
                    <td>${pokemon.weight}</td>
                </tr>
            </table>
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

