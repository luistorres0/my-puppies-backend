const { PORT = 5000 } = process.env;
const knex = require("./db/connection");
const app = require("./app");

knex.migrate
  .latest()
  .then((migrations) => {
    console.log("migrations", migrations);
    app.listen(PORT, listener);
  })
  .catch((error) => {
    console.error(error);
    knex.destroy();
  });

function listener() {
  console.log(`Listening on PORT ${PORT}`);
}
