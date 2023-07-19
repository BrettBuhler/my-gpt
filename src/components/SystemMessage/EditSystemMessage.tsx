import { useState } from "react"

import SystemMessage from "./SystemMessage"
import editImage from "../../images/icons8-edit-64.png"

interface EditSystemMessageProps {
    sysmsg: string
    setSysmsg: React.Dispatch<React.SetStateAction<string>>
}

const EditSystemMessage: React.FC<EditSystemMessageProps> = ({ sysmsg, setSysmsg }) => {
    const [isSys, setIsSys] = useState<boolean>(false)

    const handleClick = () => {
        setIsSys(!isSys)
    }

    return (
        <div className="flex items-center justify-between">
            <div className="font-semibold mt-2">System Message:</div>
            <button onClick={handleClick} style={{height: "24px", width: "24px"}} className="mr-5">
                <img src={editImage}></img>
            </button>
            <SystemMessage sysmsg={sysmsg} setSysmsg={setSysmsg} isSys={isSys} setIsSys={setIsSys}/>
        </div>
    )
}

export default EditSystemMessage