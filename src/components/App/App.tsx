import './css.css'
import GPT4 from '../GPT4/GPT4'
import TopBar from '../TopBar/TopBar'
const App = () => {
    return (
        <div className="app-main max-h-screen">
            <TopBar />
            <GPT4 />
        </div>
    )
}

export default App