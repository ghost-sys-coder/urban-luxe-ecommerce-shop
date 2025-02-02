import React, { FC } from "react";
import {
    Bold,
    Strikethrough,
    Italic,
    List,
    ListOrdered,
    Heading,
    Quote,
    Underline,
    Redo,
    Undo,
    Code,
} from "lucide-react";
import { Editor } from "@tiptap/react";
import EditorButton from "./EditorButton";

interface ToolbarProps {
    editor: Editor | null;
}

const Toolbar: FC<ToolbarProps> = ({ editor }) => {
    if (!editor) {
        return null;
    }

    return (
        <div className="px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start w-full flex-wrap border border-gray-700">
            <div className="flex justify-start items-center gap-5 flex-wrap lg:w-10/12">
                {/* Bold */}
                <EditorButton
                    editor={editor}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive("bold")}
                >
                    <Bold className="h-5 w-5" />
                </EditorButton>

                {/* Italic */}
                <EditorButton
                    editor={editor}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive("italic")}
                >
                    <Italic className="h-5 w-5" />
                </EditorButton>

                {/* Underline */}
                <EditorButton
                    editor={editor}
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    isActive={editor.isActive("underline")}
                >
                    <Underline className="h-5 w-5" />
                </EditorButton>

                {/* Strikethrough */}
                <EditorButton
                    editor={editor}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    isActive={editor.isActive("strike")}
                >
                    <Strikethrough className="h-5 w-5" />
                </EditorButton>

                {/* Code */}
                <EditorButton
                    editor={editor}
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    isActive={editor.isActive("code")}
                >
                    <Code className="h-5 w-5" />
                </EditorButton>

                {/* Heading */}
                <EditorButton
                    editor={editor}
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                    isActive={editor.isActive("heading", { level: 2 })}
                >
                    <Heading className="h-5 w-5" />
                </EditorButton>

                {/* Bullet List */}
                <EditorButton
                    editor={editor}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    isActive={editor.isActive("bulletList")}
                >
                    <List className="h-5 w-5" />
                </EditorButton>

                {/* Ordered List */}
                <EditorButton
                    editor={editor}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    isActive={editor.isActive("orderedList")}
                >
                    <ListOrdered className="h-5 w-5" />
                </EditorButton>

                {/* Blockquote */}
                <EditorButton
                    editor={editor}
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    isActive={editor.isActive("blockquote")}
                >
                    <Quote className="h-5 w-5" />
                </EditorButton>

                {/* Undo */}
                <EditorButton
                    editor={editor}
                    onClick={() => editor.chain().focus().undo().run()}
                    isActive={false} // Undo/Redo buttons don't have an active state
                >
                    <Undo className="h-5 w-5" />
                </EditorButton>

                {/* Redo */}
                <EditorButton
                    editor={editor}
                    onClick={() => editor.chain().focus().redo().run()}
                    isActive={false} // Undo/Redo buttons don't have an active state
                >
                    <Redo className="h-5 w-5" />
                </EditorButton>
            </div>
        </div>
    );
};

export default Toolbar;