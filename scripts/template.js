

function templatePokemonCard(pokemon) {
    return `
        <div class="card-header d-flex-sa">
            <p>${capitalizeFirstLetter(pokemon.name)}</p>
            <p>#${pokemon.id}</p>
        </div>
        <div class="d-flex-sb">
            <div class="card-type d-flex-c-fd-c" id="card_type_${pokemon.id}"></div>
            <img src="${pokemon.sprites.other.home.front_default}" alt="${pokemon.name}">
        </div>
    `;
}
