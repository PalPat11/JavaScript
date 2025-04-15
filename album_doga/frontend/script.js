const API_URL = "http://localhost:3000/api/albums"; // Változtasd meg ha más az endpointod

const list = document.getElementById("albumList");
const form = document.getElementById("albumForm");

form.addEventListener("submit", addAlbum);
window.addEventListener("DOMContentLoaded", loadAlbums);

async function loadAlbums() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    renderAlbums(data);
  } catch (err) {
    console.error("Hiba az albumok betöltésekor:", err);
  }
}

function renderAlbums(albums) {
    list.innerHTML = "";
    albums.forEach(album => {
      const li = document.createElement("div");
      li.className = "album-card";
  
      const info = document.createElement("div");
      info.className = "album-info";
      info.innerHTML = `
        <h3>${album.band} – "${album.title}"</h3>
        <p>Megjelenés éve: ${album.year} • Műfaj: ${album.genre}</p>
      `;
  
      const actions = document.createElement("div");
      actions.className = "actions";
  
      const viewBtn = document.createElement("button");
      viewBtn.textContent = "Megtekintés";
      viewBtn.onclick = () => viewAlbum(album);
  
      const editBtn = document.createElement("button");
      editBtn.textContent = "Szerkesztés";
      editBtn.onclick = () => editAlbum(album);
  
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Törlés";
      deleteBtn.onclick = () => deleteAlbum(album.id);
  
      actions.append(viewBtn, editBtn, deleteBtn);
      li.append(info, actions);
      list.appendChild(li);
    });
  }
  

async function addAlbum(e) {
  e.preventDefault();

  const newAlbum = {
    band: document.getElementById("band").value,
    title: document.getElementById("title").value,
    year: parseInt(document.getElementById("year").value),
    genre: document.getElementById("genre").value,
  };

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAlbum),
    });

    form.reset();
    loadAlbums();
  } catch (err) {
    console.error("Hiba az album hozzáadásakor:", err);
  }
}

async function deleteAlbum(id) {
  if (confirm("Biztosan törlöd ezt az albumot?")) {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      loadAlbums();
    } catch (err) {
      console.error("Törlés hiba:", err);
    }
  }
}

function viewAlbum(album) {
  alert(`🎧 ${album.band}\nCím: ${album.title}\nMegjelenés: ${album.year}\nMűfaj: ${album.genre}`);
}

function editAlbum(album) {
  const newTitle = prompt("Új album cím:", album.title);
  const newYear = prompt("Új év:", album.year);
  const newGenre = prompt("Új műfaj:", album.genre);

  if (newTitle && newYear && newGenre) {
    fetch(`${API_URL}/${album.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        band: album.band,
        title: newTitle,
        year: parseInt(newYear),
        genre: newGenre,
      }),
    })
    .then(loadAlbums)
    .catch(err => console.error("Szerkesztési hiba:", err));
  }
}
