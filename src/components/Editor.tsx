import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { HighlightExtension } from "../extensions/HighlightExtension";
import { TextColorExtension } from "../extensions/TextColorExtension";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";

import Toolbar from "./Toolbar";

const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      HighlightExtension,
      TextColorExtension,
      TextStyle,
      Color,
    ],
    content:
      "<p>Welcome to the enhanced Text editor! Try out the formatting options in the toolbar above.</p>",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
      },
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="border rounded-lg shadow-sm bg-white">
        <Toolbar editor={editor} />
        <div className="p-4">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default Editor;
