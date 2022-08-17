import prisma from '../Database/prisma'
import {v4 as uuidv4} from 'uuid';


export default {
    async createProduct(req, res) {
        const createData = req.body
        try{
            const data = await prisma.product.create({
                data: createData.createProduct
            })

            // if(createData.variations != null){
            //     const create = data.map((aux) => 
            //         prisma.productvariations.create({
            //             data: aux
            //         })
                    
            //     )
            //     await Promise.all(create)
            //     const finalData = await prisma.product.findFirst({
            //         where: {
            //             id: data.id
            //         },
            //         include:{
            //             productvariations: true
            //         }
            //     })

            //     return res.json(finalData)
            // }
           

            return res.json(data)

        }catch(error){

            console.log(error)
            return res.json(error)
        }
    }
}
