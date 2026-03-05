const API = "http://localhost:5000/api";

/* Auth Guard */
if(!localStorage.getItem("token")){
    window.location.href="index.html";
}

async function loadNotes(){

    const res = await fetch(`${API}/notes`,{
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("token")
        }
    });

    const notes = await res.json();

    const grid = document.getElementById("notesGrid");
    grid.innerHTML = "";

    notes.forEach(note => {

        grid.innerHTML += `
        <div class="note-card">

            <div class="note-title">
                ${note.title}
            </div>

            <div class="note-content">
                ${note.content || ""}
            </div>
         <div class="note-footer">

            <button class="complete-btn"
            onclick="toggleComplete(${note.id},${note.isCompleted})">
            ${note.isCompleted ? "Undo" : "Complete"}
            </button>
        
            <button class="update-btn"
            onclick="goUpdate(${note.id})">
            Update
            </button>
        
            <button class="delete-btn"
            onclick="deleteNote(${note.id})">
            Delete
            </button>
        
        </div>

        </div>
        `;
    });
}

async function toggleComplete(id,currentStatus){

    await fetch(`${API}/notes/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("token")
        },
        body:JSON.stringify({
            isCompleted:!currentStatus
        })
    });

    loadNotes();
}

async function deleteNote(id){

    if(!confirm("Delete this note?")) return;

    await fetch(`${API}/notes/${id}`,{
        method:"DELETE",
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("token")
        }
    });

    loadNotes();
}

function goDashboard(){
    window.location.href="dashboard.html";
}

loadNotes();

function goUpdate(id){
    window.location.href = `update-note.html?id=${id}`;
}