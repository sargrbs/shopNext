import prisma from '../Database/prisma'
import {v4 as uuidv4} from 'uuid';


export default {
    async createProduct(req, res) {
        const createData = req.body
        try{
            const data = await prisma.product.create({
                data: createData.createProduct
            })

            return res.json(data)

        }catch(error){

            console.log(error)
            return res.status(500).json(error)
        }
    },

    async createMany(req, res) {
        try {
            const data = req.body
            
            const create = data.createMany.map((prod) => 
                prisma.product.create({
                    data: prod.createProduct
                })
                
            )
            
            const total = await Promise.all(create)
            

            console.log(total)
            
            return res.json(create)

        } catch (error) {
            console.log(error)
            return res.json(error)
        }
    },

    async getProducts(req, res){
        try{
            const data = await prisma.product.findMany({
                include:{
                    ProductVariations: {
                        select: {
                            name: true,
                            code: true,
                            productStock: true
                        }
                    },
                    ProductStock: true,
                    auxs: {
                        select:{
                            aux: true
                        }
                    }
                }
            })

            return res.json(data)
        }catch(error){
            console.log(error)

            return res.json(error)
        }
    },

    async deleteProduct(req, res){
        const id = req.params
        try{
            const deleteProduct = await prisma.product.delete({
                where: {
                    id: id.id
                }
            })
            return res.json(deleteProduct)
        }catch(error){
            console.log(error)
            return res.json(error)
        }
    }
}
