import prisma from '../Database/prisma'

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
                            id: true,
                            web_erp_code: true,
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
    },

    async getProductsByErpCode(req, res){
        const code = req.params
        try{
            const data = await prisma.product.findFirst({
                where:{
                    erp_code: code.code
                }
            })
            return res.json(data)
        }catch(error){
            console.log(error)
            return res.json(error)
        }
    },
    async updateErpCode(req, res){
        try{
            const id = req.params
            const {web_erp_code} = req.body

            const update = await prisma.product.update({
                where:{
                    id: id.id
                },
                data:{
                    web_erp_code: web_erp_code
                }
            })

            return res.json(update)
        }catch(error){
            console.log(error)
        }    
    },
    async updateErpCodeVariation(req, res){
        try{
            const id = req.params
            const {web_erp_code} = req.body

            const update = await prisma.ProductVariations.update({
                where:{
                    id: id.id
                },
                data:{
                    web_erp_code: web_erp_code
                }
            })

            return res.json(update)
        }catch(error){
            console.log(error)
        }
    }
}
