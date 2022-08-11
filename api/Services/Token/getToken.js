import axios from "axios";

export default {
    async token(req, res){
        const token = await axios.get(`http://idealsoftexportaweb.eastus.cloudapp.azure.com:60500/auth/?serie=HIEAPA-600759-ROCT&codfilial=1`)
        
    }
}