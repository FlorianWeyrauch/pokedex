function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function toggleLoadingSpinner() {
    let load = document.getElementById("loading_spinner");
    load.classList.toggle('d-none');
}