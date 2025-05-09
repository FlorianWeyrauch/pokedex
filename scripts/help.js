function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function toggleLoadingSpinner() {
    let load = document.getElementById("loading_spinner");
    load.classList.toggle('d-none');
    document.body.classList.toggle("scroll_none");
}

function calculateHeightWeight(n) {
    return n / 10;
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}