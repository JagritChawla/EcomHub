import asyncHandler from "../middleware/asyncHandler.js"
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//@desc    Auth user & get token
//@route   POST /api/users/login
//@acccess Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email })

    if (user && (await user.matchPassword(password))) {

        generateToken(res, user._id);

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })

    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

//@desc    Register user 
//@route   POST /api/users
//@acccess Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email: email });

    if (userExists) {
        res.status(400);
        throw new Error('User already Exist');
    }

    const user = await User.create({
        name,
        email,
        password
    });
    if (user) { //if new user generated succesfully
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }
});

//@desc    Logout & clear the cookie
//@route   POST /api/users/logout
//@acccess Private
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ message: 'Logged out succesfully' })
});

//@desc    Get user profile
//@route   Get /api/users/profile
//@acccess Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

//@desc    Update user profile
//@route   PUT /api/users/login
//@acccess Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password){
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

//@desc    Get all users
//@route   GET /api/users
//@acccess Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    res.send('get users')
});

//@desc    Get user by id
//@route   GET /api/users/:id
//@acccess Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    res.send('get user by id')
});

//@desc    Delete users
//@route   DELETE /api/users/:id
//@acccess Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    res.send('delete users')
});

//@desc    Update user
//@route   PUT /api/users/:id
//@acccess Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    res.send('update users')
});

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUsers, deleteUser, getUserById, updateUser }