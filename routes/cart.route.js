import { addToCart, deleteCartItem, updateCartItem } from "../controller/cart.controller.js"
import { verifyToken } from "../middleware/verify.js"



export function cartRoute(app){
    //add to cart
    app.post("/api/cart",verifyToken,addToCart)

    //update cart item
    app.put("/api/cart/:id",verifyToken,updateCartItem)
    
    //delete cart item
    app.delete("/api/cart/:id",verifyToken,deleteCartItem)
}

