import { insertDB, getDB, saveDB } from "./db.js"

export const createNote = async (note) => {
  await insertDB(note);
  return note;
}

export const getNote = async (id) => {
  const { notes } = await getDB();
  const match = notes.find((note) => note.id === Number(id));
  return match;
}

export const findAllNotes = async () => {
  const { notes } = await getDB();
  return notes;
}

export const removeNote = async (id) => {
  const notes = await findAllNotes();
  const match = notes.find((note) => note.id === Number(id));
  if (match) {
    const filterNote = notes.filter((note) => note.id !== match.id);
    await saveDB({ notes: filterNote })
    return id;
  }
}


export const removeAllNotes = async () => {
  const db = await getDB();
  db.notes = [];
  return db.notes;
}

export const filterNote = async (filter) => {
  const { notes } = await getDB();
  return notes.filter((note) => note.content.toLowerCase().includes(filter.toLowerCase()))
}