const knex = require("../db/connection");

function create(user) {
  return knex("users")
    .insert(user, "*")
    .then((users) => users[0]);
}

function getUserByEmail(email) {
  return knex("users").where({ email }, "*").first();
}

function getUserById(user_id) {
  return knex("users").where({ user_id }, "*").first();
}

function deleteUserById(user_id){
  return knex("users").where({user_id}, "*").delete();
}

module.exports = {
  create,
  getUserByEmail,
  getUserById,
  deleteUserById
};
