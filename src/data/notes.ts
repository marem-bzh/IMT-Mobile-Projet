
var notes: { [id: number]: string; } = {
};

export const getNotes = () => notes;

export const getNote = (id: number) => notes[id];

export const saveNote = _saveNote;

function _saveNote(id: number, content: string) {
    const newNote = { [id]: content };
    notes = Object.assign({}, notes, newNote);

    console.log("Saving new note: " + newNote);
    console.log("Note states:" + notes);
}




