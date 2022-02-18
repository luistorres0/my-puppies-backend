const app = require("./app");
const { PORT = 5000 } = process.env;

app.listen(PORT, listener);

function listener() {
  console.log(`Listening on PORT ${PORT}`);
}
