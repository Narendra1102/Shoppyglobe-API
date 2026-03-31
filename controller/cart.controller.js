import productModel from "../model/product.model.js"
import cartModel from "../model/cart.model.js"

//ADD to cart
export async function addToCart(req,res){
    
    try{
        const { user, product, quantity } = req.body;
        
        //validate quantity
         if (quantity < 1) {
            return res.status(400).json({ msg: "Quantity must be at least 1" });
        }

        //check product exists or not
        const productItem = await productModel.findById(product);
        if (!productItem){
            return res.status(404).json({ msg: "Product not found" });
        } 

        //check cart item exists or not
        const existingItem=await cartModel.findOne({user,product})
        if(existingItem){
            return res.status(400).json({msg:"Product already exists in cart"})
        }
        else{
            const cartItem = await cartModel.create({
                user,
                product,
                quantity
            });
            

            return res.status(201).json(cartItem)
        }
        

    }
    catch(err){
        res.status(500).json({msg:"Error while creating product"})
    }
}



// UPDATE Cart Item
export async function updateCartItem(req,res){
    try{
        const cartItem = await cartModel.findByIdAndUpdate(
            req.params.id,
            { quantity: req.body.quantity },
            { returnDocument: "after" } 
        );
        if(!cartItem){
            return res.status(404).json({msg:"Cart item not found"})
        }
        res.status(200).json(cartItem)
    }
    catch(err){
        res.status(500).json({msg:"Error while editing cart item"})
    }
}


// DELETE Cart Item
export async function deleteCartItem(req,res){
    try{
        const cartItem=await cartModel.findByIdAndDelete(req.params.id)
        if(!cartItem){
            return res.status(404).json({msg:"Cart item not found"})
        }
        
        return res.status(200).json({msg:"Item deleted successfully"})
    }
    catch(err){
        res.status(500).json({msg:"Error while deleting cart item"})
    }
}