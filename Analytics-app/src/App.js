import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [marks, setMarks] = useState("");

  const loadStudents = async () => {
    const res = await axios.get(
      "http://localhost:5000/students"
    );

    setStudents(res.data);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const addStudent = async () => {
    if (!name || !marks) return;

    await axios.post(
      "http://localhost:5000/students",
      {
        name,
        marks
      }
    );

    setName("");
    setMarks("");

    loadStudents();
  };

  const deleteStudent = async (id) => {
    await axios.delete(
      `http://localhost:5000/students/${id}`
    );

    loadStudents();
  };

  const total =
    students.reduce(
      (sum, s) => sum + Number(s.marks),
      0
    );

  const average =
    students.length > 0
      ? (total / students.length).toFixed(2)
      : 0;

  return (
    <div className="container">
      <h1>Student Analytics Dashboard</h1>

      <input
        type="text"
        placeholder="Student Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <input
        type="number"
        placeholder="Marks"
        value={marks}
        onChange={(e) =>
          setMarks(e.target.value)
        }
      />

      <button onClick={addStudent}>
        Add Student
      </button>

      <h2>Average Marks: {average}</h2>

      {students.map((student) => (
        <div
          key={student._id}
          className="card"
        >
          <p>
            {student.name} - {student.marks}
          </p>

          <button
            onClick={() =>
              deleteStudent(student._id)
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;