export default class Settings {
    public model: string
    public temperature: number
    public maxLength: number
    public stopSequences: string[]
    public topP: number
    public frequencyPenalty: number
    public presencePenalty: number
    public remember: boolean
    public systemMessage: string

    constructor(model: string = "gpt-3.5-turbo", temperature: number = 1, maxLength: number = 256, stopSequences: string[] = [], topP: number = 1, frequencyPenalty: number = 0, presencePenalty: number = 0, remember: boolean = true, systemMessage: string = "") {
        this.model = model
        this.temperature = temperature
        this.maxLength = maxLength
        this.stopSequences = stopSequences
        this.topP = topP
        this.frequencyPenalty = frequencyPenalty
        this.presencePenalty = presencePenalty
        this.remember = remember
        this.systemMessage = systemMessage
    }

}