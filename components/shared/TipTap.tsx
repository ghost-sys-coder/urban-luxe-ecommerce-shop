"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { Controller, useFormContext } from "react-hook-form";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Toolbar from "./Toolbar";


// dynamically import the EditorContent component with SSR disabled
const Editor = dynamic(() => import("@tiptap/react").then((mod) => mod.EditorContent), {
    ssr: false
})

interface ProductDescriptionFieldProps {
    name: string;
    label?: string;
    placeholder?: string;
    content: string;
    onChange: (content: string) => void;
}

const TipTap: React.FC<ProductDescriptionFieldProps> = ({
    name,
    label,
    onChange,
}) => {
    const { control, watch } = useFormContext();
    const fieldValue = watch(name);

    const editor = useEditor({
        extensions: [StarterKit, Underline],
        content: fieldValue || "<p></p>",
        editorProps: {
            attributes: {
                class: "flex flex-col px-4 py-4 shadow-md text-gray-400 items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-md",
            },
        },
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            onChange(html);
        },
    });

    useEffect(() => {
        if (editor && fieldValue !== editor.getHTML()) {
            editor.commands.setContent(fieldValue || "<p></p>");
        }
    }, [fieldValue, editor]);

    return (
        <div className="">
            {label && <label className="block text-sm font-medium mb-2">{label}</label>}
            <Controller
                name={name}
                control={control}
                render={({ fieldState: { error } }) => (
                    <div>
                        <Toolbar editor={editor} />
                        <Editor
                            style={{ whiteSpace: "pre-line" }}
                            editor={editor}
                            className="editor-container"
                        />
                        {error && (
                            <p className="text-sm text-destructive mt-1">
                                {error.message}
                            </p>
                        )}
                    </div>
                )}
            />
        </div>
    );
};

export default TipTap;