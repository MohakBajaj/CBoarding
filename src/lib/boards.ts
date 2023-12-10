import { nanoid } from "nanoid";

function fetchBoards(): Board[] {
  const boards: Board[] = JSON.parse(localStorage.getItem("boards") || "[]");
  return boards;
}

export function createNewBoard(title: string) {
  const board: Board = {
    id: nanoid(10),
    title,
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem("boards", JSON.stringify([...fetchBoards(), board]));
  return board;
}
