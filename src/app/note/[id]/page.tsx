"use client"
import { Editor } from "@/components/Editor"
import { Button } from "@/components/ui/button"
import { File, EditIcon, Trash2 } from 'lucide-react'
import { useEffect, useState } from "react";

function exportToPDF() {
    const title = document.querySelector('#title')!;
    const content = document.querySelector('#editor')!;
    const printElement = document.createElement('iframe') as HTMLIFrameElement
    printElement.src = 'about:blank'
    printElement.style.position = 'absolute'
    printElement.style.top = '-9999px'
    document.body.appendChild(printElement)
    printElement.contentWindow!.document.write(title.innerHTML)
    printElement.contentWindow!.document.write(content.innerHTML)
    printElement.contentWindow!.document.close()
    printElement.contentWindow!.focus()
    printElement.contentWindow!.print()
    printElement.contentWindow!.onafterprint = () => {
        document.body.removeChild(printElement)
    }
}


export default function Note({ params }: { params: { id: string } }) {
    const [title, setTitle] = useState('Untitled')
    useEffect(() =>
        setTitle(JSON.parse(localStorage.getItem('notes') || '[]').find((note: Note) => note.id === params.id)?.title || 'Untitled'), [params.id]
    )
    function changeTitle() {
        const Title = prompt('Enter the new title of the note', title || 'Untitled')
        if (!Title) return
        const notes = JSON.parse(localStorage.getItem('notes') || '[]')
        const note = notes.find((note: Note) => note.id === params.id)
        note.title = Title
        localStorage.setItem('notes', JSON.stringify(notes))
        document.querySelector('#title')!.innerHTML = `Title: ${Title}`
    }
    function deleteNote() {
        const notes = JSON.parse(localStorage.getItem('notes') || '[]')
        const note = notes.find((note: Note) => note.id === params.id)
        const index = notes.indexOf(note)
        notes.splice(index, 1)
        localStorage.setItem('notes', JSON.stringify(notes))
        window.location.href = '/'
    }
    return (
        <main>
            <div className="flex justify-between items-center">
                <div className="flex justify-center items-center">
                    <h1 id="title" className="pt-4 pl-4 mr-1 text-2xl font-medium">Title: {title}</h1>
                    <Button variant={"ghost"} size={"icon"} onClick={changeTitle}>
                        <EditIcon className="w-4" />
                    </Button>
                </div>
                <div className="flex gap-1">
                    <Button variant={"outline"} className="mr-4 mt-4 border-black dark:border-white" onClick={exportToPDF}>
                        <File className="w-4" /> &nbsp; Export as PDF
                    </Button>
                    <Button variant={"outline"} className="mr-8 mt-4 border-red-500 text-red-500" onClick={deleteNote}>
                        <Trash2 className="w-4" /> &nbsp; Delete Note
                    </Button>
                </div>
            </div>
            <div id="editor" className="p-4 flex justify-center">
                <Editor id={params.id} />
            </div>
        </main>
    )
}