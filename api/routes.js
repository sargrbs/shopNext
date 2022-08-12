import { Router } from 'express';
import Products from './Services/Products/Products';
import GetToken from './Services/Token/GetToken';

const router = Router();

router.get("/", (req, res) => {
    return res.json('Server Running')
})

router.get("/getProducts/:page", Products.getProducts)
router.get("/getProduct/:code", Products.getProduct)
router.get("/getByUrl/:code", Products.getByUrl)
// router.get("/getToken", GetToken.getToken)


export {router}