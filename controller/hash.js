const crypto = require('crypto');
const {Person} = require('../db/models');

const createPass = (str) => {
  const salt = crypto.randomBytes(32).toString('base64');
  const hash = crypto.createHash('sha256');
  hash.update(str + salt);
  return [hash.digest('hex'), salt];
}

const checkPass = async (username, pass) => {
  const person = await Person.findOne({username: username});
  const hash = crypto.createHash('sha256');
  hash.update(pass + person.salt);
  return person.password === hash.digest('hex');
}

module.exports = {
  checkPass,
  createPass
}