import { Router } from 'express';
import Products from './Services/Products/Products'


const router = Router();

router.get("/", (req, res) => {
    return res.json('Server Running')
})

router.get("/getProducts", Products.getProducts)

export {router}