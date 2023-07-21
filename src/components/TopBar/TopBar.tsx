import { useState } from 'react'
import Configure from '../Configure/Configure'

import robotLogo from '../../images/icons8-robot-50.png'
import Settings from '../../Classes/Settings'

interface TopBarProps {
    settings: Settings
    setSettings: React.Dispatch<React.SetStateAction<Settings>>
    setClearChat: React.Dispatch<React.SetStateAction<boolean>>
}

const TopBar: React.FC<TopBarProps> = ({settings, setSettings, setClearChat}) => {
    const [isMenuOpen, setIsMenueOpen] = useState<boolean>(false)
    const [isConfig, setIsConfig] = useState<boolean>(false)

    const toggleMenu = () => {
        setIsMenueOpen(!isMenuOpen)
    }

    const resetConfig = () => {
        const newSettings = new Settings("gpt-3.5-turbo")
        setSettings(newSettings)
    }

    const clearChat = () => [
        setClearChat(true)
    ]

    return (
        <nav className="flex items-center justify-between flex-wrap bg-emerald-800 p-6 border-b-2 border-white">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <img src={robotLogo} className="fill-current h-8 w-8 mr-2"/>
                <span className="font-semibold text-xl tracking-tight">My GPT</span>
            </div>
            <div className="block lg:hidden">
                <button onClick={toggleMenu} className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-emerald-800 hover:border-emerald-800 hover:bg-white">
                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                </button>
            </div>
            <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isMenuOpen ? 'block' : 'hidden'}`}>
                <div className="text-sm lg:flex-grow">
                    <a href="https://github.com/BrettBuhler/my-gpt" target="_blank" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                        Docs
                    </a>
                    <button onClick={clearChat} className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                        Clear Chat
                    </button>
                    <button onClick={resetConfig} className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
                        Reset Configuration
                    </button>
                </div>
                <div>
                    <button onClick={()=>setIsConfig(true)}className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-emerald-800 hover:bg-white mt-4 lg:mt-0">Configure</button>
                </div>
            </div>
            <Configure settings={settings} setIsConfig={setIsConfig} setSettings={setSettings} isConfig={isConfig} />
        </nav>
    )
}

export default TopBar