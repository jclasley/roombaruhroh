const express = require('express');
const path = require('path');
const app = express();
const hasher = require('../controller/hash');
const {Person, Bet, Winner} = require('../db/models');

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../public')));

app.post('/signup', async (req, res) => {
  try {
    const [pass, salt] = hasher.createPass(req.body.password);
    const p = new Person({username: req.body.username, password: pass, salt})
    await p.save();
    res.sendStatus(201);
  } catch (err) {
    res.status(400).send(err);
  }
})

app.post('/login', async (req, res) => {
  try {
    const success = await hasher.checkPass(req.body.username, req.body.password);
    if (success) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
})
app.get('/bets/today', async (req, res) => {
  try {
    const yesterday = new Date(Date.now());
    yesterday.setDate(yesterday.getDate() - 2);
    const bets = await Bet.find({ createdAt: {$gte: yesterday}})
    res.status(200).send(bets);
  } catch (err) {
    res.status(500).send(err);
  }
})

app.get('/winner', async (req, res) => {
  try {
    const winner = await Winner.find().sort({createdAt: -1}).limit(1);
    res.status(200).send(winner[0]);
  } catch (err) {
    res.status(400).send(err);
  }
})

app.get('/bets/:user', async (req, res) => {
  try {
    const bets = await Bet.find({username: req.params.user});
    res.status(200).send(bets);
  } catch (err) {
    res.status(500).send(err);
  }
})



app.post('/bets', async (req, res) => {
  try {
    const bet = new Bet({
      username: req.body.username,
      duration: req.body.duration
    });
    await bet.save();
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(400);
  }
})

app.listen(process.env.PORT || 3000);