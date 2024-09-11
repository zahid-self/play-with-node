const router = require("express").Router();
const { readFile, writeFile } = require("node:fs/promises");

const path = require('node:path');
const crypto = require("node:crypto");
const { Api404Error } = require("./error-handler/AppError");

/**
 * Player microservice
 * CRUD - Create Read Update Delete
 * GET - / - find all players
 * POST - / - create a new player
 * GET - /:id - find a single player
 * PUT - /:id - update or create player
 * PATCH /:id - update a player
 * DELETE /:id - delete a player
 * **/

router.post('/', async (req, res, next) => {
  const body = req.body;
  const filePath = path.resolve("src", "players.json");
  const fileDb = await readFile(filePath, 'utf-8');
  let players = JSON.parse(fileDb);
  const player = {
    id: crypto.randomUUID(),
    ...body
  }
  players.push(player);
  await writeFile(path.resolve("src", "players.json"), JSON.stringify(players));
  res.status(201).json(player)
});

router.get("/", async (_req, res) => {
  const fileDb = await readFile(path.resolve("src", "players.json"));
  const players = JSON.parse(fileDb);
  res.status(200).json(players)
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const fileDb = await readFile(path.resolve("src", "players.json"));
  const players = JSON.parse(fileDb);
  const player = players.find((player) => player.id === id);
  if (!player) {
    const error = new Error("Player not found!");
    error.status = 404;
    throw error;
  }
  res.status(200).json(player);
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const fileDb = await readFile(path.resolve("src", "players.json"));
  const players = JSON.parse(fileDb);
  let player = players.find((player) => player.id === id);
  if (!player) {
    player = {
      ...body,
      id: crypto.randomUUID(),
    }
    players.push(player);
  } else {
    player.id = crypto.randomUUID();
    player.name = body.name;
    player.rank = body.rank;
  }
  await writeFile(path.resolve("src", "players.json"), JSON.stringify(players));
  res.status(200).json(player)
});

router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const fileDb = await readFile(path.resolve("src", "players.json"));
  const players = JSON.parse(fileDb);
  let player = players.find((player) => player.id === id);
  if (!player) {
    res.status(404).json({ message: 'Player not found!' })
  } else {
    player = {
      id: player.id,
      ...body
    }
  }
  await writeFile(path.resolve("src", "players.json"), JSON.stringify(players));
  res.status(200).json(player)
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const fileDb = await readFile(path.resolve("src", "players.json"));
  const players = JSON.parse(fileDb);
  const player = players.find((player) => player.id === id);
  if (!player) {
    res.status(404).json({ message: 'Player not found!' })
  }
  let upatedPLayers = players.filter((player) => player.id !== id);
  await writeFile(path.resolve("src", "players.json"), JSON.stringify(upatedPLayers));
  res.status(200).json(upatedPLayers);
})

router.get('/health', (_req, res) => {
  res.status(200).json({ status: 'OK' })
})

module.exports = router;