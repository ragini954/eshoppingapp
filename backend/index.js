const express = require("express");
const connectToMongo = require("./db/config");
const User = require("./db/User");
const cors = require("cors");
const app = express();
const port = 5000;
connectToMongo();

app.use(cors());
app.use(express.json());
app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject(); //at the time of save we can't use select to delete any field from response.
  delete result.password;
  res.send(result);
});

app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("password");
    if (user) {
      res.send(user);
    } else {
      res.send({ result: "No User found" });
    }
  } else {
    res.send({ result: "Fill all the details" });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//get method is used when we need a page to load and show some data //post,put,patch,delete these methods are used while form submission,etc.
//response(res) is sent by the server(backend) on the request(req) by client(frontend)
