export class MarkupGenerator {
    static generateNoteMarkup(note) {
        return `<div class="note" data-note-id="${note.id}">
        <div class="note__due-date">
          <p>Due Date: <span class="bold">${note.dueDate}</span></p>
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
          <button id="edit-note" class="btn">&#9998; Edit</button>
          <button id="delete-note" class="btn">&#128465; Delete</button>
        </div>
        <div class="note__finish-created">
          ${this.generateFinishInfoMarkup(note)}
          <p class="note__create-info">Created Date: ${note.createDate}</p>
        </div>
        <div class="note__description">
          <textarea readonly>${note.description}</textarea>
        </div>
      </div>`;
    }

    static generateImportanceMarkup(importance) {
        const arr = [];
        for (let i = 0; i < importance; i++) {
            arr.push('&starf;');
        }

        return arr.join(' ');
    }

    static generateFinishInfoMarkup(note) {
        return `<div class="note__finish-info">
            <input type="checkbox" ${note.finished ? 'checked' : ''}>
            <p>Finished ${note.finished ? `(${note.finishDate})` : ''}</p>
          </div>`;
    }

    static generateNotesMarkup(notes) {
        return notes.map((note) => this.generateNoteMarkup(note)).join('');
    }
}
