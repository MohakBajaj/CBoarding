import { Editor } from "@/components/Editor"

export default function Note({ params }: { params: { id: string } }) {
    return (
        <main>
            <h1 className="pt-4 pl-4 text-2xl font-medium">Title: {params.id}</h1>
            <div className="p-4">
                <Editor id={params.id} />
            </div>
        </main>
    )
}