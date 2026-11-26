
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let students = [];
let nextId = 1;

// Get all students
app.get("/api/students", (req, res) => {
  res.json(students);
});

// Register a student
app.post("/api/students", (req, res) => {
  const { name, email, studentId, department, year } = req.body;

  if (!name || !email || !studentId || !department || !year) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  const student = {
    id: nextId++,
    name,
    email,
    studentId,
    department,
    year
  };

  students.push(student);

  console.log("New student registered:", student.name);

  res.status(201).json(student);
});

// Update a student
app.put("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex(student => student.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  students[index] = {
    ...students[index],
    ...req.body,
    id
  };

  res.json(students[index]);
});

// Delete a student
app.delete("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const oldLength = students.length;

  students = students.filter(student => student.id !== id);

  if (students.length === oldLength) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  res.json({
    message: "Student deleted successfully"
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
