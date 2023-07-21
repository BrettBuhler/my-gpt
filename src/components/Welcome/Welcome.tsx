import sunImage from '../../images/icons8-sun-50.png'
import lightningImage from '../../images/icons8-lightning-bolt-48.png'
import warningImage from '../../images/icons8-warning-50.png'
import { useEffect } from 'react'

interface WelcomeProps {
    convo: string[]
    setConvo: React.Dispatch<React.SetStateAction<string[]>>
    setFromWelcome: React.Dispatch<React.SetStateAction<boolean>>
}

const Welcome: React.FC<WelcomeProps> = ({ convo, setConvo, setFromWelcome}) => {
    const text = ["\"Explain quantum computing in simple terms\" →", "Remembers what user said earlier in the conversation", "May occasionally generate incorrect information", "\"Got any creative ideas for a 10 year old's birthday?\" →", "Allows user to provide follow-up corrections", "May occasionally produce harmful instructions or biased content", "\"How do I make an HTTP request in Javascript?\" →", "Trained to decline inappropriate requests", "Limited knowledge of world and events after 2021"]

    const updateConvo = (str: string) => {
        setFromWelcome(true)
        setConvo([str])
    }

    return (
        <div className="flex flex-col">
            <h1 className="text-center text-4xl pt-4 font-bold mb-10">My GPT</h1>
            <div className="flex-grow  m-2 grid grid-cols-3 gap-4">
                <div className="col-span-1 bg-transparent p-4 flex items-center justify-center" style={{maxHeight: '100px'}}>
                    <div className='flex flex-col justify-center items-center'>
                        <img src={sunImage} style={{height: '50px', width: '50px'}} alt="sun"/>
                        <div className='font-semibold text-xl'>Examples</div>
                    </div>
                </div>
                <div className="col-span-1 bg-transparent p-4 flex items-center justify-center" style={{maxHeight: '100px'}}>
                    <div className='flex flex-col justify-center items-center'>
                        <img src={lightningImage} style={{height: '50px', width: '50px'}} alt="lightning bolt"/>
                        <div className='font-semibold text-xl'>Capabilities</div>
                    </div>
                </div>
                <div className="col-span-1 bg-transparent p-4 flex items-center justify-center" style={{maxHeight: '100px'}}>
                    <div className='flex flex-col justify-center items-center'>
                        <img src={warningImage} style={{height: '50px', width: '50px'}} alt="warning"/>
                        <div className='font-semibold text-xl'>Limitations</div>
                    </div>
                </div>
                <div onClick={()=>{updateConvo("Explain quantum computing in simple terms")}}className="flex items-center col-span-1 bg-emerald-600 shadow-md p-4 rounded-lg hover:rounded-sm hover:cursor-pointer hover:bg-emerald-900">{text[0]}</div>
                <div className="flex items-center col-span-1 bg-emerald-600 shadow-md p-4 rounded-lg ">{text[1]}</div>
                <div className="flex items-center col-span-1 bg-emerald-600 shadow-md p-4 rounded-lg ">{text[2]}</div>
                <div onClick={()=>{updateConvo("Got any creative ideas for a 10 year old's birthday?")}} className="flex items-center col-span-1 bg-emerald-600 shadow-md p-4 rounded-lg hover:rounded-sm hover:cursor-pointer hover:bg-emerald-900">{text[3]}</div>
                <div className="flex items-center col-span-1 bg-emerald-600 shadow-md p-4 rounded-lg">{text[4]}</div>
                <div className="flex items-center col-span-1 bg-emerald-600 shadow-md p-4 rounded-lg">{text[5]}</div>
                <div onClick={()=>{updateConvo("How do I make an HTTP request in Javascript?")}} className="flex items-center col-span-1 bg-emerald-600 shadow-md p-4 rounded-lg hover:rounded-sm hover:cursor-pointer hover:bg-emerald-900">{text[6]}</div>
                <div className="flex items-center col-span-1 bg-emerald-600 shadow-md p-4 rounded-lg">{text[7]}</div>
                <div className="flex items-center col-span-1 bg-emerald-600 shadow-md p-4 rounded-lg">{text[8]}</div>
            </div>
        </div>
    )
}

export default Welcome