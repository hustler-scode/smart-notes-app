const API = "https://smart-notes-apis.onrender.com";

/* Auth Guard */
if(!localStorage.getItem("token")){
    window.location.href="index.html";
}

/* Get Note ID from URL */
const params = new URLSearchParams(window.location.search);
const noteId = params.get("id");

/* Load note data */
async function loadNote(){

    const res = await fetch(`${API}/notes`,{
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("token")
        }
    });

    const notes = await res.json();

    const note = notes.find(n => n.id == noteId);

    if(!note) return;

    document.getElementById("title").value = note.title;
    document.getElementById("content").value = note.content;
    document.getElementById("dueDate").value =
        note.dueDate ? note.dueDate.split("T")[0] : "";
}

/* Update Note */
async function updateNote(){

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const dueDate = document.getElementById("dueDate").value;

    const message = document.getElementById("message");

    if(!title || !content || !dueDate){
        message.innerText = "All fields are required";
        return;
    }

    await fetch(`${API}/notes/${noteId}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("token")
        },
        body:JSON.stringify({
            title,
            content,
            dueDate
        })
    });

    message.innerText = "Note updated successfully!";
}

/* Navigation */
function goViewPage(){
    window.location.href="view-notes.html";
}

loadNote();