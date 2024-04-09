import Product from "../models/product"
import Joi from 'joi'

const productSchema = Joi.object({
    name: Joi.string().required().min(3),
    price: Joi.number().positive().required(),
    image: Joi.string(),
    description: Joi.string(),
});
export const getAll = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (error) {
        console.log(error);
    }
};
export const getById = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findById(productId);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error(error);
    }
};

export const remove = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        return res.status(200).json({ product });
    } catch (error) {
        console.log(error);
    }
};

export const add = async (req, res) => {
    try {
        const { error } = productSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const messages = error.details.map((error) => error.messages);
            return res.status(400).json({ messages });
        }
        const product = await Product.create(req.body);
        return res.status(200).json({ product });
    } catch (error) {
        console.log(error);
    }
};
export const update = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json({ product });
    } catch (error) {
        console.log(error);
    }
};