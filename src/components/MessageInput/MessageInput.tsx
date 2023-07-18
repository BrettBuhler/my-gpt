import { useState, useRef, useEffect } from "react"
import send from "../../images/icons8-forward-arrow-48.png"

const MessageInput = () => {
    const [userInput, setUserInput] = useState<string>("")
    const [isInputFocused, setIsInputFocused] = useState<boolean>(false)
    const [hasScroll, setHasScroll] = useState<boolean>(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const handleUserInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserInput(event.target.value)
        adjustTextareaHeight()
  };

    const handleSend = () => {
        console.log(userInput)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (isInputFocused && event.key === "Enter") {
            handleSend()
        }
    }

    const adjustTextareaHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = '22px'
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
            setHasScroll(textareaRef.current.scrollHeight > textareaRef.current.clientHeight)
        }
    }

    useEffect(() => {
        adjustTextareaHeight()
    }, [])

  return (
    <div className="fixed bottom-0 left-0 w-screen pt-2 mb-4">
        <div className="flex justify-center w-4/5 m-auto border-green-900 border-4 bg-cyan-900 rounded-xl max-h-50">
            <div className="flex w-4/5 rounded-xl shadow-xs items-center">
                <textarea
                className={`appearance-none m-0 w-full resize-none border-0 bg-transparent text-lg pl-4 pr-4 focus:outline-none text-gray-300 placeholder-gray-300 overflow-y-auto max-h-48 ${hasScroll ? "pt-4 pb-4" : ""}`}
                placeholder="Send message"
                ref={textareaRef}
                onChange={handleUserInput}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                value={userInput}
                />
            </div>
            <div className={`w-1/5 flex content-center hover:bg-emerald-900 hover:rounded-r-xl ${!hasScroll ? "border-l-4 border-gray-300" : ""}`}>
                <button className="w-full" onClick={handleSend}>
                    <img src={send} className="mx-auto" alt="send" />
                </button>
            </div>
        </div>
    </div>
  )
}

export default MessageInput