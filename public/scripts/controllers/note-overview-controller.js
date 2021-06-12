// Theme chooser
const lightThemeValue = 'light-theme';
const darkThemeValue = 'dark-theme';
const themeLocalStorageId = 'theme';

const themeChooser = document.querySelector('#choose-theme');

function handleThemeChangeEvent(event) {
    const currentValue = event.target.value;
    const bodyClassList = document.body.classList;

    if (currentValue === lightThemeValue) {
        bodyClassList.remove(darkThemeValue);
    }

    if (currentValue === darkThemeValue) {
        bodyClassList.add(darkThemeValue);
    }

    localStorage.setItem(themeLocalStorageId, currentValue);
}

function initializeTheme() {
    const savedTheme = localStorage.getItem(themeLocalStorageId);
    if (savedTheme === darkThemeValue) {
        document.body.classList.add(darkThemeValue);
        themeChooser.value = darkThemeValue;
    }
}

// Sorting
const sortButtonsContainer = document.querySelector('.sort-buttons');
const sortButtons = Array.from(document.querySelectorAll('.sort-buttons .btn'));

const buttonActiveClass = 'btn-active';
const sortButtonAscClass = 'sort-asc';
const sortButtonDesClass = 'sort-desc';

function handleSortClickEvent(event) {
    const clickedElem = event.target;

    if (clickedElem.classList.contains(buttonActiveClass)) {
        if (clickedElem.classList.contains(sortButtonDesClass)) {
            clickedElem.classList.toggle(sortButtonAscClass);
            clickedElem.classList.toggle(sortButtonDesClass);
        } else {
            clickedElem.classList.remove(buttonActiveClass, sortButtonAscClass, sortButtonDesClass);
        }
    } else {
        sortButtons.forEach((el) => {
            if (el.id === clickedElem.id) {
                clickedElem.classList.add(buttonActiveClass, sortButtonDesClass);
            } else {
                el.classList.remove(buttonActiveClass, sortButtonAscClass, sortButtonDesClass);
            }
        });
    }
}

// Filtering
const showFinishedButton = document.querySelector('#show-finished');

function handleFinishedButtonEvent(event) {
    event.target.classList.toggle(buttonActiveClass);
}

// Initialization

function initEventHandlers() {
    themeChooser?.addEventListener('change', (event) => {
        handleThemeChangeEvent(event);
    });

    sortButtonsContainer?.addEventListener('click', (event) => {
        handleSortClickEvent(event);
    });

    showFinishedButton?.addEventListener('click', (event) => {
        handleFinishedButtonEvent(event);
    });
}

function init() {
    initializeTheme();
    initEventHandlers();
}

init();
