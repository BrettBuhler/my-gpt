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

    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0})
    const [isTempTooltip, setIsTempTooltip] = useState<boolean>(false)
    const [IsMaxLenTooltip, setIsMaxLenTooltip] = useState<boolean>(false)
    const [isStopSeqTooltip, setIsStopSeqTooltip] = useState<boolean>(false)
    const [isTopPTooltip, setIsTopPTooltip] = useState<boolean>(false)
    const [isFreqPenTooltip, setIsFreqPenTooltip] = useState<boolean>(false)
    const [isPresPenTooltip, setIsPresPenTooltip] = useState<boolean>(false)
    const [isRememberHistoryTooltip, setIsRememberHistoryTooltip] = useState<boolean>(false)
    const [isSystemMessageTooltip, setIsSystemMessageTooltip] = useState<boolean>(false)



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

    const handleMouseEnter = (event: React.MouseEvent) => {
        const targetId = event.currentTarget.id
        toolTipSwitch(targetId)
        setTooltipPosition({x: event.currentTarget.getBoundingClientRect().left, y: event.currentTarget.getBoundingClientRect().top})
    }

    const toolTipSwitch = (str: string) => {
        switch (str) {
            case "temp":
                setIsTempTooltip(true)
                break
            case "max_len":
                setIsMaxLenTooltip(true)
                break
            case "stop_seq":
                setIsStopSeqTooltip(true)
                break
            case "top_p":
                setIsTopPTooltip(true)
                break
            case "freq_pen":
                setIsFreqPenTooltip(true)
                break
            case "pres_pen":
                setIsPresPenTooltip(true)
                break
            case "rem_his":
                setIsRememberHistoryTooltip(true)
                break
            case "sys_msg":
                setIsSystemMessageTooltip(true)
                break
        }
    }

    useEffect(()=>{
        const newMax = getMaxLen(model)
        setMaxLen(newMax)
        if (maxLength > newMax){
            setMaxLength(newMax)
        }
    },[model])

    useEffect(() => {
        if (!isConfig){
            handleCancel()
        }
    }, [settings])

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
        setModel(settings.model)
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
                    <div className="font-semibold" id="max_len" onMouseEnter={handleMouseEnter} onMouseLeave={()=>setIsMaxLenTooltip(false)}>Max Length:</div>
                    {IsMaxLenTooltip && (
                        <CustomTooltip text="The maximum number of tokens to generate. Requests can use up to 2,048 or 4,000 tokens shared between prompt and completion. The exact limit varies by model. One token is roughly 4 characters for normal English text." position={tooltipPosition}/>
                    )}
                    <SliderSelect min={1} max={maxLen} value={maxLength} setValue={setMaxLength} isInt={true}/>
                </div>
                <div className="mt-2">
                    <div className="font-semibold" onMouseEnter={handleMouseEnter} onMouseLeave={()=>setIsTempTooltip(false)} id="temp">Temperature:</div>
                    {isTempTooltip && (
                        <CustomTooltip text="Controls randomness: Lowering results in less random completions. As the temperature approaches zero, the model will become deterministic and repetitive." position={tooltipPosition}/>
                    )}
                    <SliderSelect min={0} max={2} value={temp} setValue={setTemp}/>
                </div>
                <div className="mt-2">
                    <div className="font-semibold mb-2" id="stop_seq" onMouseEnter={handleMouseEnter} onMouseLeave={() => setIsStopSeqTooltip(false)}>Stop Sequences:</div>
                    {isStopSeqTooltip && (
                        <CustomTooltip text="Up to four sequences where the API will stop generating further tokens. The returned text will not contain the stop sequence." position={tooltipPosition} />
                    )}
                    <ItemInput items={stopSeq} setItems={setStopSeq}/>
                </div>
                <div className="mt-2">
                    <div className="font-semibold mb-2" id="top_p" onMouseEnter={handleMouseEnter} onMouseLeave={() => setIsTopPTooltip(false)}>Top P:</div>
                    {isTopPTooltip && (
                        <CustomTooltip text="Controls diversity via nucleus sampling: 0.5 means half of all likelihood-weighted options are considered." position={tooltipPosition}/>
                    )}
                    <SliderSelect min={0} max={1} value={topP} setValue={setTopP}/>
                </div>
                <div>
                    <div className="font-semibold mb-2" id="freq_pen" onMouseEnter={handleMouseEnter} onMouseLeave={()=>setIsFreqPenTooltip(false)}>Frequency Penalty:</div>
                    {isFreqPenTooltip && (
                        <CustomTooltip text="How much to penalize new tokens based on their existing frequency in the text so far. Decreases the model's likelihood to repeat the same line verbatim." position={tooltipPosition} />
                    )}
                    <SliderSelect min={0} max={2} value={freqPen} setValue={setFreqPen}/>
                </div>
                <div>
                    <div className="font-semibold mb-2" id="pres_pen" onMouseEnter={handleMouseEnter} onMouseLeave={()=>setIsPresPenTooltip(false)}>Presence Penalty:</div>
                    {isPresPenTooltip && (
                        <CustomTooltip text="How much to penalize new tokens based on whether they apear in the text so far. Increases the model's likelihood to talk about new topics." position={tooltipPosition} />
                    )}
                    <SliderSelect min={0} max={2} value={presPen} setValue={setPresPen}/>
                </div>
                <div className="mt-2">
                    <RememberChatHistory rememberHistory={remember} setRememberHistory={setRemember} isRememberHistoryTooltip={isRememberHistoryTooltip} setIsRememberHistoryTooltip={setIsRememberHistoryTooltip} handleMouseEnter={handleMouseEnter} tooltipPosition={tooltipPosition}/>
                </div>
                <div>
                    <EditSystemMessage sysmsg={sysmsg} setSysmsg={setSysmsg} isSystemMessageTooltip={isSystemMessageTooltip} setIsSystemMessageTooltip={setIsSystemMessageTooltip} handleMouseEnter={handleMouseEnter} tooltipPosition={tooltipPosition}/>
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