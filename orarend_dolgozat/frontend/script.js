const API_URL = "http://localhost:3000/api/schedule"; // Update if needed

const list = document.getElementById("timetableList");
const form = document.getElementById("addForm");

form.addEventListener("submit", addEntry);

window.addEventListener("DOMContentLoaded", fetchAndRender);

async function fetchAndRender() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log(data);
    renderGroupedTimetable(data);
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

function renderGroupedTimetable(data) {
  list.innerHTML = "";

  const sortedDays = Object.keys(data).sort((a, b) => {
    const dayOrder = ["Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek"];
    return dayOrder.indexOf(a) - dayOrder.indexOf(b);
  });

  for (const day of sortedDays) {
    const dayHeader = document.createElement("h3");
    dayHeader.textContent = day;
    list.appendChild(dayHeader);

    const ul = document.createElement("ul");

    data[day].forEach((lesson) => {
      const li = document.createElement("li");

      const text = document.createElement("span");
      text.textContent = `${lesson.hour}h: ${lesson.subject}`;

      const actions = document.createElement("div");
      actions.className = "actions";

      const editBtn = document.createElement("button");
      editBtn.textContent = "Szerkesztés";
      editBtn.onclick = () => editLesson(day, lesson);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Törlés";
      deleteBtn.onclick = () => deleteLesson(lesson.id);

      actions.append(editBtn, deleteBtn);
      li.append(text, actions);
      ul.appendChild(li);
    });

    list.appendChild(ul);
  }
}

async function addEntry(e) {
  e.preventDefault();
  const day = document.getElementById("day").value;
  const hour = parseInt(document.getElementById("hour").value);
  const subject = document.getElementById("subject").value;

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ day, hour, subject }),
    });

    form.reset();
    fetchAndRender();
  } catch (error) {
    console.error("Add error:", error);
  }
}

async function deleteLesson(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    fetchAndRender();
  } catch (error) {
    console.error("Delete error:", error);
  }
}

async function editLesson(day, lesson) {
  const newHour = prompt("Edit hour:", lesson.hour);
  const newSubject = prompt("Edit subject:", lesson.subject);

  if (newHour && newSubject) {
    try {
      await fetch(`${API_URL}/${lesson.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          day,
          hour: parseInt(newHour),
          subject: newSubject,
        }),
      });
      fetchAndRender();
    } catch (error) {
      console.error("Edit error:", error);
    }
  }
}
