import { jest } from "@jest/globals";


jest.unstable_mockModule('../src/db.js', () => ({
  insertDB: jest.fn(),
  getDB: jest.fn(),
  saveDB: jest.fn(),
}));

const { insertDB, getDB, saveDB } = await import("../src/db.js");

const { createNote, findAllNotes, removeNote } = await import("../src/notes.js");

beforeEach(() => {
  insertDB.mockClear();
  getDB.mockClear();
  saveDB.mockClear();
})


test('createNote insert data and returns it', async () => {
  const data = {
    content: "Test Note",
    tags: ['tag1', 'tag2']
  };
  insertDB.mockResolvedValue(data);
  const result = await createNote(data);
  expect(result).toEqual(data);
});

test('findAllNotes find all notes', async () => {
  const db = {
    notes: [{
      content: "Test Note",
      tags: ['tag1', 'tag2']
    }]
  }
  getDB.mockResolvedValue(db);
  const result = await findAllNotes();
  expect(result).toEqual(db.notes);
});

test("removeNote remove a note by id", async () => {
  const notes = [
    {
      content: "Test Note",
      id: 1
    },
    {
      content: "Test Note 2",
      id: 2
    }
  ]
  saveDB.mockResolvedValue(notes);
  const idToRemove = 1;
  const match = await removeNote(idToRemove);
  expect(match).toEqual(idToRemove)
});