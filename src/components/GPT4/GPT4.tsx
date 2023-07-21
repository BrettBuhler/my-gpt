import { useState, useEffect } from "react"
//classes
import Settings from "../../Classes/Settings"
//components
import MessageInput from "../MessageInput/MessageInput"
import Welcome from "../Welcome/Welcome"
import LoadingComponent from "../LoadingComponent/LoadingComponent"
//services
import chat from "../../services/chat"
import getMessages from "../../services/getMessages"
//images
import userImage from "../../images/icons8-user-96.png"
import gptImage from "../../images/icons8-ai-100.png"

interface GPT4Props {
    settings: Settings
    clearChat: boolean
    setClearChat: React.Dispatch<React.SetStateAction<boolean>>
}

const GPT4: React.FC<GPT4Props> = ({settings, clearChat, setClearChat}) => {
    const [convo, setConvo] = useState<string[]>([])
    const [bottomSpacing, setBottomSpacing] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [fromWelcome, setFromWelcome] =useState(false)

    useEffect(()=>{
        if (convo.length === 1 && fromWelcome) {
            handleChat()
            setFromWelcome(false)
        }
    },[convo])

    useEffect(() => {
        if (clearChat){
            setConvo([])
            setClearChat(false)
        }
    }, [clearChat])

    const startLoading = () => {
        setIsLoading(true)
    }

    const stopLoading = () => {
        setIsLoading(false)
    }

    const handleChat = async () => {
        startLoading()
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
        stopLoading()
    }

    return (
        <div className="w-full min-h-screen overflow-auto  items-center justify-center text-gray-100 text-lg flex flex-col">
            <div className="flex-grow w-4/5">
                <div className="w-full mx-auto rounded-md mb-12 mt-12">
                    {convo.length === 0 && (
                        <div>
                            <Welcome convo={convo} setConvo={setConvo} setFromWelcome={setFromWelcome}/>
                        </div>
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
            <div className=" bottom-0 left-0 w-full bg-emerald-800 border-t-2 border-white" style={{height: `${bottomSpacing}px`}}></div>
            {isLoading && (<LoadingComponent />)}
        </div>
    )
}

export default GPT4