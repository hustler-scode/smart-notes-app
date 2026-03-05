import { FiCheck, FiArchive, FiTrash } from "react-icons/fi";

export default function NoteCard({ note }) {
  return (
    <div className="
      bg-white dark:bg-gray-800
      rounded-2xl
      shadow-md hover:shadow-xl
      transition-all duration-300
      p-5 space-y-3
      border border-gray-100 dark:border-gray-700
    ">

      <h3 className="font-semibold text-lg">
        {note.title}
      </h3>

      <p className="text-sm text-gray-500 line-clamp-3">
        {note.content}
      </p>

      <div className="flex justify-between items-center pt-3">

        <div className="flex gap-3 text-gray-500">

          <FiCheck className="hover:text-green-500 cursor-pointer"/>
          <FiArchive className="hover:text-blue-500 cursor-pointer"/>
          <FiTrash className="hover:text-red-500 cursor-pointer"/>

        </div>

      </div>
    </div>
  );
}