import { useState } from "react"

import MessageInput from "../MessageInput/MessageInput"

import userImage from "../../images/icons8-user-96.png"
import gptImage from "../../images/icons8-ai-100.png"

const GPT4 = () => {

    const [convo, setConvo] = useState<string[]>(["hi", "Let's break down the code: The mx-auto class is used to horizontally center the <div> element by setting the left and right margins to. The w-4/5 class sets the width of the <div> element to 80% (4/5) of its parent container. It calculates the width based on the available space. You can adjust the w-4/5 class to any fraction or percentage to achieve the desired width. For example, w-3/4 for 75% width or w-1/2 for 50% width. By combining these classes, the <div> element will have a width of 80% and be centered horizontally within its parent container."])
    const [userInput, setUserInput] = useState<string>("")
    const [bottomSpacing, setBottomSpacing] = useState<number>(0)

    return (
        <div className="w-full min-h-screen overflow-auto  items-center justify-center text-gray-100 text-lg flex flex-col">
            <div className="flex-grow">
                <div className="w-4/5 mx-auto border-4 border-grey-100 rounded-md mb-12 mt-12">
                    {convo.map((string, i) => (<div key={`${i}_GPT_DIV_KEY`} className={`flex flex-row ${i % 2 === 0 ? "bg-emerald-800": "bg-emerald-600"} shadow-md ${convo.length > i + 1 ? "border-b-2 border-gray-100" : ""}`}>
                        <img src={i % 2 === 0 ? userImage : gptImage} alt={i % 2 === 0 ? "user image" : "gpt image"}
                        className="w-14 h-14 p-1 rounded-lg"></img>
                        <div className="ml-10 mr-10 font-mono mt-3 mb-3 self-center">{string}</div>
                    </div>))}
                </div>
            </div>
            <MessageInput setBottomSpacing={setBottomSpacing} convo={convo} setConvo={setConvo}/>
            <div className=" bottom-0 left-0 w-full bg-emerald-800 border-t-2 border-white" style={{height: `${bottomSpacing}px`}}></div>
        </div>
    )
}

export default GPT4