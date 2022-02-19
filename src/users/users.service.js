const knex = require("../db/connection");

function create(user) {
  return knex("users")
    .insert(user, "*")
    .then((users) => users[0]);
}

module.exports = {
  create,
};
