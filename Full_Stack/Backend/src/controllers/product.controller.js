const Product=require("../model/product.model")

async function createProduct(req,res) {
    try{
        const product=await Product.create(req.body);
        res.status(201).json({
            success: true,
            data: product,
        });
    }catch(error){
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

async function getProducts(req,res) {
    try{
        const products=await Product.find();
        res.status(200).json({
            success: true,
            count: products.length,
            data: products,
        });
    }catch(error){
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

async function getProductById(req,res) {
    try{
        const product=await Product.findById(req.params.id)

        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product Not found",
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    }catch(error){
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

async function updateProduct(req,res) {
    try{

        const product=await Product.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            newValidators: true,
        });

        if(!product){
            return res.status(484).json({
                success: false,
                message: "Product Not Found",
            });
        }

        res.status(200).json({
            success: true,
            data: product,
        });
    }catch(error){
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
    
}

async function deleteProduct(req,res) {
    try{
        const product=await Product.findByIdAndDelete(req.params.id);

        if(!product){
            return res.status(484).json({
                success: false,
                message: "Product Not Found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product Deleted Successfully",
        });
    }catch(error){
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports={
    createProduct, getProducts, getProductById, updateProduct, deleteProduct
};