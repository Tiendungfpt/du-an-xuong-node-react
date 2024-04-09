import { Router } from "express";
import { addCategory, getAll, getCategoryById, removeCategory, updateCategory } from "../controllers/category";

const router = Router();

router.get('/categories', getAll);
router.get('/categories/:id', getCategoryById);
router.post('/categories', addCategory);
router.delete('/categories/:id', removeCategory);
router.put('/categories/:id', updateCategory);


export default router;