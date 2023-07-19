import Settings from "../../Classes/Settings"
import { useEffect, useState } from "react"
import SliderSelect from "../SliderSelect/SliderSelect"
import ItemInput from "../ItemInput/ItemInput"
import ModelSelect from "../ModelSelect/ModelSelect"
import RememberChatHistory from "../RememberChatHistory/RememberChatHistory"
import EditSystemMessage from "../SystemMessage/EditSystemMessage"
import CustomTooltip from "../CustomTooltip/CustomTooltip"

interface ConfigureProps {
    settings: Settings
    setSettings: React.Dispatch<React.SetStateAction<Settings>>
    isConfig: boolean
    setIsConfig: React.Dispatch<React.SetStateAction<boolean>>
}

const Configure: React.FC<ConfigureProps> = ({settings, setSettings, isConfig, setIsConfig}) => {
    const [temp, setTemp] = useState<number>(settings.temperature)
    const [model, setModel] = useState<string>(settings.model)
    const [stopSeq, setStopSeq] = useState<string[]>(settings.stopSequences)
    const [freqPen, setFreqPen] = useState<number>(settings.frequencyPenalty)
    const [presPen, setPresPen] = useState<number>(settings.presencePenalty)
    const [topP, setTopP] = useState<number>(settings.topP)
    const [remember, setRemember] = useState<boolean>(settings.remember)
    const [maxLength, setMaxLength] = useState<number>(settings.maxLength)
    const [sysmsg, setSysmsg] = useState<string>(settings.systemMessage)

    const [isTempTooltip, setIsTempTooltip] = useState<boolean>(false)

    const getMaxLen = (model: string): number => {
        switch (model){
            case "gpt-3.5-turbo-16k":
                return 16000
            case "gpt-3.5-turbo-16k-0613":
                return 16000
            case "gpt-3.5-turbo":
                return 4000
            case "gpt-3.5-turbo-0613":
                return 4000
            default:
                return 2048
        }
    }

    const [maxLen, setMaxLen] = useState<number>(getMaxLen(settings.model))

    useEffect(()=>{
        const newMax = getMaxLen(model)
        setMaxLen(newMax)
        if (maxLength > newMax){
            setMaxLength(newMax)
        }
    },[model])

    const handleCancel = () => {
        setTemp(settings.temperature)
        setStopSeq(settings.stopSequences)
        setFreqPen(settings.frequencyPenalty)
        setPresPen(settings.presencePenalty)
        setTopP(settings.topP)
        setRemember(settings.remember)
        setMaxLength(settings.maxLength)
        setMaxLen(getMaxLen(settings.model))
        setSysmsg(settings.systemMessage)
        setIsConfig(false)
    }

    const handleSave = () => {
        const stopSeqFilter = stopSeq.filter(x => x!== "")
        setStopSeq(stopSeqFilter)
        const newSettings = new Settings(model, temp, maxLength, stopSeqFilter, topP, freqPen, presPen, remember, sysmsg)
        setSettings(newSettings)
        setIsConfig(false)
    }

    if (!isConfig){
        return null
    }
    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-90 flex items-center justify-center z-50">
            <div className="absolute bg-white p-4 rounded shadow-lg custom-max-height" id="config-main">
                <div>
                    <ModelSelect model={model} setModel={setModel}/>
                </div>
                <div className="mt-2">
                    <div className="font-semibold">Max Length:</div>
                    <SliderSelect min={1} max={maxLen} value={maxLength} setValue={setMaxLength} isInt={true}/>
                </div>
                <div className="mt-2">
                    <div className="font-semibold" onMouseEnter={()=>setIsTempTooltip(true)} onMouseLeave={()=>setIsTempTooltip(false)}>Temperature:</div>
                    {isTempTooltip && (
                        <CustomTooltip text="text text" position="right"/>
                    )}
                    <SliderSelect min={0} max={2} value={temp} setValue={setTemp}/>
                </div>
                <div className="mt-2">
                    <div className="font-semibold mb-2">Stop Sequences:</div>
                    <ItemInput items={stopSeq} setItems={setStopSeq}/>
                </div>
                <div className="mt-2">
                    <div className="font-semibold mb-2">Top P:</div>
                    <SliderSelect min={0} max={1} value={topP} setValue={setTopP}/>
                </div>
                <div>
                    <div className="font-semibold mb-2">Frequency Penalty:</div>
                    <SliderSelect min={0} max={2} value={freqPen} setValue={setFreqPen}/>
                </div>
                <div>
                    <div className="font-semibold mb-2">Presence Penalty:</div>
                    <SliderSelect min={0} max={2} value={presPen} setValue={setPresPen}/>
                </div>
                <div className="mt-2">
                    <RememberChatHistory rememberHistory={remember} setRememberHistory={setRemember}/>
                </div>
                <div>
                    <EditSystemMessage sysmsg={sysmsg} setSysmsg={setSysmsg}/>
                </div>
                <div className="flex space-x-4 border-t-2 border-black pt-4 mt-2 justify-between">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 w-3/5" onClick={handleSave}>Save</button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 w-3/5" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default Configure