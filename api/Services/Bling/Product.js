import axios from "axios";

export const blingKey = process.env.APIBLING

export default {
    async getBlingProduct(req, res){
        const code = req.params
        
        const result = await axios.get(`https://bling.com.br/Api/v2/produto/${code.code}/json/&apikey=${blingKey}`)
        
        return res.json(result.data.retorno.produtos)
    }
}