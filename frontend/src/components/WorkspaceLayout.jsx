import { useState } from "react";
import { FiMenu, FiPlus, FiSearch, FiLogOut } from "react-icons/fi";

export default function WorkspaceLayout({
  sidebarContent,
  children,
  onCreateNote,
  onLogout
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">

      {/* Sidebar */}
      <div className={`
        ${open ? "w-72" : "w-20"}
        transition-all duration-300
        bg-white dark:bg-gray-800
        border-r dark:border-gray-700
        p-5 flex flex-col shadow-lg
      `}>

        <div className="flex items-center justify-between mb-8">

          <button
            className="hover:text-blue-500 transition"
            onClick={() => setOpen(!open)}
          >
            <FiMenu size={22}/>
          </button>

          {open && (
            <h2 className="font-bold text-xl tracking-wide">
              Notebook
            </h2>
          )}

        </div>

        {open && sidebarContent}

      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col">

        {/* Top Bar */}
        <div className="
          flex items-center justify-between
          p-4 border-b dark:border-gray-700
          bg-white dark:bg-gray-800 shadow-sm
        ">

          <div className="flex items-center gap-3 w-full">
            <FiSearch className="text-gray-400"/>

            <input
              placeholder="Search notes..."
              className="
                w-full bg-transparent
                text-sm
                placeholder-gray-400
              "
            />
          </div>

          <div className="flex gap-5 text-gray-600 dark:text-gray-300">

            <FiPlus
              className="cursor-pointer hover:text-blue-500"
              size={20}
              onClick={onCreateNote}
            />

            <FiLogOut
              className="cursor-pointer hover:text-red-500"
              size={20}
              onClick={onLogout}
            />

          </div>

        </div>

        {/* Page Content */}
        <div className="p-8 overflow-auto flex-1">
          {children}
        </div>

      </div>
    </div>
  );
}