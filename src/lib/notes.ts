
import { nanoid } from "nanoid";

export function fetchNotes(): Note[] {
  const notes: Note[] = JSON.parse(localStorage.getItem("notes") || "[]");
  return notes;
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
