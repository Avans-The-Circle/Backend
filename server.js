// reads the .env file and stores it as environment variables, use for config
require("dotenv").config();

const app = require("./src/app");

// the order of starting the app and connecting to the database does not matter
// since mongoose buffers queries till there is a connection

// start the app
const port = process.env.PORT;
console.log("Trying to connect on port ", port);
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
