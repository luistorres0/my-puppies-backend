const knex = require("../db/connection");

function create(user) {
  return knex("users")
    .insert(user, "*")
    .then((users) => users[0]);
}

function getUserByEmail(email) {
  return knex("users").where({ email }, "*").first();
}

module.exports = {
  create,
  getUserByEmail
};
