// require("dotenv").config({ path: "./server/.env" });
const mongoose = require("mongoose");

const mongoURL =
  "mongodb+srv://darshit2002shah:T8TZmlupcLNwQ8GU@authentication.khtoo.mongodb.net/?retryWrites=true&w=majority&appName=Authentication";

mongoose.connect(mongoURL);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("DB Connected");
});
