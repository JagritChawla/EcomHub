import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js"
import products from "./data/products.js"
import User from "./models/userModel.js"
import Product from "./models/productModel.js"
import Order from "./models/orderModel.js"
import connectDB from "./config/db.js"

dotenv.config();

connectDB();

const importData = async () =>{
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;
        
        const sampleProducts=products.map((product)=>{
            return { ...product, user: adminUser};
        });

        await Product.insertMany(sampleProducts);
        console.log("Data Imported".green.inverse);
        process.exit();
    } catch (error) {
        console.log(`Error: ${error}`.red.inverse);
        process.exit(1);
    }
}

const destroyData = async () =>{
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log("Data Destroyed".red.inverse);
        process.exit();
        
    } catch (error) {
        console.error(`Error: ${error}`.red.inverse);
        process.exit(1);
    }
}

if(process.argv[2] === "-d"){
    destroyData();
}
else{
    importData();
}


//console.log(process.argv);// this gives ouput as list containng-
// [
//     'C:\\Program Files\\nodejs\\node.exe',
//     'C:\\Users\\jagri\\Desktop\\E-Commerce\\backend\\seeder',
//   ]
// we can add something to the list when running this file for eg:
//following command 
// node backend/seeder this_is_2nd_index
// [
//     'C:\\Program Files\\nodejs\\node.exe',
//     'C:\\Users\\jagri\\Desktop\\E-Commerce\\backend\\seeder',
//     'this_is_2nd_index'
//  ]
//using this we can run destroy or import function based on the scrip used to run the file