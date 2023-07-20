import axios from "axios"
const REACT_APP_URL = process.env.REACT_APP_URL

const chat = async (
    model: string,
    messages: object[],
    temperature: number,
    max_tokens: number,
    top_p: number,
    frequency_penalty: number,
    presence_penalty: number,
    stop: string[]) => {

    try {
        const response = await axios.post(`${REACT_APP_URL}api/chat`, {
            model, messages, temperature, max_tokens, top_p, frequency_penalty, presence_penalty, stop
        })
        if (response.data) {
            return response.data
        } else {
            return {error: "no response data"}
        }
    } catch (error) {
        console.error(error)
        return {error: error}
    }
}

export default chat