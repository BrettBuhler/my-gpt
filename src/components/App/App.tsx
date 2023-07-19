import './css.css'
import GPT4 from '../GPT4/GPT4'
import TopBar from '../TopBar/TopBar'
import Settings from '../../Classes/Settings'
import { useState } from 'react'
const App = () => {
    const [settings, setSettings] = useState<Settings>(new Settings())
    return (
        <div className="app-main max-h-screen">
            <TopBar settings={settings} setSettings={setSettings}/>
            <GPT4 />
        </div>
    )
}

export default App