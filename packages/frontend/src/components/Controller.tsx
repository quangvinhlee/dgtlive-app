import { GrCaretNext } from "react-icons/gr";
import { GrCaretPrevious } from "react-icons/gr";
import { TbPlayerTrackNext } from "react-icons/tb";
import { TbPlayerTrackPrev } from "react-icons/tb";
import { LuMaximize } from "react-icons/lu";
import { LuFlipVertical2 } from "react-icons/lu";
import { useState } from "react";
import { BoardOrientation } from "react-chessboard/dist/chessboard/types";
interface ControlerProps {
    handleMaxSize: () => void;
    navigateByStep: (step: number) => void,
    onBoardOrientationChanged: (direction: BoardOrientation) => void;
    currentIndex: number;
    total: number;
}
export default function Controler({ navigateByStep, currentIndex, total, handleMaxSize, onBoardOrientationChanged }: ControlerProps) {
    const [orientation, setOrientation] = useState<BoardOrientation>('white');
    const toggleBoardDirection = () => {
        if (orientation == 'white') {
            setOrientation('black')
        }
        else {
            setOrientation('white')
        }

        onBoardOrientationChanged(orientation);
    }
    return (
        <div className={"flex w-full justify-between mt-3"}>
            <button className="hover:bg-blue-700 hover:rounded-full p-1 hover:text-white" onClick={() => navigateByStep(Number.MIN_VALUE)}><TbPlayerTrackPrev /></button>
            <button className="hover:bg-blue-700 hover:rounded-full p-1 hover:text-white" onClick={() => navigateByStep(-1)} disabled={currentIndex === 0}><GrCaretPrevious /></button>
            <button className="hover:bg-blue-700 hover:rounded-full p-1 hover:text-white" onClick={() => navigateByStep(1)} disabled={currentIndex === total - 1}><GrCaretNext /></button>
            <button className="hover:bg-blue-700 hover:rounded-full p-1 hover:text-white" onClick={() => navigateByStep(Number.MAX_VALUE)}><TbPlayerTrackNext /></button>
            <button className="hover:bg-blue-700 hover:rounded-full p-1 hover:text-white"><LuFlipVertical2 onClick={toggleBoardDirection} /></button>
            <button className="hover:bg-blue-700 hover:rounded-full p-1 hover:text-white" onClick={handleMaxSize}><LuMaximize /></button>
        </div>
    )
}