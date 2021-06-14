import {noteService} from '../services/note-service.js';
import {MarkupGenerator} from '../utils/markup-generator.js';

// Create Note
const createNoteButton = document.querySelector('.header-buttons__create');

function handleCreateNoteEvent() {
    window.location.href = 'note-detail.html';
}

// Manipulate Note (common)
const editButtonId = 'edit-note';
const deleteButtonId = 'delete-note';

function handleManipulateNoteEvent(event) {
    const clickedElement = event.target;

    // TODO: Refactor use of noteId
    if (clickedElement.id === editButtonId) {
        editNote(clickedElement);
    }
    if (clickedElement.id === deleteButtonId) {
        deleteNote(clickedElement);
    }
    if (clickedElement.type === 'checkbox') {
        toggleFinishState(clickedElement);
    }
}

function getNoteElemFromChildElem(elem) {
    return elem.closest('.note');
}

function getNoteIdFromChildElem(elem) {
    return getNoteElemFromChildElem(elem).dataset.noteId;
}

// Edit Note
function editNote(clickedElem) {
    window.location.href = `note-detail.html?id=${getNoteIdFromChildElem(clickedElem)}`;
}

// Finish Note
function toggleFinishState(clickedElem) {
    const note = noteService.getNoteById(getNoteIdFromChildElem(clickedElem));

    if (note.finished) {
        note.finished = false;
        note.finishDate = null;
    } else {
        note.finished = true;
        note.finishDate = moment().format();
    }

    noteService.updateNote(note);
    const finishInfoDiv = clickedElem.closest('.note__finish-info');
    finishInfoDiv.outerHTML = MarkupGenerator.generateFinishInfoMarkup(note);
}

// Delete Note
function deleteNote(clickedElem) {
    const noteElem = getNoteElemFromChildElem(clickedElem);
    noteService.deleteNote(noteElem.dataset.noteId);
    noteElem.outerHTML = '';
}

// Sorting
const sortButtonsContainer = document.querySelector('.sort-buttons');
const sortButtons = Array.from(document.querySelectorAll('.sort-buttons .btn'));

const buttonActiveClass = 'btn-active';
const sortButtonAscClass = 'sort-asc';
const sortButtonDesClass = 'sort-desc';

const sortByFinishDateId = 'sort-by-finish-date';
const sortByCreateDateId = 'sort-by-create-date';
const sortByImportanceId = 'sort-by-importance';

function handleSortClickEvent(event) {
    const clickedButton = event.target;
    // Button is already active
    if (clickedButton.classList.contains(buttonActiveClass)) {
        // Sorting get switched to ascending
        if (clickedButton.classList.contains(sortButtonDesClass)) {
            clickedButton.classList.toggle(sortButtonAscClass);
            clickedButton.classList.toggle(sortButtonDesClass);
            let sortFunc = null;

            if (clickedButton.id === sortByFinishDateId) {
                sortFunc = (a, b) => moment(a.finishDate) - moment(b.finishDate);
            }
            if (clickedButton.id === sortByCreateDateId) {
                sortFunc = (a, b) => moment(a.createDate) - moment(b.createDate);
            }
            if (clickedButton.id === sortByImportanceId) {
                sortFunc = (a, b) => a.importance - b.importance;
            }
            renderNotes(noteService.getNotes(sortFunc));
        } else { // Sorting is cleared
            clickedButton.classList.remove(buttonActiveClass, sortButtonAscClass, sortButtonDesClass);
            renderNotes(noteService.getNotes());
        }
    } else { // Button is pressed for the first time
        sortButtons.forEach((el) => {
            // Sorting gets switched to descending
            if (el.id === clickedButton.id) {
                clickedButton.classList.add(buttonActiveClass, sortButtonDesClass);
                let sortFunc = null;

                if (clickedButton.id === sortByFinishDateId) {
                    sortFunc = (a, b) => moment(b.finishDate) - moment(a.finishDate);
                }
                if (clickedButton.id === sortByCreateDateId) {
                    sortFunc = (a, b) => moment(b.createDate) - moment(a.createDate);
                }
                if (clickedButton.id === sortByImportanceId) {
                    sortFunc = (a, b) => b.importance - a.importance;
                }
                renderNotes(noteService.getNotes(sortFunc));
            } else {
                el.classList.remove(buttonActiveClass, sortButtonAscClass, sortButtonDesClass);
            }
        });
    }
}

// Filtering
const showFinishedButton = document.querySelector('#show-finished');

function handleFinishedButtonEvent(event) {
    const clickedButton = event.target;
    if (clickedButton.classList.contains(buttonActiveClass)) {
        clickedButton.classList.remove(buttonActiveClass);
        renderNotes(noteService.getNotes());
    } else {
        clickedButton.classList.add(buttonActiveClass);
        renderNotes(noteService.getNotes(null, (n) => n.finished));
    }
}

// Initialization
const notesContainer = document.querySelector('#notes-container');

function initEventHandlers() {
    createNoteButton?.addEventListener('click', () => {
        handleCreateNoteEvent();
    });

    notesContainer?.addEventListener('click', (event) => {
        handleManipulateNoteEvent(event);
    });

    sortButtonsContainer?.addEventListener('click', (event) => {
        handleSortClickEvent(event);
    });

    showFinishedButton?.addEventListener('click', (event) => {
        handleFinishedButtonEvent(event);
    });
}

function renderNotes(notes) {
    notesContainer.innerHTML = MarkupGenerator.generateNotesMarkup(notes);
}

function init() {
    renderNotes(noteService.getNotes());
    initEventHandlers();
}

init();
