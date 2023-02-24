export function getInstruction(msg: string) {
    let instruction =
        `You'll work to determine whether it's abusive or not.\n\
        Say \"{"result": true}\" if there is a swear word and \"{"result": false}\" if there is no swear word.\n\
        Don't say anything else.\n\
        Now I'll tell you, so tell me if there is a swear word or not.'\n\
        "${msg}"\n\
        Let me know if there's a swear word here.`
    return instruction
}
