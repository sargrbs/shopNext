import { Router } from 'express';
import Products from './Services/Products/Products';
import GetProductAux from './Services/Products/ProductAux';
import Aux from './Controllers/Aux'

const router = Router();

router.get("/", (req, res) => {
    return res.json('Server Running')
})

//Routes to get products from Shop 9
router.get("/getProducts/:page", Products.getProducts)
router.get("/getProduct/:code", Products.getProduct)

//Route to get items seting the url 
router.get("/getByUrl", Products.getByUrl)

//Routes to get "Aux" as product variations from Shop 9
router.get("/getAux", GetProductAux.getAux) //Import aux using shop 9 api
router.post("/createAux", Aux.createAux)
router.get("/getAllAux", Aux.getAll) // Get all aux imported
router.get("/getAuxByCode/:id", Aux.getAuxByCode) // Get single aux imported
router.delete("/deleteAux/:id", Aux.deleteItem) // Get all aux imported


export {router}