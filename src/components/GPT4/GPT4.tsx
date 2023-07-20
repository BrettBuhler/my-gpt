import { useState } from "react"
import Settings from "../../Classes/Settings"

import MessageInput from "../MessageInput/MessageInput"
import chat from "../../services/chat"
import getMessages from "../../services/getMessages"

import userImage from "../../images/icons8-user-96.png"
import gptImage from "../../images/icons8-ai-100.png"

interface GPT4Props {
    settings: Settings
}

const GPT4: React.FC<GPT4Props> = ({settings}) => {

    const [convo, setConvo] = useState<string[]>([])
    const [userInput, setUserInput] = useState<string>("")
    const [bottomSpacing, setBottomSpacing] = useState<number>(0)

    const handleChat = async () => {
        try {
            const messages = getMessages(convo, settings)
            const response = await chat(settings.model, messages, settings.temperature, settings.maxLength, settings.topP, settings.frequencyPenalty, settings.presencePenalty, settings.stopSequences)
            if (response.data) {
                console.log(response.data)
                let convoCopy = [...convo]
                convoCopy.push(response.data.choices[0].message.content)
                setConvo(convoCopy)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="w-full min-h-screen overflow-auto  items-center justify-center text-gray-100 text-lg flex flex-col">
            <div className="flex-grow w-4/5">
                <div className="w-full mx-auto border-4 border-grey-100 rounded-md mb-12 mt-12">
                    {convo.length === 0 && (
                        <div className="w-full">Add some text or something</div>
                    )}
                    {convo.length > 0 && (
                        convo.map((string, i) => (<div key={`${i}_GPT_DIV_KEY`} className={`flex flex-row ${i % 2 === 0 ? "bg-emerald-800": "bg-emerald-600"} shadow-md ${convo.length > i + 1 ? "border-b-2 border-gray-100" : ""}`}>
                            <img src={i % 2 === 0 ? userImage : gptImage} alt={i % 2 === 0 ? "user image" : "gpt image"}
                                className="w-14 h-14 p-1 rounded-lg"></img>
                            <div className="ml-10 mr-10 font-mono mt-3 mb-3 self-center">{string}</div>
                        </div>))
                    )}
                </div>
            </div>
            <MessageInput setBottomSpacing={setBottomSpacing} convo={convo} setConvo={setConvo} handleChat={handleChat}/>
            <button onClick={()=>handleChat()}>TEST CHAT</button>
            <button onClick={() => console.log(getMessages(convo, settings))}>TEST GETMESS</button>
            <div className=" bottom-0 left-0 w-full bg-emerald-800 border-t-2 border-white" style={{height: `${bottomSpacing}px`}}></div>
        </div>
    )
}

export default GPT4