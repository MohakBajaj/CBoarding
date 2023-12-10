"use client"

import { Button } from "@/components/ui/button";
import { EditIcon, Trash2, ImageDown } from "lucide-react";
import { useEffect, useState } from "react";
import DrawingCanvas from "@/components/DrawingCanvas";

export default function Board({ params }: { params: { id: string } }) {
    const [title, setTitle] = useState('Untitled')
    useEffect(() =>
        setTitle(JSON.parse(localStorage.getItem('boards') || '[]').find((board: Board) => board.id === params.id)?.title || 'Untitled'), [params.id]
    )
    function changeTitle() {
        const Title = prompt('Enter the new title of the board', title || 'Untitled')
        if (!Title) return
        const boards = JSON.parse(localStorage.getItem('boards') || '[]')
        const board = boards.find((board: Board) => board.id === params.id)
        board.title = Title
        localStorage.setItem('boards', JSON.stringify(boards))
        document.querySelector('#title')!.innerHTML = `Title: ${Title}`
    }
    function deleteBoard() {
        const boards = JSON.parse(localStorage.getItem('boards') || '[]')
        const board = boards.find((board: Board) => board.id === params.id)
        const index = boards.indexOf(board)
        boards.splice(index, 1)
        localStorage.setItem('boards', JSON.stringify(boards))
        window.location.href = '/'
    }
    function exportBoard() {
        const dataURL = localStorage.getItem(`board-${params.id}`);
        const link = document.createElement('a');
        link.href = dataURL || "";
        link.download = `${title}.png`;
        link.click();
        link.remove();
    }

    return (
        <main className="h-full flex flex-col items-center">
            <div className="w-full flex justify-between items-center mb-2">
                <div className="flex justify-center items-center">
                    <h1 id="title" className="pt-4 pl-4 mr-1 text-2xl font-medium">Title: {title}</h1>
                    <Button variant={"ghost"} size={"icon"} onClick={changeTitle}>
                        <EditIcon className="w-4" />
                    </Button>
                </div>
                <div className="flex gap-1">
                    <Button variant={"outline"} className="mr-4 mt-4 border-black dark:border-white" onClick={exportBoard}>
                        <ImageDown className="w-4" /> &nbsp; Export as PNG
                    </Button>
                    <Button variant={"outline"} className="mr-8 mt-4 border-red-500 text-red-500" onClick={deleteBoard}>
                        <Trash2 className="w-4" /> &nbsp; Delete Board
                    </Button>
                </div>
            </div>
            <div id="board" className="border border-black dark:border-white h-[calc(90%)] w-[calc(95%)]">
                <DrawingCanvas id={params.id} />
            </div>
        </main>
    )
}