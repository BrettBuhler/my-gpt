import Settings from "../Classes/Settings"

const getMessages = (messages: string[], settings: Settings) => {
    let resMessages = []
    if (settings.systemMessage !== ""){
        resMessages.push({"role": "system", "content": settings.systemMessage})
    }
    if (settings.remember){
        for (let i = 0; i < messages.length; i++) {
            if (i % 2 === 0) {
                resMessages.push({"role": "user", "content": messages[i]})
            } else {
                resMessages.push({"role": "assistant", "content": messages[i]})
            }
        }
    } else {
        resMessages.push({"role": "user", "content": messages[messages.length - 1]})
    }
    return resMessages
}

export default getMessages