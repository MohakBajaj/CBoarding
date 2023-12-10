'use client'
import Image from "next/image";
import { useTheme } from "next-themes"
import { Button } from "./ui/button";
import { createNewNote } from "@/lib/notes";
import { createNewBoard } from "@/lib/boards";

export function CreateNew() {
    const { resolvedTheme } = useTheme()
    const imageSource = resolvedTheme === 'dark' ? '/dark/logo-big.png' : '/light/logo-big.png';
    return (
        <div className="h-full w-full flex flex-col justify-center items-center select-none">
            <Image className="opacity-90" src={imageSource} width={608} height={229} alt='Create New ...' draggable={false} />
            <div className="flex gap-8">
                <Button className="mt-8" size="lg" onClick={() => {
                    const title = prompt('Enter the title of the note', 'Untitled')
                    if (!title) return
                    const { id } = createNewNote(title || 'Untitled')
                    window.location.href = `/note/${id}`
                }}>Create a New Note</Button>
                <Button className="mt-8" size="lg" onClick={() => {
                    const title = prompt('Enter the title of the board', 'Untitled')
                    if (!title) return
                    const { id } = createNewBoard(title || 'Untitled')
                    window.location.href = `/board/${id}`
                }
                }>Create a New Board</Button>
            </div>
        </div>
    )
};