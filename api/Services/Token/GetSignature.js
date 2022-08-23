import crypto from "crypto"

export default function signature(params){ 
    const data = params.data != false ? params.data : false

    const method = params.method 

    const date = new Date()

    const getTimestamp = Math.floor(date.getTime() / 1000)

    const timestamp = getTimestamp

    const key = 'senha'

    const reqdata = JSON.stringify(data)

    const dataPost = params.data != false ? Buffer.from(reqdata).toString('base64') : ""
    
    const concatSignature = method + timestamp + dataPost
    
    const cryp = crypto.createHmac("sha256", key).update(concatSignature).digest()
    
    const signature = Buffer.from(cryp).toString('base64')
    
    return ({signature, timestamp})
}