import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
const port = process.env.PORT || 5000;

connectDB(); // connect to MongoDB

const app = express();

//Body parser middleware
//earlier we used to install it externally now we dont have to
//these two lines will do
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.send('Hello jai mata di World!');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);


app.listen(port,()=> console.log('app running on port ' + port));