import { useState, useEffect } from "react"

interface SystemMessageProps {
    sysmsg: string
    isSys: boolean
    setSysmsg: React.Dispatch<React.SetStateAction<string>>
    setIsSys: React.Dispatch<React.SetStateAction<boolean>>
}

const SystemMessage: React.FC<SystemMessageProps> = ({sysmsg, setSysmsg, isSys, setIsSys}) => {
    const [tempmsg, setTempmsg] = useState<string>(sysmsg)

    const getXandY = ():number[] | boolean =>{
        const el = document.getElementById("config-main")
        if (el) {
            const x = el.clientWidth
            const y = el.clientHeight
            return [x, y]
        } else {
            return false
        }
    }

    const [xandY, setXandY] = useState<number[] | boolean>(getXandY())

    useEffect(()=>{
        setXandY(getXandY())
    }, [isSys])

    const handleChange = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
        setTempmsg(event.target.value)
    }

    const handleSave = () => {
        setSysmsg(tempmsg)
        setIsSys(false)
    }

    const handleCancel = () => {
        setTempmsg(sysmsg)
        setIsSys(false)
    }

    if (!isSys) {
        return null
    }

    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-52">
            <div className=" bg-white p-4 rounded shadow-lg h-full flex flex-col" style={{height:`${typeof xandY === "boolean" ? '0' : xandY[1]}px`, width: `${typeof xandY === "boolean" ? '0' : xandY[0]}px`}}>
                <div className="font-semibold mb-2">System Message:</div>
                <textarea onChange={handleChange} value={tempmsg} className="flex-grow border-2 border-black rounded-md p-2" placeholder="Enter your system message (optional)"/>
                <div className="flex space-x-4 border-t-2 border-black pt-4 mt-2 justify-between">
                    <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 w-3/5">Save</button>
                    <button onClick={handleCancel} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 w-3/5">Cancel</button>
                </div>
            </div>
        </div>
    )    
}

export default SystemMessage