import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function RichEditor({ value, onChange }) {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      className="bg-white dark:bg-gray-800 rounded-xl"
    />
  );
}