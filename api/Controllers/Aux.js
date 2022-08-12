import prisma from '../Database/prisma'
import {v4 as uuidv4} from 'uuid';


export default {
    async createAux(req, res) {
        try {
            const aux = await prisma.aux.findFirst({ where: { code: code } })
            
            if (aux) {
                null
            }else{
                const createAux = await prisma.aux.create({
                    data: {
                        id: uuidv4(),
                        codigo: code,
                        name: name
                    }
                })
            }
            
            const status = null

            return res.json(status)

        } catch (error) {
            return res.json(error)
        }
    }
}
