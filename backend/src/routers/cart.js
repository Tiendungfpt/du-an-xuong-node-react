import { Router } from 'express';
import { addItemToCart, clearCart, decreaseProductQuantity, getCartByUserId, increaseProductQuantity, removeFromCart, updateProductQuantity } from '../controllers/cart';

const router = Router();

router.get('/cart/:userId', getCartByUserId);
router.post('/cart/add-to-cart', addItemToCart);
router.post('/cart/update', updateProductQuantity);
router.post('/cart/remove', removeFromCart);
router.post('/cart/remove/:userId', clearCart);
router.post('/cart/increase', increaseProductQuantity);
router.post('/cart/decrease', decreaseProductQuantity);

export default router;