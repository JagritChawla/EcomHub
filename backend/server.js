import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
dotenv.config();
import connectDB from './config/db.js';
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'


const port = process.env.PORT || 5000;

connectDB(); // connect to MongoDB

const app = express();

//Body parser middleware
//earlier we used to install it externally now we dont have to
//these two lines will do
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//cookie parser middleware
app.use(cookieParser());



app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);


app.get('/api/config/paypal', (req,res) => 
  res.send({clientId:process.env.PAYPAL_CLIENT_ID })
);

const __dirname = path.resolve(); //set __dirname to current directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads'))); //serve static files from uploads folder


if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
  );
}else{
  app.get('/', (req, res) => {
    res.send('Hello namaste World!');
  });
}


app.use(notFound);
app.use(errorHandler);


app.listen(port,()=> console.log('app running on port ' + port));