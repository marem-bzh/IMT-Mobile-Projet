
var notes: { [id: number]: String; } = {
    101: "This talk was amazing ! ",
    102: "This talk was amazing ! ",
    103: "This talk was amazing ! "
};

export const getNotes = () => notes;

export const getNote = (id: number) => notes[id];

function setNote(id: number, content: String) {
    notes = Object.assign({}, notes, { id: content });

    // Store notes
}