'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Plus, Folder, StickyNote, Pen } from 'lucide-react'
import { Button } from "./ui/button";
import { createNewNote } from "@/lib/notes";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";


export function Sidebar() {
    const [notes, setNotes] = useState<Note[]>([])
    const [boards, setBoards] = useState<Board[]>([])
    const [folders, setFolders] = useState<Folder[]>([])
    const [selected, setSelected] = useState('')
    const [selectedType, setSelectedType] = useState('')
    const [selectedName, setSelectedName] = useState('')

    const pathname = usePathname();

    useEffect(() => {
        setNotes(JSON.parse(localStorage.getItem('notes') || '[]'))
        setBoards(JSON.parse(localStorage.getItem('boards') || '[]'))
        setFolders(JSON.parse(localStorage.getItem('folders') || '[]'))
        const id = pathname.split('/')[2]
        if (pathname.includes('/note') && pathname.split('/').length === 3) {
            setSelected(id || '');
            setSelectedType('note')
            setSelectedName(notes.find((note) => note.id === id)?.title || '');
        } else if (pathname.includes('/board') && pathname.split('/').length === 3) {
            setSelected(id || '');
            setSelectedType('board')
            setSelectedName(boards.find((board) => board.id === id)?.title || '');
        }
    }, [pathname, notes, boards])

    function createNEW(type: string,) {
        if (type === 'note') {
            const title = prompt('Enter the title of the note', 'Untitled')
            if (!title) return
            const { id } = createNewNote(title || 'Untitled')
            window.location.href = `/note/${id}`
        }
    }

    return (
        <aside className="h-full w-56 border-r border-black dark:border-white bg-background/80 saturate-200 backdrop-blur-sm overflow-y-scroll no-scrollbar">

            <div className="flex items-center justify-between p-2 border-b border-black dark:border-white">
                <h1 className="text-base font-medium select-none">Your Space</h1>
                <TooltipProvider>
                    <Tooltip>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="sm" className="border border-black dark:border-white">
                                        <Plus className="w-4" />
                                        <span className="sr-only">Create Notes/Boards</span>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                    <p>Create Notes/Boards</p>
                                </TooltipContent>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="border-black">
                                <DropdownMenuItem onClick={() => createNEW("note")}>
                                    <StickyNote className="w-4" /> &nbsp; Create a new Note
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Pen className="w-4" /> &nbsp; Create a new Board
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Folder className="w-4" /> &nbsp; Create a new Folder
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </Tooltip>
                </TooltipProvider>
            </div>

            {notes && notes.length > 0 && notes.map((note) => {
                return (
                    <a key={note.id} href={`/note/${note.id}`}>
                        <div className="flex items-center justify-between p-2 border-b hover:bg-gray-100 dark:hover:bg-gray-50/30">
                            <div className="flex items-center gap-2">
                                <StickyNote className="w-4" />
                                <p className="text-sm select-none">{note.title}</p>
                            </div>
                        </div>
                    </a>
                )
            })
            }


        </aside>
    )
}