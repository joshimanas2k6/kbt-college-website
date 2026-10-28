
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.static("public"));

// MongoDB Model
const Student = mongoose.model("Student", new mongoose.Schema({
    rollNo: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    course: { type: String, required: true }
}));

// CREATE - Add Student
app.post("/students", async function(req, res) {
    try {
        let student = await Student.create(req.body);
        res.json(student);
    } catch (error) {
        res.status(400).json({ message: "Student not added" });
    }
});

// READ - Show All Students
app.get("/students", async function(req, res) {
    let students = await Student.find();
    res.json(students);
});

// SEARCH - Find by Roll Number
app.get("/students/:rollNo", async function(req, res) {
    let student = await Student.findOne({
        rollNo: Number(req.params.rollNo)
    });

    if (student) {
        res.json(student);
    } else {
        res.status(404).json({ message: "Student not found" });
    }
});

// UPDATE - Change Student
app.put("/students/:rollNo", async function(req, res) {
    let student = await Student.findOneAndUpdate(
        { rollNo: Number(req.params.rollNo) },
        { name: req.body.name, course: req.body.course },
        { new: true }
    );

    if (student) {
        res.json(student);
    } else {
        res.status(404).json({ message: "Student not found" });
    }
});

// DELETE - Remove Student
app.delete("/students/:rollNo", async function(req, res) {
    let student = await Student.findOneAndDelete({
        rollNo: Number(req.params.rollNo)
    });

    if (student) {
        res.json({ message: "Student deleted" });
    } else {
        res.status(404).json({ message: "Student not found" });
    }
});

// Connect MongoDB and Start Server
mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
.then(function() {
    console.log("MongoDB Connected");

    app.listen(3000, function() {
        console.log("Server running on port 3000");
    });
})
.catch(function(error) {
    console.log("MongoDB Error:", error.message);
});
