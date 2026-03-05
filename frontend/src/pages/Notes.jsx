import { useEffect, useState } from "react";
import WorkspaceLayout from "../components/WorkspaceLayout";
import NoteCard from "../components/NoteCard";
import { getNotes } from "../api/noteApi";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [showNoteModal, setShowNoteModal] = useState(false);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* 1️⃣ Your Layout */}
      <WorkspaceLayout
        sidebarContent={<div>Menu</div>}
        onCreateNote={() => setShowNoteModal(true)}
      >
        <div>
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      </WorkspaceLayout>

      {/* 2️⃣ PUT THE MODAL HERE — AFTER WorkspaceLayout */}
      {showNoteModal && (
  <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex items-center justify-center z-[9999]">
    <div className="bg-white p-8 rounded-2xl shadow-2xl w-[400px]">
      <h2 className="text-xl font-semibold mb-4">
        Create Note
      </h2>

      <button
        onClick={() => setShowNoteModal(false)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-xl"
      >
        Close
      </button>
    </div>
  </div>
  
)}
    </>
  );
}