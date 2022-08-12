import axios from "axios";
import prisma from "../../Database/prisma";
import {v4 as uuidv4} from 'uuid';
import moment from "moment";

export default async function getToken(){
       
    try{
        const token = await prisma.token.findFirst()
    
        if(token != null){
            const date =  moment().format("DD/MM/YYYY")
            const dateToken = moment(token.expireAt).format("DD/MM/YYYY")

            if(dateToken < date){
                const fetchToken = await axios.get(`http://idealsoftexportaweb.eastus.cloudapp.azure.com:60500/auth/?serie=HIEAPA-600759-ROCT&codfilial=1`)

                const dataToken = fetchToken.data.dados.token

                try{
                    const createToken = await prisma.token.update({
                        where:{
                            id: token.id
                        },
                        data: {
                            token: dataToken
                        }
                    })
                    const getToken = createToken.token
                    return ({success: true, getToken})
                }catch(error){
                    console.log(error)
                    return (error)
                }
            }else{
                const getToken = token.token
                return ({success: true, getToken})
            }
        }else{
            const fetchToken = await axios.get(`http://idealsoftexportaweb.eastus.cloudapp.azure.com:60500/auth/?serie=HIEAPA-600759-ROCT&codfilial=1`)

            const dataToken = fetchToken.data.dados.token
            const expireAt = fetchToken.data.dados.expireAt
            try{
                const createToken = await prisma.token.create({
                    data: {
                        id: uuidv4(),
                        expireAt: moment(expireAt).format("YYYY-MM-DDT00:00:00.000Z"),
                        token: dataToken
                    }
                })
                const getToken = createToken.token
                return ({success: true, getToken})
            }catch(error){
                console.log(error)
                return (error)
            }
        }
    }catch(error){
        console.log(error)
        return (error)
    }

}
