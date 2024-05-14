import asyncHandler from "../middleware/asyncHandler.js"
import User from "../models/userModel.js";

//@desc    Auth user & get token
//@route   POST /api/users/login
//@acccess Public
const authUser = asyncHandler(async (req,res)=>{
    const {email , password } = req.body;
    const user = await User.findOne({ email: email})

    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            name:user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
        
    }else{
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

//@desc    Register user 
//@route   POST /api/users
//@acccess Public
const registerUser = asyncHandler(async (req,res)=>{
    res.send('register user')
});

//@desc    Logout & clear the cookie
//@route   POST /api/users/logout
//@acccess Private
const logoutUser = asyncHandler(async (req,res)=>{
    res.send('logout user')
});

//@desc    Get user profile
//@route   Get /api/users/profile
//@acccess Private
const getUserProfile = asyncHandler(async (req,res)=>{
    res.send('get user profile')
});

//@desc    Update user profile
//@route   PUT /api/users/login
//@acccess Private
const updateUserProfile = asyncHandler(async (req,res)=>{
    res.send('update user profile')
});

//@desc    Get all users
//@route   GET /api/users
//@acccess Private/Admin
const getUsers = asyncHandler(async (req,res)=>{
    res.send('get users')
});

//@desc    Get user by id
//@route   GET /api/users/:id
//@acccess Private/Admin
const getUserById = asyncHandler(async (req,res)=>{
    res.send('get user by id')
});

//@desc    Delete users
//@route   DELETE /api/users/:id
//@acccess Private/Admin
const deleteUser = asyncHandler(async (req,res)=>{
    res.send('delete users')
});

//@desc    Update user
//@route   PUT /api/users/:id
//@acccess Private/Admin
const updateUser = asyncHandler(async (req,res)=>{
    res.send('update users')
});

export { authUser,registerUser,logoutUser, getUserProfile,updateUserProfile,getUsers, deleteUser , getUserById , updateUser}