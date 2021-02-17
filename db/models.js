const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/roomba')

const personSchema = new mongoose.Schema({
  username: String,
  password: String,
  salt: String,
})

const betSchema = new mongoose.Schema({
  username: String,
  duration: String
}, {
  timestamps: Date
})

const winners = new mongoose.Schema({
  username: String,
  duration: String,
}, {
  timestamps: Date
})

const Person = mongoose.model('Person', personSchema);
const Bet = mongoose.model('Bet', betSchema);
const Winner = mongoose.model('Winner', winners);

module.exports = {
  Person,
  Bet,
  Winner
}