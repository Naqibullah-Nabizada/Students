import cors from "cors";
import express from "express";
import mysql from "mysql";

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "crud"
});


app.get("/students", (req, res) => {
  const sql = "SELECT * FROM students";
  db.query(sql, (err, data) => {
    if (err) return json(err);
    return res.json(data);
  })
});

app.get("/students/:id", (req, res) => {
  const sql = "SELECT * FROM students WHERE id =?";
  const id = req.params.id;
  db.query(sql, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  })
})

app.post("/students", (req, res) => {
  const sql = "INSERT INTO students (`firstname`,`lastname`,`father_name`,`mobile`,`address`) VALUES (?)";
  const values = [
    req.body.firstname,
    req.body.lastname,
    req.body.father_name,
    req.body.mobile,
    req.body.address
  ]

  db.query(sql, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Post created successfully!");
  })

});


app.delete("/students/:id", (req, res) => {

  const id = req.params.id;

  const sql = "DELETE FROM students WHERE id = ?";
  db.query(sql, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json("Post deleted successfully!");
  });
});


app.put("/students/:id", (req, res) => {

  const id = req.params.id;

  const sql = "UPDATE students SET `firstname`=?, `lastname`=?, `father_name`=?, `mobile`=?, `address`=? WHERE id=?";

  const values = [
    req.body.firstname,
    req.body.lastname,
    req.body.father_name,
    req.body.mobile,
    req.body.address
  ];

  db.query(sql, [...values, id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });

})

app.listen(5000, () => console.log('sarver is running'));