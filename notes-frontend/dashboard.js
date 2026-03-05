
if(!localStorage.getItem("token")){
    window.location.href="index.html";
}
const API = "https://smart-notes-apis.onrender.com";

function navigate(page){
    window.location.href = page;
}

async function loadSummary(){

    const res = await fetch(`${API}/analytics/summary`,{
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("token")
        }
    });

    const data = await res.json();

    document.getElementById("totalNotes").innerText = data.totalNotes;
    document.getElementById("completedNotes").innerText = data.completedNotes;
    document.getElementById("archivedNotes").innerText = data.archivedNotes;
    document.getElementById("overdueNotes").innerText = data.overdueNotes;
}

loadSummary();