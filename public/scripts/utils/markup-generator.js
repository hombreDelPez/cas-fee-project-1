export class MarkupGenerator {
    static generateNoteMarkup(note) {
        return `<div class="note" data-note-id="${note.id}">
        <div class="note__due-date">
          <p>📅&#xFE0E; <span class="bold">${moment(note.dueDate).format('DD.MM.YY')}</span></p>
        </div>
        <div class="note__title-importance">
          <div>
            <p>${note.title}</p>
          </div>
          <div>
            <p>${this.generateImportanceMarkup(note.importance)}</p>
          </div>
        </div>
        <div class="note__manipulate">
          <button id="edit-note" class="btn">Edit</button>
          <button id="delete-note" class="btn">Delete</button>
        </div>
        <div class="note__finish-created">
          ${this.generateFinishInfoMarkup(note)}
          <p class="note__create-info">Created Date:<br>
             ${moment(note.createDate).format('DD.MM.YY HH:mm')}</p>
        </div>
        <div class="note__description">
          <textarea readonly>${note.description}</textarea>
        </div>
      </div>`;
    }

    static generateImportanceMarkup(importance) {
        const arr = [];
        for (let i = 0; i < 5; i++) {
            if (i < importance) {
                arr.push('&starf;');
            } else {
                arr.push('&star;');
            }
        }

        return arr.join(' ');
    }

    static generateFinishInfoMarkup(note) {
        return `<div class="note__finish-info">
            <input type="checkbox" ${note.finished ? 'checked' : ''}>
            <p>Finished ${note.finished ? `(${moment(note.finishDate).format('DD.MM.YY')})` : ''}</p>
          </div>`;
    }

    static generateNotesMarkup(notes) {
        return notes.map((note) => this.generateNoteMarkup(note)).join('');
    }
}
