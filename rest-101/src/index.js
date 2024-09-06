const express = require('express')
const app = express()
const cors = require('cors');
const morgan = require('morgan');
const { readFile, writeFile } = require("node:fs/promises");
const path = require('node:path');
const crypto = require("node:crypto")

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

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


app.post('/', async (req, res) => {
  const body = req.body;
  const fileDb = await readFile(path.resolve("src", "players.json"));
  const players = JSON.parse(fileDb);
  const player = {
    id: crypto.randomUUID(),
    ...body
  }
  players.push(player);
  await writeFile(path.resolve("src", "players.json"), JSON.stringify(players));
  res.status(201).json(body)
});

app.get("/", async (_req, res) => {
  const fileDb = await readFile(path.resolve("src", "players.json"));
  const players = JSON.parse(fileDb);
  res.status(200).json(players)
});

app.get("/:id", async (req, res) => {
  const id = req.params.id;
  const fileDb = await readFile(path.resolve("src", "players.json"));
  const players = JSON.parse(fileDb);
  const player = players.find((player) => player.id === id);
  if (!player) {
    res.status(404).json({ message: 'Player not found!' })
  }
  res.status(200).json(player);
});

app.put('/:id', async (req, res) => {
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

app.patch('/:id', async (req, res) => {
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

app.delete("/:id", async (req, res) => {
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

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'OK' })
})


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`localhost:${port}`)
})