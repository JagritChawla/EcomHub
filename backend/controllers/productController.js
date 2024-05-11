import asyncHandler from "../middleware/asyncHandler.js"
import Product from "../models/productModel.js";

//@desc    Fetch all products
//@route   GET /api/products
//@acccess Public
const getProducts = asyncHandler(async (req,res)=>{
    const products = await Product.find({});
    res.json(products);
});

//@desc    Fetch a product by id
//@route   GET /api/products/:id
//@acccess Public
const getProductById = asyncHandler(async (req,res)=>{
    const Pid = (req.params.id);
    const product = await Product.findById(Pid);
    
    if(product){
        res.json(product);
    }else{
        res.status(404);
        throw new Error('Product not found new error abcdefghijklmopqrstuvwxyz');
    }
});

export {getProducts, getProductById};