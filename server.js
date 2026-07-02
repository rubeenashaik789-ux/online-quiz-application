const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",     // add password if you have one
  database: "quizdb"
});

// API to get questions
app.get("/questions", (req, res) => {
  db.query("SELECT * FROM questions", (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});

// API to submit quiz
app.post("/submit", (req, res) => {
  const answers = req.body;

  db.query("SELECT * FROM questions", (err, questions) => {
    let score = 0;

    questions.forEach(q => {
      if (answers[q.id] == q.correct_option) {
        score++;
      }
    });

    res.json({ score });
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});