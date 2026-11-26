# Student Registration Management System

## 1. Project Overview
The Student Registration Management System is a simple and dynamic web application developed to manage student registration information. It allows users to register new students, view student records, search for students, update student information, and delete student records.

## 2. Project Objectives
- Make student registration easier and faster.
- Manage student information efficiently.
- Search student records by name or student ID.
- Update existing student information.
- Delete student records.
- Provide a simple and user-friendly interface.
- Support multiple interface languages.

## 3. Technologies Used
**Frontend:** React.js, HTML5, CSS3, JavaScript  
**Backend:** Node.js, Express.js  
**Development Tools:** Visual Studio Code, Node.js, npm, Web Browser.

## 4. Main Features
1. **Student Registration:** Register students using full name, email, student ID, department, and academic year.
2. **Student List:** Display registered student information.
3. **Search Students:** Search students by name or student ID.
4. **Edit Student:** Update existing student information.
5. **Delete Student:** Remove student records.
6. **Dashboard:** Display the total number of registered students.
7. **Language Selection:** Provide English, Amharic, and Awngi language options (Awngi translation is still being completed).

## 5. Project Structure
```text
Student Registration Management/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
├── backend/
│   └── server.js
│
└── README.md
```
*Note: The backend folder and server.js are planned components and will be created during backend development.*

## 6. How to Run the Project
**Step 1:** Install Node.js from https://nodejs.org/

**Step 2:** Open the project folder in Visual Studio Code.

**Step 3:** Open the terminal and enter the frontend directory:
```bash
cd frontend
```

**Step 4:** Install the project dependencies:
```bash
npm install
```

**Step 5:** Start the React development server:
```bash
npm run dev
```

**Step 6:** Open the local URL displayed in the terminal, usually:
```text
http://localhost:5173/
```

## 7. Future Improvements
- Connect the application to a database.
- Develop the backend using Node.js and Express.js.
- Add user authentication and authorization.
- Improve data security.
- Add student report generation.
- Complete and verify Awngi translations.

## 8. Developer Information
**Developer:** Genet Abebaw  
**Department:** Software Engineering  
**University:** Injibara University  
**Project Title:** Student Registration Management System

## 9. Conclusion
The Student Registration Management System is designed to simplify student information management through a user-friendly web application. It provides essential features such as student registration, searching, editing, and deleting records. The project also provides a foundation for future development, including database integration and backend services.