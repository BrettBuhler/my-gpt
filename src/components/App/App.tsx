import './css.css'
import GPT4 from '../GPT4/GPT4'
import TopBar from '../TopBar/TopBar'
import Settings from '../../Classes/Settings'
import { useState } from 'react'
const App = () => {
    const [settings, setSettings] = useState<Settings>(new Settings())
    const [clearChat, setClearChat] = useState<boolean>(false)
    return (
        <div className="app-main max-h-screen">
            <TopBar settings={settings} setSettings={setSettings} setClearChat={setClearChat}/>
            <GPT4 settings={settings} clearChat={clearChat} setClearChat={setClearChat}/>
        </div>
    )
}

export default App