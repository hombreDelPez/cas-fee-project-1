import {noteService} from '../services/note-service.js';
import {MarkupGenerator} from '../utils/markup-generator.js';

// Create Note
const createNoteButton = document.querySelector('.header-buttons__create');

function handleCreateNoteEvent() {
    window.location.href = 'note-detail.html';
}

// Sorting
const sortButtonsContainer = document.querySelector('.sort-buttons');
const sortButtons = Array.from(document.querySelectorAll('.sort-buttons .btn'));

const buttonActiveClass = 'btn-active';
const sortButtonAscClass = 'sort-asc';
const sortButtonDesClass = 'sort-desc';

function handleSortClickEvent(event) {
    const clickedButton = event.target;

    if (clickedButton.classList.contains(buttonActiveClass)) {
        if (clickedButton.classList.contains(sortButtonDesClass)) {
            clickedButton.classList.toggle(sortButtonAscClass);
            clickedButton.classList.toggle(sortButtonDesClass);
        } else {
            clickedButton.classList.remove(buttonActiveClass, sortButtonAscClass, sortButtonDesClass);
        }
    } else {
        sortButtons.forEach((el) => {
            if (el.id === clickedButton.id) {
                clickedButton.classList.add(buttonActiveClass, sortButtonDesClass);
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
const notesContainer = document.querySelector('#notes-container');

function initEventHandlers() {
    createNoteButton?.addEventListener('click', () => {
        handleCreateNoteEvent();
    });

    sortButtonsContainer?.addEventListener('click', (event) => {
        handleSortClickEvent(event);
    });

    showFinishedButton?.addEventListener('click', (event) => {
        handleFinishedButtonEvent(event);
    });
}

function renderNotes() {
    const notes = noteService.getNotes();
    notesContainer.innerHTML = MarkupGenerator.generateNotesMarkup(notes);
}

function init() {
    initEventHandlers();
    renderNotes();
}

init();
