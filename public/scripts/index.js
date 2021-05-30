// Theme chooser
const lightThemeValue = 'light-theme';
const darkThemeValue = 'dark-theme';
const themeLocalStorageId = 'theme';

const themeChooser = document.querySelector('#choose-theme');

themeChooser?.addEventListener('change', (event) => {
    handleThemeChangeEvent(event);
});

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

initializeTheme();


// Sort buttons

const sortButtonsContainer = document.querySelector('.sort-buttons');
const sortButtons = Array.from(document.querySelectorAll('.sort-buttons .btn'));

const buttonActiveClass = 'btn-active';
const sortButtonAscClass = 'sort-asc';
const sortButtonDesClass = 'sort-desc';

sortButtonsContainer?.addEventListener('click', (event) => {
    handleSortClickEvent(event);
})

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
        for (let sortButton of sortButtons) {
            if (sortButton.id === clickedElem.id) {
                clickedElem.classList.add(buttonActiveClass, sortButtonDesClass);
            } else {
                sortButton.classList.remove(buttonActiveClass, sortButtonAscClass, sortButtonDesClass);
            }
        }
    }
}


// Filter buttons

const showFinishedButton = document.querySelector('#show-finished');

showFinishedButton?.addEventListener('click', (event) => {
    event.target.classList.toggle(buttonActiveClass);
})
