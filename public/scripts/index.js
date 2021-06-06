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

themeChooser?.addEventListener('change', (event) => {
    handleThemeChangeEvent(event);
});

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

sortButtonsContainer?.addEventListener('click', (event) => {
    handleSortClickEvent(event);
});

// Filter buttons

const showFinishedButton = document.querySelector('#show-finished');

showFinishedButton?.addEventListener('click', (event) => {
    event.target.classList.toggle(buttonActiveClass);
});

// Notes

const importanceSymbol = '&starf;';
const notesContainer = document.querySelector('#notes-container');

function generateImportanceMarkup(importance) {
    const arr = [];
    for (let i = 0; i < importance; i++) {
        arr.push(importanceSymbol);
    }

    return arr.join(' ');
}

function generateNoteMarkup(note) {
    return `<div class="note" data-note-id="${note.id}">
    <div class="note__due-date">
      <p>Due Date: <span class="bold">${note.dueDate}</span></p>
    </div>
    <div class="note__title-importance">
      <div>
        <p>${note.title}</p>
      </div>
      <div>
        <p>${generateImportanceMarkup(note.importance)}</p>
      </div>
    </div>
    <div class="note__edit">
      <button class="btn">Edit</button>
    </div>
    <div class="note__finish-created">
      <div>
        <input type="checkbox" ${note.finished ? 'checked' : ''}>
        <p>Finished ${note.finished ? `(${note.finishDate})` : ''}</p>
      </div>
      <p>Created Date: ${note.createDate}</p>
    </div>
    <div class="note__description">
      <textarea readonly>${note.description}</textarea>
    </div>
  </div>`;
}

/* eslint-disable */
// Source: https://stackoverflow.com/a/2117523
function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}
/* eslint-enable */


// Notes - Temp code to test the 'template literals'

const notes = [];

for (let i = 0; i < 5; i++) {
    const note = {
        id: uuidv4(),
        title: `Todo ${i}`,
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        importance: i,
        finished: i % 2 === 0,
        dueDate: '17.10.2021',
        finishDate: '18.10.2021',
        createDate: '19.10.2021',
    };
    notes.push(note);
}

const notesMarkup = notes.map((note) => generateNoteMarkup(note)).join('');
notesContainer.innerHTML = notesMarkup;
