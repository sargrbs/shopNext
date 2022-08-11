import axios from "axios";
import getToken from '../Token/GetToken';
import signature from "../Token/GetSignature";

export default {
    async getProducts(req, res){
        const fetchToken = await getToken()
        if(fetchToken.success){
            const token = fetchToken.token
            const getSignature = signature({method: "get", data: false})

            const headers = {'Signature': getSignature.signature, 
                        'CodFilial': 1,
                        'Authorization': `Token ${token.token}`,
                        'Timestamp': getSignature.timestamp}
    
            const result = await axios.get('http://idealsoftexportaweb.eastus.cloudapp.azure.com:60500/produtos/1', {data: {}}, {headers: headers})
                .then(function (response) {
                    return res.json(response.data)
                })
                .catch(function (error) {
                    return res.json(error)
            })

            console.log(result)

        }
    }
}