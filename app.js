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
  const query1 = {
    text: `SELECT * FROM users WHERE username = ('${request.body.username}')`
  }

  const query2 = {
    text: `INSERT INTO users (username) VALUES ('${request.body.username}');`
  }

  const query3 = {
    text: `INSERT INTO messages (title, body, user_id) SELECT '${request.body.title}', '${request.body.message}',
    users.id FROM users WHERE users.username = '${request.body.username}'`
  }


  client.query(query1, (err, res) => {
    if(res.rows.length !== 0) {
      client.query(query3, (err, res) => {
        if (err)throw err

      })
    }
    else {
      client.query(query2, (err, result) => {
        if (err) throw err
        client.query(query3, (err, result) => {
          if (err) throw err
          console.log("check")
        })
      })
    }
  })
  response.redirect("all-messages")
})

app.post("/search-messages", (request, response) => {
  const query4 ={
    text: `Select messages.title, messages.body, users.username from messages inner join users on messages.user_id = users.id
    WHERE messages.user_id = (SELECT id FROM users WHERE username = '${request.body.search}')`
  }

  client.query(query4, (err, result) => {
    if (err) throw err
    var allMessages = result.rows

    response.render("all-messages", {
      allMessages:allMessages
    })
  })
})

app.get("/all-messages", (request, response) => {
  const query = {
    text: `Select messages.title, messages.body, users.username from messages inner join users on messages.user_id = users.id`
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

app.get("/")

var server = app.listen(3000, () => {
  console.log("listening to port 3000")
});
