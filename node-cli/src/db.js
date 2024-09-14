import { readFile, writeFile } from "node:fs/promises";

const dbPath = new URL("../db/db.json", import.meta.url);

export const getDB = async () => {
  const db = await readFile(dbPath, 'utf-8');
  return JSON.parse(db);
}

export const saveDB = async (db) => {
  await writeFile(dbPath, JSON.stringify(db, null, 2));
  return db;
}

export const insertDB = async (data) => {
  const db = await getDB();
  db.notes.push(data);
  await saveDB(db);
  return data;
}