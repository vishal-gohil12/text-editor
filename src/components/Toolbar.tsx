import React from "react";
import { Editor } from "@tiptap/react";
import { Bold, Italic, Highlighter, Type } from "lucide-react";

const TEXT_COLORS = ["#000000", "#ef4444", "#22c55e", "#3b82f6", "#a855f7"];

const HIGHLIGHT_COLORS = [
  "#fef08a",
  "#fecaca",
  "#bbf7d0",
  "#bfdbfe",
  "#ddd6fe",
];

interface ToolbarProps {
  editor: Editor | null;
}

const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  if (!editor) return null;

  const toggleHighlight = (color: string) => {
    if (editor.isActive("highlight", { color })) {
      editor.chain().focus().unsetHighlight().run();
    } else {
      editor.chain().focus().setHighlight(color).run();
    }
  };

  const toggleTextColor = (color: string) => {
    if (editor.isActive("textStyle", { color })) {
      editor.chain().focus().unsetColor().run();
    } else {
      editor.chain().focus().setColor(color).run();
    }
  };

  return (
    <div className="border-b p-2 flex gap-4 flex-wrap items-center">
      <div className="flex gap-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-100 transition-colors ${
            editor.isActive("bold") ? "bg-gray-100" : ""
          }`}
          title="Bold"
        >
          <Bold size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-100 transition-colors ${
            editor.isActive("italic") ? "bg-gray-100" : ""
          }`}
          title="Italic"
        >
          <Italic size={20} />
        </button>
      </div>
      <div className="h-6 w-px bg-gray-200" />
      <div className="flex gap-2 items-center">
        <Type size={20} className="text-gray-500" />
        {TEXT_COLORS.map((color) => (
          <button
            key={`text-${color}`}
            onClick={() => toggleTextColor(color)}
            className={`w-6 h-6 rounded-full border border-gray-200 transition-transform hover:scale-110 ${
              editor.isActive("textColor", { color })
                ? "ring-2 ring-offset-2 ring-blue-500"
                : ""
            }`}
            style={{ backgroundColor: color }}
            title="Text color"
          />
        ))}
      </div>
      <div className="h-6 w-px bg-gray-200" />
      <div className="flex gap-2 items-center">
        <Highlighter size={20} className="text-gray-500" />
        {HIGHLIGHT_COLORS.map((color) => (
          <button
            key={`highlight-${color}`}
            onClick={() => toggleHighlight(color)}
            className={`w-6 h-6 rounded border border-gray-200 transition-transform hover:scale-110 ${
              editor.isActive("highlight", { color })
                ? "ring-2 ring-offset-2 ring-blue-500"
                : ""
            }`}
            style={{ backgroundColor: color }}
            title="Highlight color"
          />
        ))}
      </div>
    </div>
  );
};

export default Toolbar;
