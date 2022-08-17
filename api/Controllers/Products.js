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
    }
}
