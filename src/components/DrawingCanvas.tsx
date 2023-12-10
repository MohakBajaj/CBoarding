import { useEffect, useState, useRef } from "react";
import { Slider } from "./ui/slider";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { XSquare } from "lucide-react";

export default function DrawingCanvas({ id }: { id: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState("#000000");
    const [width, setWidth] = useState([3]);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    const [lastX, setLastX] = useState(0);
    const [lastY, setLastY] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext("2d");
            if (context) {
                setCtx(context);
            }
        }
    }, []);

    useEffect(() => {
        function loadCanvas() {
            const savedDataURL = localStorage.getItem(`board-${id}`) || '';
            if (savedDataURL && ctx) {
                const img = new Image();
                img.onload = () => {
                    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                    ctx.drawImage(img, 0, 0);
                };
                img.src = savedDataURL;
            }
        }
        loadCanvas();
    }, [id, ctx]);

    useEffect(() => {
        if (ctx) {
            ctx.strokeStyle = color;
            ctx.lineWidth = width[0];
        }
    }, [ctx, color, width]);

    function handleMouseDown(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
        setIsDrawing(true);
        setLastX(event.nativeEvent.offsetX);
        setLastY(event.nativeEvent.offsetY);
    }

    function saveCanvas() {
        if (ctx) {
            const dataURL = ctx.canvas.toDataURL();
            localStorage.setItem(`board-${id}`, dataURL);
        }
    }

    function handleMouseUp() {
        saveCanvas();
        setIsDrawing(false);
    }

    function handleMouseMove(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
        if (!isDrawing) {
            return;
        }
        if (ctx) {
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
            ctx.stroke();
            setLastX(event.nativeEvent.offsetX);
            setLastY(event.nativeEvent.offsetY);
        }
    }

    function clearCanvas() {
        if (ctx) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }
    }


    return (
        <div className="h-full w-full flex">
            <canvas
                className="border-r border-black dark:border-white bg-white"
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                width={canvasRef.current?.parentElement?.clientWidth ? canvasRef.current.parentElement.clientWidth * 0.85 : undefined}
                height={canvasRef.current?.parentElement?.clientHeight}
            />
            <div className="flex flex-col w-full">
                <h1 className="text-2xl font-medium text-center border-b border-black dark:border-white w-full p-1">Controls</h1>
                <div className="flex justify-center p-2 border-b border-black dark:border-white">
                    <Button variant={"outline"} className="border-black dark:border-white" onClick={clearCanvas}>
                        <XSquare className="w-4" /> &nbsp; Clear Canvas
                    </Button>
                </div>
                <div className="flex justify-between p-2 border-b border-black dark:border-white">
                    <div className='flex select-none items-center justify-between'>
                        <Label>Stroke Color</Label>
                    </div>
                    <input
                        className=""
                        type="color"
                        name="stroke-color"
                        id="stroke-color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                </div>
                <div className="p-2 border-b border-black dark:border-white">
                    <div className='mb-4 flex select-none items-center justify-between'>
                        <Label>Stroke Width</Label>
                        <span className='px-2 py-0.5 text-sm'>
                            {width[0]}
                        </span>
                    </div>
                    <Slider
                        min={1}
                        max={10}
                        step={1}
                        value={width}
                        onValueChange={setWidth}
                        className='[&_[role=slider]]:h-4 [&_[role=slider]]:w-4'
                        aria-label='Stroke width'
                    />
                </div>
            </div>
        </div>
    );
}