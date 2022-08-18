import axios from "axios";
import getToken from '../Token/GetToken';
import signature from "../Token/GetSignature";

export const shopUrl = process.env.SHOP_URL

export default {
    async getProducts(req, res){
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

                const {page} = req.params

                await axios.get(`${shopUrl}/produtos/${page}`, {headers: headers})
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
    },
    async getProduct(req, res){
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

                const {code} = req.params

                const grid =  await axios.get(`${shopUrl}/estoque/${code}/grade/`, {headers: headers})
                                           
                const product =  await  axios.get(`${shopUrl}/estoque/${code}`, {headers: headers})
               
                const productDetail =  await  axios.get(`${shopUrl}/produtos/detalhes/${code}`, {headers: headers})
                                                       
                const data = {grid:  grid.data, product: product.data, productDetail: productDetail.data}

                return res.json(data)
            }

        }catch(error){
            return res.json(error)
        }
    },
    async getByUrl(req, res){
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

                const url = paramsBusca.get('url')
               
                const result =  await axios.get(`${shopUrl}${url}`, {headers: headers})
                
                const data = {result:  result.data}

                return res.json(data)
            }

        }catch(error){
            return res.json(error)
        }
    }
}