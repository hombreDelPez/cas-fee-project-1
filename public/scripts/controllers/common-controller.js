// Theme chooser
const lightThemeValue = 'light-theme';
const darkThemeValue = 'dark-theme';
const themeLocalStorageId = 'theme';

const themeChooser = document.querySelector('.header-buttons__theme');

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
        if (themeChooser) {
            themeChooser.value = darkThemeValue;
        }
    }
}

// Initialization
function initEventHandlers() {
    themeChooser?.addEventListener('change', (event) => {
        handleThemeChangeEvent(event);
    });
}

function init() {
    initializeTheme();
    initEventHandlers();
}

init();
