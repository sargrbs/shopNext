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
                const msgSuccess = []
                const msgError = []
                const clients = req.body

                await Promise.all(clients.map( async (client) => {
                    const getSignature = signature({method: "post", data: client})
                    const headers = {
                        'Signature': getSignature.signature, 
                        'CodFilial': 1,
                        'Authorization': `Token ${token}`,
                        'Timestamp': getSignature.timestamp
                    }
                    
                    await axios.post(`${shopUrl}/clientes/`, client, {headers: headers})
                    .then(function (response) {
                        response.data.sucesso 
                        ?
                            msgSuccess.push(`Sucesso ao criar ${client.nome} / Código gerado  ${response.data.dados.codigoGerado}`)
                        :
                            msgError.push(`Erro ao criar ${client.nome} /  ${response.data.mensagem}`)

                        
                    })
                    .catch(function (error) {
                        return res.json(error)
                        // msgRes.push(`Erro ao criar ${client.nome} mensagem: ${error.dados.mensagem}`)
                    })
                }))

                // console.log(msgSuccess, msgError)
                return res.json({msgSuccess, msgError})
            }

        }catch(error){
            return res.json(error)
        }
    }
}