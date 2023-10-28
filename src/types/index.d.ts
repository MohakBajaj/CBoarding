type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};
type Board = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};
type Folder = {
  id: string;
  name: string;
  notes: Note[];
  boards: Board[];
};
