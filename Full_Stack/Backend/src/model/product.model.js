const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        quantity: {
            type: Number,
            min: 1,
        },
        price: {
            type: Number,
            required: true,
            min: 1,
        },
    },
    {
        timestamps: true,
    },
);

module.exports=mongoose.model("Product", productSchema);