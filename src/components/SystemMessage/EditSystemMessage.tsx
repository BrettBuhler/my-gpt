import { useState } from "react"

import SystemMessage from "./SystemMessage"
import CustomTooltip from "../CustomTooltip/CustomTooltip"

import editImage from "../../images/icons8-edit-64.png"

interface EditSystemMessageProps {
    sysmsg: string
    setSysmsg: React.Dispatch<React.SetStateAction<string>>
    isSystemMessageTooltip: boolean
    setIsSystemMessageTooltip: React.Dispatch<React.SetStateAction<boolean>>
    handleMouseEnter: (event: React.MouseEvent) => void
    tooltipPosition: {x: number, y: number}
}

const EditSystemMessage: React.FC<EditSystemMessageProps> = ({ sysmsg, setSysmsg, isSystemMessageTooltip, setIsSystemMessageTooltip, handleMouseEnter, tooltipPosition }) => {
    const [isSys, setIsSys] = useState<boolean>(false)

    const handleClick = () => {
        setIsSys(!isSys)
    }

    const adjustPosition = (x: number, y: number) => {
		const newX = x
		const newY = y - 150
		return {x: newX, y: newY}
	}

    return (
        <div className="flex items-center justify-between">
            <div id="sys_msg" className="font-semibold mt-2" onMouseEnter={handleMouseEnter} onMouseLeave={()=>setIsSystemMessageTooltip(false)}>System Message:</div>
            {isSystemMessageTooltip && (
                <CustomTooltip text="By adding a system message, you can instruct the model on how to shape its response or provide context for the conversation. This helps in fine-tuning the model's output to align it with your specific requirements." position={adjustPosition(tooltipPosition.x, tooltipPosition.y)} />
            )}
            <button onClick={handleClick} style={{height: "24px", width: "24px"}} className="mr-5">
                <img src={editImage}></img>
            </button>
            <SystemMessage sysmsg={sysmsg} setSysmsg={setSysmsg} isSys={isSys} setIsSys={setIsSys}/>
        </div>
    )
}

export default EditSystemMessage