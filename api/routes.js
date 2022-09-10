import { Router } from 'express';
import ServiceProducts from './Services/Products/Products';
import ServiceAux from './Services/Products/ProductAux';
import ServiceClients from './Services/Clients/Clients';
import ServiceSales from './Services/Sales/Sales';
import ServiceBling from './Services/Bling/Product';
// Controller
import ControllerAux from './Controllers/Aux'
import ControllerProducts from './Controllers/Products'
import ControllerProductERP from './Controllers/ProductERPLink'

const router = Router();

router.get("/", (req, res) => {
    return res.json('Server Running')
})


// SERVICES
    //Routes to get products from Shop 9
    router.get("/getProducts/:page", ServiceProducts.getProducts)
    router.get("/getProduct/:code", ServiceProducts.getProduct)
    //Route to get items seting the url 
    router.get("/getByUrl", ServiceProducts.getByUrl)
    //Routes to get "Aux from Shop 9
    router.get("/getAux", ServiceAux.getAux) //Import aux using shop 9 api
    ////Clients
    router.post("/createClient", ServiceClients.create)
    //Sales
    router.post("/createSale", ServiceSales.create)
    //Bling Product
    router.get("/getBlingProduct/:code", ServiceBling.getBlingProduct)

//CONTROLLERS
    //Products
    router.get("/findOne/:id", ControllerProducts.findOne)
    router.get("/findAll", ControllerProducts.findAll)
    router.post("/createProduct", ControllerProducts.createProduct)
    router.post("/createManyProducts", ControllerProducts.createMany)
    router.delete("/deleteProduct/:id", ControllerProducts.deleteProduct)

    //router.put("/updateCodeProduct/:id", ControllerProducts.updateErpCode)
    //router.put("/updateCodeVariation/:id", ControllerProducts.updateErpCodeVariation)
    
    //Product ERP Link
    router.get("/getLinks", ControllerProductERP.getAll)
    router.get("/productByErpCode/:code", ControllerProductERP.getProductsByErpCode)
    router.post("/createLinkVariation", ControllerProductERP.createLinkVariation)
    router.post("/createLink", ControllerProductERP.createLink)
    router.delete("/deleteLink/:id", ControllerProductERP.deleteLink)
    
    
    

router.post("/createAux", ControllerAux.createAux)
router.get("/getAllAux", ControllerAux.getAll) // Get all aux imported
router.get("/getAuxByCode/:id", ControllerAux.getAuxByCode) // Get single aux imported
router.get("/getAuxId", ControllerAux.getAuxId) // Get single aux imported by group name
router.delete("/deleteAux/:id", ControllerAux.deleteItem) // Get all aux imported


export {router}