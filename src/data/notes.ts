import { Plugins } from "@capacitor/core";

const { Storage } = Plugins;

_initNotes();

var notes: { [id: number]: string } = {};

export const getNotes = () => notes;
export const saveNote = _saveNote;
export const getNote = (id: number) => notes[id];

async function _initNotes() {
  console.log("Retrieving notes from storage");
  const ret = await Storage.get({ key: "notes" });
  const value: string = ret.value ? ret.value : "{}";
  notes = JSON.parse(value);
  console.log("Note states:");
  console.log(notes);
}

async function _saveNote(id: number, content: string) {
  const newNote = { [id]: content };
  notes = Object.assign({}, notes, newNote);
  await Storage.set({ key: "notes", value: JSON.stringify(notes) });
  console.log("Saving note: ");
  console.log(newNote);
  console.log("Note states:");
  console.log(notes);
}
