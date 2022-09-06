import prisma from '../Database/prisma'
import {v4 as uuidv4} from 'uuid';
import { Prisma } from '@prisma/client';


export default {
    async createLinkVariation(req, res) {
        try {
            const {web_erp_code, productId} = req.body
            const create = await prisma.producterplink.create({
                data: {
                    id: uuidv4(),
                    erp_code: web_erp_code,
                    ProductVariations:{
                        connect: {
                            id: productId
                        }
                    },
                }
            })

            return res.json(create)

        } catch (error) {
            console.log(error)
            return res.json(error)
        }
    },
    async createLink(req, res) {
        try {
            const {web_erp_code, productId} = req.body
            
            const create = await prisma.producterplink.create({
                data: {
                    id: uuidv4(),
                    erp_code: web_erp_code,
                    Product:{
                        connect: {
                            id: productId
                        }
                    },
                    ProductVariations:{
                    },
                }
            })

            

            return res.json(create)

        } catch (error) {
            console.log(error)
            return res.json(error)
        }
    },
    async getAll(req, res){
        try{

            const data = await prisma.producterplink.findMany({
                include:{
                    Product: true,
                    ProductVariations: true
                }
            })

            return res.json(data)

        }catch(error){
            console.log(error)
            return res.json(error)
        }
    },
    async deleteItem(req, res){
        const id = req.params

        try{

            const data = await prisma.producterplink.delete({
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
