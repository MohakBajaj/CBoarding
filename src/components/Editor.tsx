"use client";

import { useState } from "react";
import { Editor as NovelEditor } from "novel";

export function Editor({ id }: { id: string }) {
    const [saveStatus, setSaveStatus] = useState("Saved");

    return (
        <div className="relative w-[85vw]">
            <div className="absolute right-5 top-5 mb-2 rounded-lg px-2 py-1 text-sm dark:text-black bg-stone-200 dark:bg-white/75">
                {saveStatus}
            </div>
            <NovelEditor
                className="w-[85vw] h-[82vh] border rounded-sm overflow-y-scroll"
                defaultValue={"Start typing your note here..."}
                storageKey={`note-${id}`}
                onUpdate={() => {
                    setSaveStatus("Unsaved");
                }}
                onDebouncedUpdate={() => {
                    setSaveStatus("Saving...");
                    // Simulate a delay in saving.
                    setTimeout(() => {
                        setSaveStatus("Saved");
                    }, 500);
                }}
            />
        </div>
    );
}