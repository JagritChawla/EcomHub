import express from 'express';
const router = express.Router();
import { authUser,registerUser,logoutUser, getUserProfile,updateUserProfile,getUsers, deleteUser , getUserById , updateUser  } from '../controllers/userController.js';
import { protect,admin } from '../middleware/authMiddleware.js';


//if post req then registerUser will be called if get req then getUsers will be called
router.route('/').post(registerUser).get(protect ,admin, getUsers);

router.post('/logout', logoutUser);

router.post('/login' , authUser);

router.route('/profile').get(protect , getUserProfile).put(protect , updateUserProfile);

router.route('/:id').delete(protect , admin ,deleteUser).get(protect , admin ,getUserById).put(protect , admin ,updateUser);


export default router;