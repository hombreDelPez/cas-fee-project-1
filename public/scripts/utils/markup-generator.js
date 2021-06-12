export class MarkupGenerator {
    static generateImportanceMarkup(importance) {
        const arr = [];
        for (let i = 0; i < importance; i++) {
            arr.push('&starf;');
        }

        return arr.join(' ');
    }

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

    static generateNotesMarkup(notes) {
        return notes.map((note) => this.generateNoteMarkup(note)).join('');
    }
}
