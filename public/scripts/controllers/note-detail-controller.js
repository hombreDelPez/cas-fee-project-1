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

    if (isInEditMode()) {
        updateExistingNote();
    } else {
        saveNewNote();
    }

    window.location.href = 'index.html';
}

function getIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function isInEditMode() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.has('id');
}

function saveNewNote() {
    const note = new Note(undefined, formTitle.value, formDescription.value, formImportance.value,
        null, moment(formDueDate.value).format(), false, undefined);
    noteService.addNote(note);
}

function updateExistingNote() {
    const note = noteService.getNoteById(getIdFromUrl());

    note.title = formTitle.value;
    note.description = formDescription.value;
    note.importance = formImportance.value;
    note.dueDate = moment(formDueDate.value).format();

    noteService.updateNote(note);
}

// Cancel Note
const formCancelButton = document.querySelector('form .form__buttons .btn[type=button]');

function handleFormCancelEvent() {
    window.location.href = 'index.html';
}

// Initialization
function preFillForm() {
    if (isInEditMode()) {
        const note = noteService.getNoteById(getIdFromUrl());
        formTitle.value = note.title;
        formDescription.value = note.description;
        formImportance.value = note.importance;
        formDueDate.value = moment(note.dueDate).format('YYYY-MM-DD');
    }
}

function initEventHandlers() {
    form?.addEventListener('submit', (event) => {
        handleFormSubmitEvent(event);
    });

    formCancelButton?.addEventListener('click', () => {
        handleFormCancelEvent();
    });
}

function init() {
    preFillForm();
    initEventHandlers();
}

init();
