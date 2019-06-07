const mysql = require('mysql');

 const express = require('express');

 const app = express();

 const cors = require('cors');

 const  bodyParser = require('body-parser');

app.use(cors());

let logedUser;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin"
})

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!!")
})

app.use(bodyParser.json());

app.post('/registration', function (req, res) {
  if (!req.body) return res.sendStatus(400);
  console.log(req.body);
  res.json(req.body)

  connection.query("CREATE DATABASE IF NOT EXISTS users", function (err, result) {
    if (err) throw err;
    console.log("Database Created!");
  })

  connection.query("USE users", function (err) {
    if (err) throw err;
    console.log("Use database")
  })
  let sql = "CREATE TABLE IF NOT EXISTS userTable(id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255), password VARCHAR(255))"
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table Created!")
  })

  let sql1 = "INSERT INTO userTable VALUES(NULL,'" + req.body.email + "','" + req.body.password + "')"
  connection.query(sql1, function (err, result) {
    if (err) throw err;
    console.log("Inserted!");
  })

})


app.post('/login', function (req, res) {
  if (!req.body) return res.sendStatus(400);
  console.log(req.body);
  // res.json(req.body)

  connection.query("USE users", function (err, result) {
    if (err) throw err;
  })

  let sql2 = "SELECT * FROM userTable WHERE email ='" + req.body.email + "' AND password ='" + req.body.password + "'";
  connection.query(sql2, function (err, result) {
    if (err) throw err;
    logedUser = result[0].id;
    console.log(result)
    if ((result.length > 0) && (result[0].email === req.body.email) && (result[0].password === req.body.password)) {
      res.json("User found")
      console.log("User " + result[0].email + " found")
    } else {
      res.json("Error")
      console.log("User " + req.body.email + " not found");
    }

  })

})

app.post('/user-page', function (req, res) {
  if (!req.body) return res.sendStatus(400);
  console.log(req.body);

  connection.query("USE users", function (err, result) {
    if (err) throw err;
    console.log("USE");
  })

  let sql = "CREATE TABLE IF NOT EXISTS productList(id INT AUTO_INCREMENT PRIMARY KEY, userId INT, name VARCHAR(255), description VARCHAR(255), status VARCHAR(15), price INT)"
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table Created!");
  })

  let sql2 = "INSERT INTO productList VALUES(NULL,'" + logedUser + "','" + req.body.name + "','" + req.body.description + "','" + req.body.status + "','" + req.body.price + "' )"
  
  connection.query(sql2, function (err, result) {
    if (err) throw err;
    console.log("Inserted!")
    res.json(req.body);
  });

})

app.get('/product-list', function (req, res) {
  if (!req.body) return res.sendStatus(400);


  connection.query("USE users", function (err, result) {
    if (err) throw err;
    console.log("Use");
  })
    
  let sql = "SELECT * FROM productList WHERE userId = '" + logedUser + "'";
  connection.query(sql, function (err, result) {
    console.log(result);
    if (err) throw err;
    if (result.length > 0) {
      res.json(result)
    } 
    // else {
    //   res.json(result)
    // }
    
  })
})

app.post('/update',function(req,res){
  if(!req.body) return res.sendStatus(400);
  //  res.json(req.body);

  connection.query("USE users;",function(err,result){
    if(err) throw err;
  });

  let sql ="UPDATE productList SET name = '" + req.body.name +"', description = '" + req.body.description +"', status = '"+ req.body.status +"', price = '"+ req.body.price +"' WHERE id = '"+ req.body['selectedId'] +"'"
  connection.query(sql, function(err,result){
    if (err) throw err;
    console.log(result);
    res.json(result);
  })
  console.log(req.body['selectedId']);
  console.log(req.body)
})

app.post('/product-list',function(req,res){
  if(!req.body) res.sendStatus(400);
  res.json(req.body)
  console.log(req.body);


connection.query("USE users", function(err,result){
  if (err) throw err;
  console.log("Use Table")
})

connection.query("DELETE FROM productList WHERE id = '"+ req.body.id +"'",function(err,result){
  console.log(req.body.id);
  if(err) throw err;
  console.log(result.affectedRows)
})

});

app.route('/logedUser').all((req, res) => {
  res.json(logedUser);
})



app.listen(40000);
