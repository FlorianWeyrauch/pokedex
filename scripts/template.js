

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
    const mainType = pokemon.types[0].type.name;
    return `
        <div class="pokemon-overlay-card d-flex-fd-c ${mainType}">
            <div class="w100 d-flex-fe">
                <span class="overlay-close-btn" onclick="closeOverlay()">X</span>
            </div>
            <div class="w100 d-flex-sb">
                <p>${capitalizeFirstLetter(pokemon.name)}</p>
                <p>#${pokemon.id}</p>
            </div>
            <img src="${pokemon.sprites.other.home.front_default}" alt="${pokemon.name}">
            <div class="w100 d-flex-sb pokemon-overlay-description">
                <p onclick="">About</p>
                <p>Base Stats</p>
                <p>Evolution</p>
            </div>
            <div id="pokemon-description-content">
                <table>
                    <tr>
                        <td>Height: </td>
                        <td>${calculateHeightWeight(pokemon.height)}m</td>
                    </tr>
                    <tr>
                        <td>Weight: </td>
                        <td>${calculateHeightWeight(pokemon.weight)}kg</td>
                    </tr>
                </table>
            </div>
        </div>
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
