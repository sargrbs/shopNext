import prisma from '../Database/prisma'
import {v4 as uuidv4} from 'uuid';


export default {
    async create(req, res){
        try{
            const {name, cnpj, serial, branch_number} = req.body

            const company = await prisma.company.create({
                data:{
                    id: uuidv4(),
                    name: name,
                    cnpj: cnpj,
                    serial: serial,
                    branch_number: branch_number
                }
            })

            return res.json(company)
        }catch(error){
            console.log(error)
            return res.json(error)
        }
    },
    async findAll(req, res){
        try{
            const company = await prisma.company.findMany()

            return res.json(company)
        }catch(error){
            console.log(error)
            return res.json(error)
        }
    }, 
    async delete(req, res){
        try{
            const id = req.params
            const company = await prisma.company.delete({
                where:{
                    id: id.id
                }
            })

            return res.json(company)
        }catch(error){
            console.log(error)
            return res.json(error)
        }
    } 
}