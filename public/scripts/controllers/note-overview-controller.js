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

async function handleManipulateNoteEvent(event) {
    const clickedElement = event.target;

    if (clickedElement.id === editButtonId) {
        editNote(clickedElement);
    }
    if (clickedElement.id === deleteButtonId) {
        await deleteNote(clickedElement);
    }
    if (clickedElement.type === 'checkbox') {
        await toggleFinishState(clickedElement);
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
async function toggleFinishState(clickedElem) {
    const note = await noteService.getNoteById(getNoteIdFromChildElem(clickedElem));

    if (note.finished) {
        note.finished = false;
        note.finishDate = undefined;
    } else {
        note.finished = true;
        note.finishDate = moment().format();
    }

    await noteService.updateNote(note);
    const finishInfoDiv = clickedElem.closest('.note__finish-info');
    finishInfoDiv.outerHTML = MarkupGenerator.generateFinishInfoMarkup(note);
}

// Delete Note
async function deleteNote(clickedElem) {
    const noteElem = getNoteElemFromChildElem(clickedElem);
    await noteService.deleteNote(noteElem.dataset.noteId);
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
    // This ensures that the notes without a finish date are always last
    const getFinishDate = (finishDate, sortOrder) => {
        let date;
        if (sortOrder === 'asc') {
            date = moment('2100-12-31');
        } else {
            date = moment('2000-01-01');
        }
        if (finishDate) {
            date = moment(finishDate);
        }

        return date;
    };

    const clickedButton = event.target;
    // Button is already active
    if (clickedButton.classList.contains(buttonActiveClass)) {
        // Sorting gets switched from descending to ascending
        if (clickedButton.classList.contains(sortButtonDesClass)) {
            clickedButton.classList.remove(sortButtonDesClass);
            clickedButton.classList.add(sortButtonAscClass);

            let sortFunc = null;
            if (clickedButton.id === sortByFinishDateId) {
                sortFunc = (a, b) => getFinishDate(a.finishDate, 'asc') - getFinishDate(b.finishDate, 'asc');
            }
            if (clickedButton.id === sortByCreateDateId) {
                sortFunc = (a, b) => moment(a.createDate) - moment(b.createDate);
            }
            if (clickedButton.id === sortByImportanceId) {
                sortFunc = (a, b) => a.importance - b.importance;
            }

            noteService.sorting = sortFunc;
        } else { // Sorting is cleared
            clickedButton.classList.remove(buttonActiveClass, sortButtonAscClass, sortButtonDesClass);
            noteService.sorting = null;
        }
    } else { // Button is pressed for the first time
        sortButtons.forEach((el) => {
            // Sorting gets switched to descending
            if (el.id === clickedButton.id) {
                clickedButton.classList.add(buttonActiveClass, sortButtonDesClass);

                let sortFunc = null;
                if (clickedButton.id === sortByFinishDateId) {
                    sortFunc = (a, b) => getFinishDate(b.finishDate) - getFinishDate(a.finishDate);
                }
                if (clickedButton.id === sortByCreateDateId) {
                    sortFunc = (a, b) => moment(b.createDate) - moment(a.createDate);
                }
                if (clickedButton.id === sortByImportanceId) {
                    sortFunc = (a, b) => b.importance - a.importance;
                }

                noteService.sorting = sortFunc;
            } else {
                el.classList.remove(buttonActiveClass, sortButtonAscClass, sortButtonDesClass);
            }
        });
    }

    renderNotes();
}

// Filtering
const showFinishedButton = document.querySelector('#filter-finished');
const filterButtonShowActualClass = 'show-actual';
const filterButtonShowOppositeClass = 'show-opposite';

function handleFinishedButtonEvent(event) {
    const clickedButton = event.target;
    // Button is already active
    if (clickedButton.classList.contains(buttonActiveClass)) {
        // Filtering gets switched from actual to opposite
        if (clickedButton.classList.contains(filterButtonShowActualClass)) {
            clickedButton.classList.remove(filterButtonShowActualClass);
            clickedButton.classList.add(filterButtonShowOppositeClass);

            noteService.filtering = (n) => !n.finished;
        } else { // Filtering is cleared
            clickedButton.classList.remove(buttonActiveClass, filterButtonShowActualClass,
                filterButtonShowOppositeClass);
            noteService.filtering = null;
        }
    } else { // Button is pressed for the first time
        clickedButton.classList.add(buttonActiveClass);
        clickedButton.classList.add(filterButtonShowActualClass);

        noteService.filtering = (n) => n.finished;
    }

    renderNotes();
}

// Initialization
const notesContainer = document.querySelector('#notes-container');

function initEventHandlers() {
    createNoteButton?.addEventListener('click', () => {
        handleCreateNoteEvent();
    });

    notesContainer?.addEventListener('click', async (event) => {
        await handleManipulateNoteEvent(event);
    });

    sortButtonsContainer?.addEventListener('click', (event) => {
        handleSortClickEvent(event);
    });

    showFinishedButton?.addEventListener('click', (event) => {
        handleFinishedButtonEvent(event);
    });
}

async function renderNotes() {
    const notes = await noteService.getNotes();
    notesContainer.innerHTML = MarkupGenerator.generateNotesMarkup(notes);
}

async function init() {
    await renderNotes();
    initEventHandlers();
}

init();
