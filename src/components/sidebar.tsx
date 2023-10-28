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


function createNewButton(): JSX.Element {
    return (
        <div className="flex items-center justify-between p-2 border-b">
            <h1 className="text-base font-medium select-none">Your Space</h1>
            <TooltipProvider>
                <Tooltip>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm">
                                    <Plus className="w-4" />
                                    <span className="sr-only">Create Notes/Boards</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                <p>Create Notes/Boards</p>
                            </TooltipContent>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <DropdownMenuItem>
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
    )
}

export function Sidebar() {
    return (
        <aside className="h-full z-30 w-56 border-r bg-background/80 saturate-200 backdrop-blur-sm">
            {createNewButton()}

        </aside>
    )
}