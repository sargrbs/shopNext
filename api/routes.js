import { Router } from 'express';
import Products from './Services/Products/Products';
import Aux from './Services/Products/ProductAux';

const router = Router();

router.get("/", (req, res) => {
    return res.json('Server Running')
})

router.get("/getProducts/:page", Products.getProducts)
router.get("/getProduct/:code", Products.getProduct)
router.get("/getByUrl", Products.getByUrl)
router.get("/getAux", Aux.getAux)


export {router}