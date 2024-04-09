import { StatusCodes } from "http-status-codes";
import Category from "../models/category"
import Joi from 'joi'
import Product from "../models/product";
import slugify from 'slugify';


const categorySchema = Joi.object({
    name: Joi.string().required().min(3),
    price: Joi.number().positive().required(),
    image: Joi.string(),
    description: Joi.string(),
});
export const getAll = async (req, res) => {
    try {
        const categories = await Category.find();
        return res.status(200).json({ categories });
    } catch (error) {
        console.log(error);
    }
};

export const getCategoryById = async (req, res) => {
    const products = await Product.find({ category: req.params.id })
    try {
        const category = await Category.findById(req.params.id);
        if (category.length === 0)
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "không tìm thấy sản phẩm nào" });
        return res.status(StatusCodes.OK).json({
            category,
            products,
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
    }
};

// export const getById = async (req, res) => {
//     const productId = req.params.id;
//     try {
//         const category = await Category.findById(productId);
//         if (product) {
//             res.json(product);
//         } else {
//             res.status(404).json({ message: "Product not found" });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

export const removeCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        return res.status(200).json({ category });
    } catch (error) {
        console.log(error);
    }
};

export const addCategory = async (req, res) => {
    try {
        const category = await Category.create({ name: req.body.name, slug: slugify(req.body.name, "-") });
        return res.status(StatusCodes.CREATED).json(category);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
};

export const updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json({ category });
    } catch (error) {
        console.log(error);
    }
};