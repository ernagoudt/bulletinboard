var connect = initialize()

module.exports = {
  initialize ({host: "localhost",
              username: "postgres",
              password: "postgres",
              database: "bulletinboard"
  })

  getAll: function(table, cb) {
  return client.query ("SELECT * FROM messages;")
  .then(result) => {
    // this result will not be nicely formatted object
    return
  }}

  findById: function (table, id, cb){
    client.query(`SELECT * FROM ${table} WHERE id = ${id}`)
    // this should be formated as object {firstname: "sinterklaas", lastname: "Holy", email: "sint@spain.com"}
  }
}

findByID("messages", 2, function (result){
  // do something with the result
  })

findAll ("messages", function(result) {
  //do something with the result
})

