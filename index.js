var express = require ('express');
var app = express();
require('dotenv').load();
const pg = require("pg")
const Client = pg.Client

const bodyParser = require("body-parser")
app.use (bodyParser.urlencoded({extended:true}))

app.set ('view engine', 'pug')

const client = new Client({
  user: process.env.username,
  host: process.env.host,
  database: process.env.name,
  password: process.env.password,
  port: 5432
})

client.connect((err) => console.log(err))

app.get("/", (request, response) => {
  response.render ("post-message")
})

app.post("/post-message", (request, response) => {
  const query = {
    text: `INSERT INTO messages (title, body) values ('${request.body.title}', '${request.body.message}')
    && INSERT INTO users (username) values ('${request.body.username}');`
  }

  client.query(query, (err, res) => {
/*    console.log(res)*/
  })
  response.redirect("all-messages")
})

app.get("/all-messages", (request, response) => {
  const query = {
    text: `Select * from messages`
  }

  client.query(query, (err, res) => {
    /*console.log(res)*/
    var allMessages = res.rows

    response.render("all-messages", {
      title: "Bulletin Board",
      allMessages:allMessages
    })
  })
})

var server = app.listen(3000, () => {
  console.log("listening to port 3000")
});

