const apiUrl = "https://vvri.pythonanywhere.com/api/courses"; // API alap URL

// Az oldal betöltésekor megjelenítjük a kurzusokat vagy diákokat
document.addEventListener('DOMContentLoaded', function() {
  showCourses(); // Alapértelmezetten a kurzusok jelennek meg
});

// Kurzusok megjelenítése
function showCourses() {
  document.getElementById('courses-section').style.display = 'block';
  document.getElementById('students-section').style.display = 'none';
  fetchCourses();
}

// Diákok megjelenítése
function showStudents() {
  document.getElementById('students-section').style.display = 'block';
  document.getElementById('courses-section').style.display = 'none';
  fetchStudents();
}

// Kurzusok lekérése
async function fetchCourses() {
  try {
    const response = await fetch(apiUrl);
    const courses = await response.json();
    const courseList = document.getElementById('course-list');
    courseList.innerHTML = '';
    courses.forEach(course => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <strong>${course.name}</strong> - ${course.description} 
        <button onclick="editCourse(${course.id})">Szerkesztés</button>
        <button onclick="deleteCourse(${course.id})">Törlés</button>
      `;
      courseList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Hiba a kurzusok betöltésekor:', error);
  }
}

// Diákok lekérése
async function fetchStudents() {
  try {
    const response = await fetch(apiUrl); // Diákok API URL-jét is be kell állítani, ha külön van
    const students = await response.json();
    const studentList = document.getElementById('student-list');
    studentList.innerHTML = '';
    students.forEach(student => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <strong>${student.name}</strong> - ${student.email}
        <button onclick="editStudent(${student.id})">Szerkesztés</button>
        <button onclick="deleteStudent(${student.id})">Törlés</button>
      `;
      studentList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Hiba a diákok betöltésekor:', error);
  }
}

// Új kurzus létrehozása
function createCourse() {
  const name = prompt("Kurzus neve:");
  const description = prompt("Kurzus leírása:");
  if (name && description) {
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, description })
    }).then(response => {
      if (response.ok) {
        fetchCourses();
      } else {
        alert('Hiba történt a kurzus létrehozásakor!');
      }
    });
  }
}

// Új diák létrehozása
function createStudent() {
  const name = prompt("Diák neve:");
  const email = prompt("Diák email címe:");
  if (name && email) {
    fetch(apiUrl, {  // Ez külön URL-t igényelhet diákokhoz
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email })
    }).then(response => {
      if (response.ok) {
        fetchStudents();
      } else {
        alert('Hiba történt a diák létrehozásakor!');
      }
    });
  }
}

// Kurzus szerkesztése
function editCourse(courseId) {
  const name = prompt("Új kurzus neve:");
  const description = prompt("Új kurzus leírása:");
  if (name && description) {
    fetch(`${apiUrl}/${courseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, description })
    }).then(response => {
      if (response.ok) {
        fetchCourses();
      } else {
        alert('Hiba történt a kurzus szerkesztésekor!');
      }
    });
  }
}

// Diák szerkesztése
function editStudent(studentId) {
  const name = prompt("Új diák neve:");
  const email = prompt("Új diák email címe:");
  if (name && email) {
    fetch(`${apiUrl}/${studentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email })
    }).then(response => {
      if (response.ok) {
        fetchStudents();
      } else {
        alert('Hiba történt a diák szerkesztésekor!');
      }
    });
  }
}

// Kurzus törlése
function deleteCourse(courseId) {
  if (confirm("Biztosan törölni szeretnéd ezt a kurzust?")) {
    fetch(`${apiUrl}/${courseId}`, {
      method: 'DELETE'
    }).then(response => {
      if (response.ok) {
        fetchCourses();
      } else {
        alert('Hiba történt a kurzus törlésekor!');
      }
    });
  }
}

// Diák törlése
function deleteStudent(studentId) {
  if (confirm("Biztosan törölni szeretnéd ezt a diákot?")) {
    fetch(`${apiUrl}/${studentId}`, {
      method: 'DELETE'
    }).then(response => {
      if (response.ok) {
        fetchStudents();
      } else {
        alert('Hiba történt a diák törlésekor!');
      }
    });
  }
}
