import User from '../models/user';
import Joi from 'joi';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const signupSchema = Joi.object({
    name: Joi.string().min(3),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    confirmPassword: Joi.string().required().valid(Joi.ref("password"))
});
const signinSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
});

export const signup = async (req, res) => {
    try {
        const { error } = signupSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const message = error.details.map(error => error.message);
            return res.status(400).json({ message });
        };

        const existUser = await User.findOne({ email: req.body.email });
        if (existUser) {
            return res.status(400).json({
                message: "tai khoan da ton tai"
            })
        };

        const hashedPassword = await bcryptjs.hash(req.body.password, 10);
        const user = await User.create({ ...req.body, password: hashedPassword });
        return res.status(200).json({ user })
    } catch (error) {

    }
};

export const signin = async (req, res) => {
    try {
        const { error } = signinSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const message = error.details.map(error => error.message);
            return res.status(400).json({ message });
        };

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({
                message: "tai khoan khong ton tai"
            })
        };
        const isMatch = await bcryptjs.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "mat khau khong dung"
            })
        };
        const token = jwt.sign({ id: user._id }, "123456", { expiresIn: "1h" })

        return res.status(200).json({ user, token })
    } catch (error) {

    }
}