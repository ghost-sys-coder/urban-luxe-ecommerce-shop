import React from 'react'
import { Editor } from '@tiptap/react'
import { cn } from '@/lib/utils';

interface EditorButtonProps {
    editor: Editor | null;
    children: React.ReactNode,
    isActive: boolean;
    onClick: () => void;
    className?: string;
}
const EditorButton: React.FC<EditorButtonProps> = ({ editor, children, onClick, className="", isActive }) => {
    if (!editor) {
        return null;
    }
    return (
        <button
            type='button'
            className={cn("p-2 rounded-lg transition-colors", isActive ? "bg-sky-700 text-white" : "text-sky-500 hover:bg-sky-200", className)}
            onClick={(e) => {
                e.preventDefault();
                onClick();
            }}>
            {children}
        </button>
    )
}

export default EditorButton