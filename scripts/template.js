

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
        <div class="nav-button-desktop" onclick="navigatePokemon(-1)"><-</div>
        <div class="pokemon-overlay-card d-flex-fd-c ${pokemon.types[0].type.name}">
            <div class="pokemon-title w100 d-flex-sb">
                <p class="fs-b"># ${pokemon.id}</p>
                <span class="overlay-close-btn" onclick="closeOverlay()">X</span>
            </div>
            <img src="${pokemon.sprites.other.home.front_default}" alt="${pokemon.name}">
            <div class="pokemon-overlay-data">
                <div class="w100 d-flex-sa pokemon-overlay-description">
                    <p onclick="">About</p>
                    <p>Base Stats</p>
                    <p>Evolution</p>
                </div>
                <div class="pokemon-overlay-description-content" id="pokemon-description-content">
                    <table>
                        <tr><td>Name:</td><td>${capitalizeFirstLetter(pokemon.name)}</td></tr>
                        <tr><td>Height:</td><td>${calculateHeightWeight(pokemon.height)}m</td></tr>
                        <tr><td>Weight:</td><td>${calculateHeightWeight(pokemon.weight)}kg</td></tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="overlay-navigation">
            <div class="nav-button-mobile" onclick="navigatePokemon(-1)"><-</div>
            <div class="nav-button-mobile" onclick="navigatePokemon(1)">-></div>
        </div>
        <div class="nav-button-desktop" onclick="navigatePokemon(1)">-></div>
    `;
}

function templateAboutPokemon(pokemon) {
    return `
      <table>
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
