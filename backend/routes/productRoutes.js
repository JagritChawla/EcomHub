import express from 'express';
const router = express.Router();
import { getProducts, getProductById } from '../controllers/productController.js';

router.route('/').get(getProducts);
// router.get('/', getProducts);

router.route('/:id').get(getProductById);
// router.get('/:id', getProductById);

export default router;