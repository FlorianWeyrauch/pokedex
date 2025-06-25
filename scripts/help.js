//returns the first letter in capitals
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function toggleLoadingSpinner() {
    let load = document.getElementById("loading_spinner");
    load.classList.toggle('d-none');
    document.body.classList.toggle("scroll_none");
}

//removes the button when searching for pokemon and shows it again when the normal list is loaded
function removeLoadBtn() {
    const loadBtn = document.getElementById("load_btn");
    loadBtn.classList.add("d-none");
}

function showLoadBtn() {
    const loadBtn = document.getElementById("load_btn");
    loadBtn.classList.remove("d-none");
}

function calculateHeightWeight(n) {
    return n / 10;
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showAboutBg() {
    let stats = document.getElementById('stats');
    let about = document.getElementById('about');
    about.classList.add('overlay-description-content-about');
    about.classList.remove('d-none');
    stats.classList.remove('overlay-description-content-stats');
}

function showStatsBg() {
    let about = document.getElementById('about');
    let stats = document.getElementById('stats');
    stats.classList.add('overlay-description-content-stats');
    about.classList.remove('overlay-description-content-about')
}


