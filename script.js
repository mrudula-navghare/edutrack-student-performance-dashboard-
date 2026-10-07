/* =========================================================
   EDU TRACK - STUDENTS MANAGEMENT
========================================================= */

let students = [
    {
        id: "ST001",
        name: "Akash Sharma",
        course: "MCA",
        email: "akash@gmail.com",
        score: 92,
        performance: "Excellent",
        status: "Active"
    },

    {
        id: "ST002",
        name: "Priya Raj",
        course: "MCA",
        email: "priya@gmail.com",
        score: 86,
        performance: "Good",
        status: "Active"
    },

    {
        id: "ST003",
        name: "Rahul Kumar",
        course: "MBA",
        email: "rahul@gmail.com",
        score: 74,
        performance: "Average",
        status: "Active"
    },

    {
        id: "ST004",
        name: "Sneha N",
        course: "BCA",
        email: "sneha@gmail.com",
        score: 95,
        performance: "Excellent",
        status: "Active"
    }
];


/* =========================================================
   INITIAL LOAD
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    renderStudents();

    updateStatistics();

    setupSearch();

    setupFilters();

});


/* =========================================================
   GET PERFORMANCE
========================================================= */

function getPerformance(score) {

    score = Number(score);

    if (score >= 90) {
        return "Excellent";
    }

    if (score >= 80) {
        return "Good";
    }

    if (score >= 60) {
        return "Average";
    }

    return "Needs Improvement";
}


/* =========================================================
   GET PERFORMANCE CLASS
========================================================= */

function getPerformanceClass(performance) {

    if (performance === "Excellent") {
        return "excellent";
    }

    if (performance === "Good") {
        return "good";
    }

    if (performance === "Average") {
        return "average";
    }

    return "needs-improvement";
}


/* =========================================================
   GET INITIALS
========================================================= */

function getInitials(name) {

    let words = name.trim().split(" ");

    if (words.length >= 2) {

        return (
            words[0][0] +
            words[1][0]
        ).toUpperCase();

    }

    return name.substring(0, 2).toUpperCase();
}


/* =========================================================
   RENDER STUDENTS
========================================================= */

function renderStudents(list = students) {

    const tbody =
        document.querySelector("#studentTable tbody");

    if (!tbody) {
        console.log("Student table not found");
        return;
    }

    tbody.innerHTML = "";


    /* EMPTY TABLE */

    if (list.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align:center; padding:40px;">
                    <div style="font-size:40px; margin-bottom:10px;">
                        👨‍🎓
                    </div>

                    <strong>No students found</strong>

                    <p style="margin-top:6px; color:#888;">
                        Try changing your search or filters.
                    </p>
                </td>
            </tr>
        `;

        return;
    }


    /* CREATE ROWS */

    list.forEach(student => {

        const row =
            document.createElement("tr");

        row.innerHTML = `

            <td>
                ${student.id}
            </td>


            <td>

                <div class="student-info">

                    <div class="student-avatar">
                        ${getInitials(student.name)}
                    </div>

                    <span>
                        ${student.name}
                    </span>

                </div>

            </td>


            <td>
                ${student.course}
            </td>


            <td>
                ${student.email}
            </td>


            <td>
                <strong>
                    ${student.score}%
                </strong>
            </td>


            <td>

                <span class="status ${getPerformanceClass(student.performance)}">
                    ${student.performance}
                </span>

            </td>


            <td>

                <span class="status ${
                    student.status === "Active"
                        ? "active"
                        : "inactive"
                }">
                    ${student.status}
                </span>

            </td>


            <td>

                <button
                    class="action-btn view"
                    onclick="viewStudent('${student.id}')"
                    title="View">

                    <i class="fa-solid fa-eye"></i>

                </button>


                <button
                    class="action-btn edit"
                    onclick="editStudent('${student.id}')"
                    title="Edit">

                    <i class="fa-solid fa-pen"></i>

                </button>


                <button
                    class="action-btn delete"
                    onclick="deleteStudent('${student.id}')"
                    title="Delete">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        `;

        tbody.appendChild(row);

    });

}


/* =========================================================
   SEARCH
========================================================= */

function setupSearch() {

    const search =
        document.getElementById("studentSearch");

    if (!search) return;

    search.addEventListener("input", applyFilters);

}


/* =========================================================
   FILTERS
========================================================= */

function setupFilters() {

    const course =
        document.getElementById("courseFilter");

    const status =
        document.getElementById("statusFilter");

    const performance =
        document.getElementById("performanceFilter");


    if (course) {
        course.addEventListener(
            "change",
            applyFilters
        );
    }


    if (status) {
        status.addEventListener(
            "change",
            applyFilters
        );
    }


    if (performance) {
        performance.addEventListener(
            "change",
            applyFilters
        );
    }

}


/* =========================================================
   APPLY ALL FILTERS
========================================================= */

function applyFilters() {

    const search =
        document
            .getElementById("studentSearch")
            ?.value
            .toLowerCase()
            .trim() || "";


    const course =
        document
            .getElementById("courseFilter")
            ?.value || "all";


    const status =
        document
            .getElementById("statusFilter")
            ?.value || "all";


    const performance =
        document
            .getElementById("performanceFilter")
            ?.value || "all";


    const filtered =
        students.filter(student => {

            const matchesSearch =
                student.name
                    .toLowerCase()
                    .includes(search)

                ||

                student.email
                    .toLowerCase()
                    .includes(search)

                ||

                student.id
                    .toLowerCase()
                    .includes(search);


            const matchesCourse =
                course === "all" ||
                student.course === course;


            const matchesStatus =
                status === "all" ||
                student.status === status;


            const matchesPerformance =
                performance === "all" ||
                student.performance === performance;


            return (
                matchesSearch &&
                matchesCourse &&
                matchesStatus &&
                matchesPerformance
            );

        });


    renderStudents(filtered);

}


/* =========================================================
   UPDATE STATISTICS
========================================================= */

function updateStatistics() {

    const total =
        students.length;


    const active =
        students.filter(
            student =>
                student.status === "Active"
        ).length;


    const topPerformers =
        students.filter(
            student =>
                student.score >= 90
        ).length;


    const totalElement =
        document.getElementById("totalStudents");

    if (totalElement) {
        totalElement.innerText = total;
    }


    /* ACTIVE STUDENTS */

    const statCards =
        document.querySelectorAll(".stat-card");


    if (statCards.length >= 2) {

        const activeNumber =
            statCards[1].querySelector("h2");

        const activeText =
            statCards[1].querySelector(".increase");


        if (activeNumber) {
            activeNumber.innerText =
                active;
        }


        if (activeText) {

            let percentage =
                total > 0
                    ? ((active / total) * 100).toFixed(1)
                    : 0;

            activeText.innerText =
                percentage + "% active";

        }

    }


    /* TOP PERFORMERS */

    if (statCards.length >= 4) {

        const topNumber =
            statCards[3].querySelector("h2");

        if (topNumber) {
            topNumber.innerText =
                topPerformers;
        }

    }

}


/* =========================================================
   VIEW STUDENT
========================================================= */

function viewStudent(id) {

    const student =
        students.find(
            s => s.id === id
        );


    if (!student) return;


    alert(
        "Student Details\n\n" +

        "ID: " +
        student.id +

        "\nName: " +
        student.name +

        "\nCourse: " +
        student.course +

        "\nEmail: " +
        student.email +

        "\nScore: " +
        student.score + "%"

        +

        "\nPerformance: " +
        student.performance +

        "\nStatus: " +
        student.status
    );

}


/* =========================================================
   EDIT STUDENT
========================================================= */

function editStudent(id) {

    const student =
        students.find(
            s => s.id === id
        );


    if (!student) return;


    const newName =
        prompt(
            "Enter student name:",
            student.name
        );


    if (newName === null) return;


    const newEmail =
        prompt(
            "Enter email:",
            student.email
        );


    if (newEmail === null) return;


    const newScore =
        prompt(
            "Enter score (0-100):",
            student.score
        );


    if (newScore === null) return;


    const score =
        Number(newScore);


    if (
        isNaN(score) ||
        score < 0 ||
        score > 100
    ) {

        alert(
            "Please enter a valid score between 0 and 100."
        );

        return;

    }


    student.name =
        newName.trim();


    student.email =
        newEmail.trim();


    student.score =
        score;


    student.performance =
        getPerformance(score);


    renderStudents();

    updateStatistics();


    alert(
        "Student updated successfully!"
    );

}


/* =========================================================
   DELETE STUDENT
========================================================= */

function deleteStudent(id) {

    const student =
        students.find(
            s => s.id === id
        );


    if (!student) return;


    const confirmDelete =
        confirm(
            "Are you sure you want to delete " +
            student.name +
            "?"
        );


    if (!confirmDelete) {
        return;
    }


    students =
        students.filter(
            s => s.id !== id
        );


    renderStudents();

    updateStatistics();


    alert(
        "Student deleted successfully!"
    );

}


/* =========================================================
   ADD STUDENT
========================================================= */

function addStudent() {

    const name =
        prompt(
            "Enter student name:"
        );


    if (!name) return;


    const email =
        prompt(
            "Enter student email:"
        );


    if (!email) return;


    const course =
        prompt(
            "Enter course (MCA/BCA/MBA/B.Tech):",
            "MCA"
        );


    if (!course) return;


    const scoreInput =
        prompt(
            "Enter performance score:",
            "80"
        );


    if (scoreInput === null) return;


    const score =
        Number(scoreInput);


    if (
        isNaN(score) ||
        score < 0 ||
        score > 100
    ) {

        alert(
            "Score must be between 0 and 100."
        );

        return;

    }


    const newNumber =
        students.length + 1;


    const newId =
        "ST" +
        String(newNumber).padStart(3, "0");


    const performance =
        getPerformance(score);


    const newStudent = {

        id: newId,

        name: name.trim(),

        course: course.trim(),

        email: email.trim(),

        score: score,

        performance: performance,

        status: "Active"

    };


    students.push(newStudent);


    renderStudents();

    updateStatistics();


    alert(
        "Student added successfully!"
    );

}


/* =========================================================
   CONNECT ADD STUDENT BUTTON
========================================================= */

document.addEventListener(
    "click",
    function(event) {

        const button =
            event.target.closest(
                ".view-btn"
            );


        if (!button) return;


        const text =
            button.innerText
                .toLowerCase();


        if (
            text.includes("add student")
        ) {

            addStudent();

        }

    }
);