const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
  password: "",
  database: "crud-data",
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const email = req.body.email;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "INSERT INTO users (name, age, email, password) VALUES (?,?,?,?)",
      [name, age, email, hash],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values inserted");
        }
      }
    );
  });
});

app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const { name, age, email, password } = req.body;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "UPDATE users SET name = ?, age = ?, email  = ?, password = ? WHERE id = ?",
      [name, age, email, hash, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM users WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
