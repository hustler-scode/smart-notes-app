const API = "https://smart-notes-apis.onrender.com";

// ================= REGISTER =================
async function register() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password })
  });

  const data = await res.json();
  document.getElementById("message").innerText = data.message || data.error;
}

// ================= LOGIN =================
async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
  
    const data = await res.json();
  
    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "dashboard.html";
    } else {
      document.getElementById("message").innerText = data.message;
    }
  }

// ================= CHECK AUTH =================
function checkAuth() {
  if (!localStorage.getItem("token")) {
    window.location.href = "index.html";
  }
}

// ================= LOGOUT =================
function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

// ================= CREATE NOTE =================
async function createNote() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const dueDate = document.getElementById("dueDate").value;

  await fetch(`${API}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify({ title, content, dueDate })
  });

  loadNotes();
  loadSummary();
}

// ================= LOAD NOTES =================
async function loadNotes() {
  const res = await fetch(`${API}/notes`, {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  });

  const notes = await res.json();

  const container = document.getElementById("notes");
  container.innerHTML = "";

  notes.forEach(note => {
    container.innerHTML += `
      <div class="note">
        <h4>${note.title}</h4>
        <p>${note.content}</p>
        <button onclick="completeNote(${note.id}, ${note.isCompleted})">
          ${note.isCompleted ? "Undo" : "Complete"}
        </button>
        <button onclick="deleteNote(${note.id})">Delete</button>
      </div>
    `;
  });
}

function showRegister() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
  }
  
  function showLogin() {
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
  }
// ================= COMPLETE NOTE =================
async function completeNote(id, currentStatus) {
  await fetch(`${API}/notes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify({ isCompleted: !currentStatus })
  });

  loadNotes();
  loadSummary();
}

// ================= DELETE NOTE =================
async function deleteNote(id) {
  await fetch(`${API}/notes/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  });

  loadNotes();
  loadSummary();
}

// ================= LOAD SUMMARY =================
async function loadSummary() {
  const res = await fetch(`${API}/analytics/summary`, {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  });

  const data = await res.json();

  document.getElementById("summary").innerHTML = `
    <p>Total: ${data.totalNotes}</p>
    <p>Completed: ${data.completedNotes}</p>
    <p>Archived: ${data.archivedNotes}</p>
    <p>Overdue: ${data.overdueNotes}</p>
  `;
}