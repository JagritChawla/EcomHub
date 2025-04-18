import asyncHandler from "../middleware/asyncHandler.js"
import Order from "../models/orderModel.js";

//@desc    Create new order
//@route   POST /api/orders
//@acccess Private
const addOrderItems = asyncHandler(async (req,res)=>{
    const {orderItems,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice} = req.body;
    if( orderItems && orderItems.length ===0){
        res.status(400);
        throw new Error('No order items')
    }else{
        const order = new Order({
            orderItems: orderItems.map((x)=>({
                ...x,
                product: x._id,
                _id: undefined
            })),
            user:req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });
        
        const createOrder = await order.save();

        res.status(201).json(createOrder);
    }
});

//@desc    Get logged in user orders
//@route   Get /api/orders/myorders
//@acccess Private
const getMyOrders = asyncHandler(async (req,res)=>{
    const orders = await Order.find({user: req.user._id}); //Find all documents where the user field (in mongodb collection) equals the current user's _id (req.user is object added by jwt).
    res.status(200).json(orders);
});

//@desc    Get order by ID
//@route   GET /api/orders/:id
//@acccess Private
const getOrderById = asyncHandler(async (req,res)=>{
    const order = await Order.findById(req.params.id).populate('user','name email');

    if(order){
        res.status(200).json(order);
    }else{
        res.status(404);
        throw new Error("Order not found");
    }
});

//@desc    Update order to paid
//@route   PUT /api/orders/:id/pay
//@acccess Private
const updateOrderToPaid = asyncHandler(async (req,res)=>{
    const order = await Order.findById(req.params.id);

    if (order){
        order.isPaid = true;
        order.paidAt= Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        };
        const updatedOrder = await order.save();

        res.status(200).json(updatedOrder);
    }else{
        res.status(404);
        throw new Error("Order not found");
    }
});


//@desc    Update order to delivered
//@route   GET /api/orders/:id/deliver
//@acccess Private/Admin
const updateorderToDelivered = asyncHandler(async (req,res)=>{
    const order = await Order.findById(req.params.id);

    if(order){
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();

        res.status(200).json(updatedOrder);
    }else{
        res.status(404);
        throw new Error('Order not found');
    }
});

//@desc    Get all order
//@route   PUT /api/orders/:id/pay
//@acccess Private/Admin
const getOrders = asyncHandler(async (req,res)=>{
    const orders = await Order.find({}).populate('user','id name');
    res.status(200).json(orders);
});

export{
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateorderToDelivered,
    getOrders
}