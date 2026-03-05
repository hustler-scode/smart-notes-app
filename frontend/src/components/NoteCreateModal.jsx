import { useState } from "react";
import API from "../api/axios";
import RichEditor from "./RichEditor";

export default function NoteCreateModal({ onClose, refresh }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createNote = async () => {
    await API.post("/notes", {
      title,
      content
    });

    refresh();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-2xl w-[600px] space-y-4">

        <input
          placeholder="Title"
          className="w-full border p-2 rounded"
          onChange={e => setTitle(e.target.value)}
        />

        <RichEditor value={content} onChange={setContent} />

        <div className="flex justify-end gap-3">
          <button onClick={onClose}>Cancel</button>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={createNote}
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
}