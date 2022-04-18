const express = require("express");
const keys = require("./config/keys");

const app = express();

// Setup DB
const mongoose = require("mongoose");
mongoose.connect(keys.mongoURI);

// Setup DB models
require("./model/Account");

// Setup the routes
require("./routes/authenticationRoutes")(app);

// Listen
app.listen(keys.port, () => {
  console.log("Listening on " + keys.port);
});
