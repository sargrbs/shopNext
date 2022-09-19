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
    async deleteLink(req, res){
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
    },

    async getProductsByErpCode(req, res){
        try{
            const id = req.params
            const data = await prisma.producterplink.findFirst({
                include:{
                    Product: true,
                    ProductVariations: true
                }
            })
            if(data.ProductId === null){
                const variation = await prisma.ProductVariations.findFirst({
                    where:{
                        id: data.ProductVariationsId
                    },
                    include:{
                        auxs: true,
                    }
                })

                const promises = variation.auxs.map(async (aux) => {
                    
                    const result = await prisma.aux.findFirst({
                        where:{
                            id: aux.auxId
                        }
                    })
                    
                    const code = result.code
                    const group = result.group_name

                    return ({code: code, group: group})
                })

                const arr = await Promise.all(promises)

                return res.json({code: variation.code, aux: arr})
                
            }else{

            }
            // console.log(data)

            return res.json(data)

        }catch(error){
            console.log(error)
            return res.json(error)
        }
    }
}
