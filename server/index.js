const express = require("express");
const app = express();
const mongoose = require('mongoose');
const ProductModel = require("./models/products");

const cors = require('cors')
app.use(cors())
app.use(express.json())

mongoose.connect(
    "mongodb+srv://aksman:BGYHWeYkfo413C3C@productway.ftsvyzi.mongodb.net/productway?retryWrites=true&w=majority"
)

app.get("/getProducts", async (req, res) => {
    try {
        const products = await ProductModel.find({});
        res.json(products)
    } catch (error) {
        console.error(err);
        res.status(500).json({error: "Feil ved innhenting av produkter"})
    }
})

app.post("/addProduct", async (req, res) => {
    const product = req.body;
    const newProduct = new ProductModel(product);
    await newProduct.save();

    res.json(product);
})

app.listen(3001, () => {
    console.log("SERVER RUNS PERFECTLY");
})