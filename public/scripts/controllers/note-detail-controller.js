import {noteService} from '../services/note-service.js';
import {Note} from '../services/note.js';

// Create/Update Note
const form = document.querySelector('form');

const formTitle = document.querySelector('#title');
const formDescription = document.querySelector('#description');
const formImportance = document.querySelector('#importance');
const formDueDate = document.querySelector('#dueDate');

function handleFormSubmitEvent(event) {
    event.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('id')) {
        updateExistingNote();
    } else {
        saveNewNote();
    }

    window.location.href = 'index.html';
}

function saveNewNote() {
    const note = new Note(undefined, formTitle.value, formDescription.value, formImportance.value,
        undefined, moment(formDueDate.value).format(), false, undefined);
    noteService.addNote(note);
}

function updateExistingNote() {
    // TODO: implementation
}

// Cancel Note
const formCancelButton = document.querySelector('form .form__buttons .btn[type=button]');

function handleFormCancelEvent() {
    window.location.href = 'index.html';
}

// Initialization
function initEventHandlers() {
    form?.addEventListener('submit', (event) => {
        handleFormSubmitEvent(event);
    });

    formCancelButton?.addEventListener('click', () => {
        handleFormCancelEvent();
    });
}

function init() {
    initEventHandlers();
}

init();
