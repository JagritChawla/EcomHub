import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDBD from './config/db.js';
import products from './data/products.js';

const port = process.env.PORT || 5000;

connectDBD(); // connect to MongoDB

const app = express();

app.get('/', (req, res) => {
  res.send('Hello jai mata di World!');
});

app.get('/api/products' , (req,res)=>{
    res.json(products);
})

app.get('/api/products/:id', (req, res)=>{
    const Pid = (req.params.id);
    const product = products.find((p) => p._id === Pid);
    res.json(product);
})

app.listen(port,()=> console.log('app running on port ' + port));