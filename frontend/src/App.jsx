
import { useState, useEffect } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/api/students";

const languages = {
  en: {
    title: "Student Registration Management",
    subtitle: "Register and manage student information",
    register: "Student Registration",
    name: "Full Name",
    email: "Email Address",
    studentId: "Student ID",
    department: "Department",
    year: "Academic Year",
    choose: "Choose Department",
    chooseYear: "Choose Year",
    submit: "Register Student",
    update: "Update Student",
    cancel: "Cancel",
    edit: "Edit",
    list: "Registered Students",
    search: "Search students...",
    total: "Total Students",
    action: "Actions",
    delete: "Delete",
    empty: "No students registered yet",
    success: "Student registered successfully!",
    updated: "Student updated successfully!",
    deleted: "Student deleted successfully!",
    error: "Something went wrong. Please try again."
  },

  am: {
    title: "የተማሪ ምዝገባ እና አስተዳደር",
    subtitle: "የተማሪ መረጃን ይመዝግቡ እና ያስተዳድሩ",
    register: "የተማሪ ምዝገባ",
    name: "ሙሉ ስም",
    email: "የኢሜይል አድራሻ",
    studentId: "የተማሪ መለያ ቁጥር",
    department: "የትምህርት ክፍል",
    year: "የትምህርት ዓመት",
    choose: "ክፍል ይምረጡ",
    chooseYear: "ዓመት ይምረጡ",
    submit: "ተማሪን መዝግብ",
    update: "መረጃን አዘምን",
    cancel: "ይቅር",
    edit: "አስተካክል",
    list: "የተመዘገቡ ተማሪዎች",
    search: "ተማሪዎችን ፈልግ...",
    total: "ጠቅላላ ተማሪዎች",
    action: "ተግባራት",
    delete: "ሰርዝ",
    empty: "እስካሁን ምንም ተማሪ አልተመዘገበም",
    success: "ተማሪው በተሳካ ሁኔታ ተመዝግቧል!",
    updated: "የተማሪው መረጃ በተሳካ ሁኔታ ታድሷል!",
    deleted: "ተማሪው በተሳካ ሁኔታ ተሰርዟል!",
    error: "ስህተት ተፈጥሯል። እባክዎ እንደገና ይሞክሩ።"
  },

  aw: {
    title: "Student Registration Management",
    subtitle: "Register and manage student information",
    register: "Student Registration",
    name: "Full Name",
    email: "Email Address",
    studentId: "Student ID",
    department: "Department",
    year: "Academic Year",
    choose: "Choose Department",
    chooseYear: "Choose Year",
    submit: "Register Student",
    update: "Update Student",
    cancel: "Cancel",
    edit: "Edit",
    list: "Registered Students",
    search: "Search students...",
    total: "Total Students",
    action: "Actions",
    delete: "Delete",
    empty: "No students registered yet",
    success: "Student registered successfully!",
    updated: "Student updated successfully!",
    deleted: "Student deleted successfully!",
    error: "Something went wrong. Please try again."
  }
};

const emptyForm = {
  name: "",
  email: "",
  studentId: "",
  department: "",
  year: ""
};

function App() {
  const [language, setLanguage] = useState("en");
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const t = languages[language];

  // Load students from the backend
  useEffect(() => {
    async function loadStudents() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Could not load students");
        }

        const data = await response.json();
        setStudents(data);
      } catch (err) {
        console.error("Loading error:", err);
        setError(
          "Cannot connect to the backend. Check whether Node.js is running."
        );
      } finally {
        setLoading(false);
      }
    }

    loadStudents();
  }, []);

  // Handle form input changes
  function handleChange(e) {
    const { name, value } = e.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value
    }));
  }

  // Register or update a student
  async function handleSubmit(e) {
    e.preventDefault();

    // Temporary test: confirms that the form is submitting
    alert("Register button clicked!");

    setError("");
    setSaving(true);

    try {
      const isEditing = editingId !== null;

      const response = await fetch(
        isEditing ? `${API_URL}/${editingId}` : API_URL,
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t.error);
      }

      if (isEditing) {
        setStudents((previousStudents) =>
          previousStudents.map((student) =>
            student.id === editingId ? data : student
          )
        );

        alert(t.updated);
      } else {
        setStudents((previousStudents) => [
          ...previousStudents,
          data
        ]);

        alert(t.success);
      }

      setForm(emptyForm);
      setEditingId(null);

    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || t.error);
    } finally {
      setSaving(false);
    }
  }

  // Edit student information
  function handleEdit(student) {
    setForm({
      name: student.name,
      email: student.email,
      studentId: student.studentId,
      department: student.department,
      year: student.year
    });

    setEditingId(student.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  // Cancel editing
  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
  }

  // Delete student
  async function deleteStudent(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmed) return;

    setError("");

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Could not delete student");
      }

      setStudents((previousStudents) =>
        previousStudents.filter((student) => student.id !== id)
      );

      if (editingId === id) {
        cancelEdit();
      }

      alert(t.deleted);

    } catch (err) {
      console.error("Delete error:", err);
      setError(err.message || t.error);
    }
  }

  // Search students
  const filteredStudents = students.filter((student) =>
    (student.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (student.studentId || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">

      <header className="header">
        <h1>🎓 {t.title}</h1>
        <p>{t.subtitle}</p>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="am">አማርኛ</option>
          <option value="aw">Awigna (Awngi)</option>
        </select>
      </header>

      <main className="container">

        <section className="summary">
          <h2>{t.total}</h2>
          <h1>{students.length}</h1>
        </section>

        {/* Student Registration Form */}
        <section className="card">

          <h2>
            {editingId !== null ? t.update : t.register}
          </h2>

          <form onSubmit={handleSubmit}>

            <label>{t.name}</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <label>{t.email}</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <label>{t.studentId}</label>
            <input
              type="text"
              name="studentId"
              value={form.studentId}
              onChange={handleChange}
              required
            />

            <label>{t.department}</label>
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              required
            >
              <option value="">{t.choose}</option>
              <option value="Software Engineering">
                Software Engineering
              </option>
              <option value="Computer Science">
                Computer Science
              </option>
              <option value="Information Technology">
                Information Technology
              </option>
              <option value="Information Systems">
                Information Systems
              </option>
            </select>

            <label>{t.year}</label>
            <select
              name="year"
              value={form.year}
              onChange={handleChange}
              required
            >
              <option value="">{t.chooseYear}</option>
              <option value="Year 1">Year 1</option>
              <option value="Year 2">Year 2</option>
              <option value="Year 3">Year 3</option>
              <option value="Year 4">Year 4</option>
              <option value="Year 5">Year 5</option>
            </select>

            <button type="submit" disabled={saving}>
              {saving
                ? "Please wait..."
                : editingId !== null
                  ? t.update
                  : t.submit}
            </button>

            {editingId !== null && (
              <button
                type="button"
                onClick={cancelEdit}
              >
                {t.cancel}
              </button>
            )}

          </form>
        </section>

        {/* Registered Students Table */}
        <section className="card">

          <h2>{t.list}</h2>

          <input
            type="text"
            placeholder={t.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {error && (
            <p className="error-message" role="alert">
              {error}
            </p>
          )}

          {loading ? (
            <p>Loading students...</p>
          ) : (
            <div className="table-wrapper">

              <table>
                <thead>
                  <tr>
                    <th>{t.studentId}</th>
                    <th>{t.name}</th>
                    <th>{t.email}</th>
                    <th>{t.department}</th>
                    <th>{t.year}</th>
                    <th>{t.action}</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td>{student.studentId}</td>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.department}</td>
                      <td>{student.year}</td>

                      <td>
                        <button
                          type="button"
                          onClick={() => handleEdit(student)}
                        >
                          {t.edit}
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteStudent(student.id)}
                        >
                          {t.delete}
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredStudents.length === 0 && (
                    <tr>
                      <td colSpan="6">{t.empty}</td>
                    </tr>
                  )}
                </tbody>
              </table>

            </div>
          )}

        </section>

      </main>
    </div>
  );
}

export default App;
