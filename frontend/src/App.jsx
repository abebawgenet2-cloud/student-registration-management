
import { useState } from "react";
import "./App.css";

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
    updated: "Student updated successfully!"
  },

  am: {
    title: "የተማሪ ምዝገባ አስተዳደር",
    subtitle: "የተማሪዎችን መረጃ ይመዝግቡ እና ያስተዳድሩ",
    register: "የተማሪ ምዝገባ",
    name: "ሙሉ ስም",
    email: "ኢሜይል",
    studentId: "የተማሪ መለያ ቁጥር",
    department: "የትምህርት ክፍል",
    year: "የትምህርት ዓመት",
    choose: "ክፍል ይምረጡ",
    chooseYear: "ዓመት ይምረጡ",
    submit: "ተማሪ መዝግብ",
    update: "መረጃውን አዘምን",
    cancel: "ሰርዝ",
    edit: "አስተካክል",
    list: "የተመዘገቡ ተማሪዎች",
    search: "ተማሪ ፈልግ...",
    total: "ጠቅላላ ተማሪዎች",
    action: "ተግባር",
    delete: "ሰርዝ",
    empty: "ገና ምንም ተማሪ አልተመዘገበም",
    success: "ተማሪው በተሳካ ሁኔታ ተመዝግቧል!",
    updated: "የተማሪው መረጃ በተሳካ ሁኔታ ታድሷል!"
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
    updated: "Student updated successfully!"
  }
};

function App() {
  const [language, setLanguage] = useState("en");
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    studentId: "",
    department: "",
    year: ""
  });

  const t = languages[language];

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (editingId !== null) {
      setStudents(students.map(student =>
        student.id === editingId
          ? { ...student, ...form }
          : student
      ));

      alert(t.updated);
      setEditingId(null);
    } else {
      const newStudent = {
        id: Date.now(),
        ...form
      };

      setStudents([...students, newStudent]);
      alert(t.success);
    }

    setForm({
      name: "",
      email: "",
      studentId: "",
      department: "",
      year: ""
    });
  }

  function handleEdit(student) {
    setForm({
      name: student.name,
      email: student.email,
      studentId: student.studentId,
      department: student.department,
      year: student.year
    });

    setEditingId(student.id);
  }

  function cancelEdit() {
    setEditingId(null);

    setForm({
      name: "",
      email: "",
      studentId: "",
      department: "",
      year: ""
    });
  }

  function deleteStudent(id) {
    setStudents(students.filter(student => student.id !== id));

    if (editingId === id) {
      cancelEdit();
    }
  }

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.studentId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">

      <header className="header">
        <h1>🎓 {t.title}</h1>
        <p>{t.subtitle}</p>

        <select
          value={language}
          onChange={e => setLanguage(e.target.value)}
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

        {/* Student Registration Form - Always Visible */}
        <section className="card">
          <h2>{editingId !== null ? t.update : t.register}</h2>

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
              <option>Software Engineering</option>
              <option>Computer Science</option>
              <option>Information Technology</option>
              <option>Information Systems</option>
            </select>

            <label>{t.year}</label>
            <select
              name="year"
              value={form.year}
              onChange={handleChange}
              required
            >
              <option value="">{t.chooseYear}</option>
              <option>Year 1</option>
              <option>Year 2</option>
              <option>Year 3</option>
              <option>Year 4</option>
              <option>Year 5</option>
            </select>

            <button type="submit">
              {editingId !== null ? t.update : t.submit}
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
            onChange={e => setSearch(e.target.value)}
          />

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
                {filteredStudents.map(student => (
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

        </section>

      </main>
    </div>
  );
}

export default App;
