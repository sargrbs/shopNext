import axios from "axios";
import getToken from '../Token/GetToken';
import signature from "../Token/GetSignature";
import {v4 as uuidv4} from 'uuid';

export const shopUrl = process.env.SHOP_URL

export default {
    async create(req, res){
        try{
            const fetchToken = await getToken()
           
            if(fetchToken.success){
                const token = fetchToken.getToken
                const msgRes = []
                const clients = req.body

                await Promise.all(clients.map( async (client) => {
                    const getSignature = signature({method: "get", data: client})

                    const headers = {
                        'Signature': getSignature.signature, 
                        'CodFilial': 1,
                        'Authorization': `Token ${token}`,
                        'Timestamp': getSignature.timestamp
                    }
                    
                    await axios.post(`${shopUrl}/clientes/`, {headers: headers})
                    .then(function (response) {
                        msgRes.push(`Sucesso ao Criar ${client.nome} código gerado ${response.data.dados.codigoGerado}`)
                        
                    })
                    .catch(function (error) {
                        msgRes.push(`Erro ao criar ${client.nome} mensagem: ${error.dados.mensagem}`)
                    })
                }))

                console.log(msgRes)
            }

        }catch(error){
            return res.json(error)
        }
    }
}