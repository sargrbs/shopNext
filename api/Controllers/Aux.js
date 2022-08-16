import prisma from '../Database/prisma'
import {v4 as uuidv4} from 'uuid';


export default {
    async createAux(req, res) {
        try {
            const data = req.body
            
            const create = data.map((aux) => 
                prisma.aux.create({
                    data: aux
                })
                
            )
            await Promise.all(create)
            
            return res.json(create)

        } catch (error) {
            console.log(error)
            return res.json(error)
        }
    },
    async getAll(req, res){
        try{

            const data = await prisma.aux.findMany()

            return res.json(data)

        }catch(error){
            console.log(error)
            return res.json(error)
        }
    },
    async getAuxByCode(req, res){
        const id = req.params
        const paramsBusca = new URLSearchParams(req.query)
        const group = paramsBusca.get('group')

        try{

            const data = await prisma.aux.findFirst({
                where:{
                    AND: [
                        { group_name: group },
                        { code: id.id }
                    ]
                }
            })

            return res.json(data)

        }catch(error){
            console.log(error)
            return res.json(error)
        }
    },
    async getAuxId(req, res){
        
        const paramsBusca = new URLSearchParams(req.query)
        // const group = paramsBusca.get('group')
        const code = paramsBusca.get('code')
        console.log(code)
        try{

            const data = await prisma.aux.findFirst({
                where: {code: code},
                select: {id: true, name: true},
            })
            console.log(data)

            return res.json(data)

        }catch(error){
            console.log(error)
            return res.json(error)
        }
    },
    async deleteItem(req, res){
        const id = req.params

        try{

            const data = await prisma.aux.delete({
                where:{
                    id: id.id
                }
            })

            return res.json(data)

        }catch(error){
            console.log(error)
            return res.json(error)
        }
    }
}
