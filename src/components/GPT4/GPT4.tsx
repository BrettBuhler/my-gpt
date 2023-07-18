import { useState } from "react"

import MessageInput from "../MessageInput/MessageInput"

import userImage from "../../images/icons8-user-96.png"
import gptImage from "../../images/icons8-ai-100.png"

const GPT4 = () => {

    const [convo, setConvo] = useState<string[]>(["hi", "Let's break down the code: The mx-auto class is used to horizontally center the <div> element by setting the left and right margins to. The w-4/5 class sets the width of the <div> element to 80% (4/5) of its parent container. It calculates the width based on the available space. You can adjust the w-4/5 class to any fraction or percentage to achieve the desired width. For example, w-3/4 for 75% width or w-1/2 for 50% width. By combining these classes, the <div> element will have a width of 80% and be centered horizontally within its parent container.", "yo", "chees"])
    const [userInput, setUserInput] = useState<string>("")

    return (
        <div className="w-screen min-h-screen overflow-auto  items-center justify-center text-gray-300 text-lg">
            <div className="w-4/5 mx-auto border-4 border-green-900 rounded-md mb-24 mt-12">
                {convo.map((string, i) => (<div className={`flex flex-row ${i % 2 === 0 ? "bg-emerald-800": "bg-emerald-600"} shadow-md ${convo.length > i + 1 ? "border-b-2 border-green-900" : ""}`}>
                    <img src={i % 2 === 0 ? userImage : gptImage} alt={i % 2 === 0 ? "user image" : "gpt image"}
                    className="w-14 h-14 p-1 rounded-lg"></img>
                    <div className="ml-10 mr-10 font-mono mt-3 mb-3 self-center">{string}</div>
                </div>))}
            </div>
            <MessageInput />
        </div>
    )
}

export default GPT4