const express = require("express");
const keys = require("./config/keys");

const app = express();

// Setup DB
const mongoose = require("mongoose");
mongoose.connect(keys.mongoURI);

//Setup DB models
require("./model/Account");
const Account = mongoose.model("accounts");

//Routes
app.get("/auth", async (req, res) => {
  const { username, password } = req.query;
  if (!username || !password) {
    res.send("Invalid credentials");
    return;
  }

  let userAccount = await Account.findOne({ username: username });
  if (!userAccount) {
    console.log("Create new account...");

    let newAccount = new Account({
      username: username,
      password: password,

      lastAuthentication: Date.now(),
    });

    await newAccount.save();
    res.send(newAccount);
    return;
  } else {
    if (password === userAccount.password) {
      userAccount.lastAuthentication = Date.now();
      await userAccount.save();
      res.send("You are authenticated");
      return;
    } else {
      res.send("Wrong Password");
      return;
    }
  }
});

app.listen(keys.port, () => {
  console.log("Listening on " + keys.port);
});
