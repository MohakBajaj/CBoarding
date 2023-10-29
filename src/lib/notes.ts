import { nanoid } from "nanoid";

export function fetchNotes(): Note[] {
  const notes: Note[] = JSON.parse(localStorage.getItem("notes") || "[]");
  return notes;
}

export function fetchNote(id: string) {
  const notes = fetchNotes();
  const note = notes.find((note) => note.id === id);
  return note;
}

export function saveNote(note: Note) {
  try {
    localStorage.setItem("notes", JSON.stringify([...fetchNotes(), note]));
    return true;
  } catch (e) {
    return false;
  }
}

export function createNewNote(title: string) {
  const note: Note = {
    id: nanoid(10),
    title,
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem("notes", JSON.stringify([...fetchNotes(), note]));
  return note;
}
