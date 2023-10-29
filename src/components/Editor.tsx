"use client";

import { useState } from "react";
import { Editor as CBoardingEditor } from 'cboarding-note-editor';

export function Editor({ id }: { id: string }) {
    const [saveStatus, setSaveStatus] = useState("Saved");

    return (
        <div className="relative max-w-[calc(75vw)] m-2 ml-0">
            <div className="absolute right-5 top-5 mb-2 rounded-lg px-2 py-1 text-sm dark:text-black bg-stone-200 dark:bg-white/75">
                {saveStatus}
            </div>
            <CBoardingEditor
                className="w-[calc(75vw)] min-h-[calc(70vh)] max-h-[calc(80vh)] border border-black dark:border-white rounded-sm overflow-y-scroll"
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