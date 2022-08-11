import { Router } from 'express';
import Products from './Services/Products/Products';
import GetToken from './Services/Token/GetToken';

const router = Router();

router.get("/", (req, res) => {
    return res.json('Server Running')
})

router.get("/getProducts", Products.getProducts)
// router.get("/getToken", GetToken.getToken)


export {router}