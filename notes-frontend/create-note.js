const API = "https://smart-notes-apis.onrender.com";

/* Authentication guard */
if(!localStorage.getItem("token")){
    window.location.href="index.html";
}

async function createNote(){

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const dueDate = document.getElementById("dueDate").value;
    const message = document.getElementById("message");

    /* ===== CLIENT SIDE VALIDATION ===== */

    if(!title){
        alert("title is required")
        message.innerText = "Title is required";
        return;
    }

    if(!content){
        alert("content is required")
        message.innerText = "Content is required";
        return;
    }

    if(!dueDate){
        message.innerText = "Please select due date";
        return;
    }

    const res = await fetch(`${API}/notes`,{
        method:"POST",
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

    const data = await res.json();

    message.innerText = data.message || "Note created successfully!";
}

function goDashboard(){
    window.location.href="dashboard.html";
}