export default function Board({ params }: { params: { id: string } }) {
    return (
        <div>
            <h1>Board</h1>
            <p>{params.id}</p>
        </div>
    )
}