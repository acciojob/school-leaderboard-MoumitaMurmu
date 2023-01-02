const express = require("express");
const app = express();
const data =  require("./data")
const config = require("./config.json");

//== connect to database
const mongoURI =
  config.MONGODB_URI || "mongodb://localhost:27017" + "/newsFeed";

let mongoose = require("mongoose");
const Leaderboard = require("./model");

// commenting it out as MONGO URI isn't valid which leads to error and closing of nodejs process
// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("connected to database"));

const onePageArticleCount = 20;

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("hello world!");
});

// your code here!
app.get("/topRankings", (req,res)=>{
  let {
    limit,
    offset
  } = req.query;
  limit = Number(limit);
  offset = Number(offset);
  if(!limit){
    limit = 20;
  }
  if(!offset){
    offset = 0;
  }
  let skipped = data.data.slice(offset);
  let limitData = skipped.slice(0, limit);

  res.json(limitData)
})
// ==end==

module.exports = { app, db };
