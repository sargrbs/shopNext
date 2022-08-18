import axios from "axios";
import getToken from '../Token/GetToken';
import signature from "../Token/GetSignature";
import {v4 as uuidv4} from 'uuid';

export const shopUrl = process.env.SHOP_URL

export default {
    async getAux(req, res){
        try{
            const fetchToken = await getToken()
           
            if(fetchToken.success){
                const token = fetchToken.getToken
                const getSignature = signature({method: "get", data: false})

                const headers = {
                    'Signature': getSignature.signature, 
                    'CodFilial': 1,
                    'Authorization': `Token ${token}`,
                    'Timestamp': getSignature.timestamp
                }

                const paramsBusca = new URLSearchParams(req.query)

                const aux = paramsBusca.get('aux')
                
                await axios.get(`${shopUrl}/aux/${aux}`, {headers: headers})
                .then(function (response) {
                    return res.json(response.data)
                })
                .catch(function (error) {
                    return res.json(error)
                })
            }

        }catch(error){
            return res.json(error)
        }
    }
}