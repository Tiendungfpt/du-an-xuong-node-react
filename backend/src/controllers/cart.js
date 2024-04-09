import Cart from "../models/cart";
import Product from '../models/product';
import User from '../models/user';
import { StatusCodes } from "http-status-codes"

export const getCartByUserId = async (req, res) => {
    // Get /cart/:userId
    const { userId } = req.params;
    try {
        const cart = await Cart.findOne({ userId }).populate("products.productId");
        const cartData = {
            products: cart.products.map((item) => ({
                productId: item.productId._id,
                name: item.productId.name,
                image: item.productId.image,
                price: item.productId.price,
                quantity: item.quantity,
            }))
        };
        return res.status(StatusCodes.OK).json(cartData);
    } catch (error) {
        console.log(error)
    }
}

export const addItemToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        // kiểm tra giỏ hàng có tồn tại chưa? dựa theo userId
        let cart = await Cart.findOne({ userId });
        // nếu giỏ hàng không tồn tại thì tạo mới
        if (!cart) {
            cart = new Cart({ userId, productId: [] });
        }
        console.log(cart);
        const existProductIndex = cart.products.findIndex((item) => item.productId == productId);
        // kiểm tra xem sản phẩm có tồn tại trong giỏ hàng không?
        if (existProductIndex !== -1) {
            // nếu tồn tại trong giỏ hàng thì cta cập nhật số lượng
            cart.products[existProductIndex].quantity += quantity;
        } else {
            // nếu chưa có trong giỏ hàng thì thêm mới
            cart.products.push({ productId, quantity });
        }
        await cart.save();
        return res.status(StatusCodes.OK).json({ cart });
        // lựu giỏ hàng
    } catch (error) {
        // trả về client
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Internal Server Error" });
    }
}
export const removeFromCart = async (req, res) => {
    const { userId, productId } = req.body;
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Cart not found" });
        }
        cart.products = cart.products.filter((product) =>
            product.productId && product.productId.toString() !== productId);

        await cart.save();
        return res.status(StatusCodes.OK).json({ cart })
    } catch (error) {
        return res.status(StatusCodes.OK).json({ error: "Internal Server Error" })

    }
}
export const updateProductQuantity = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Cart not found" });
        }
        const product = cart.products.find(item => item.productId.toString() === productId);
        if (!product) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Product not found" });

        }
        product.quantity = quantity;
        await cart.save();
        return res.status(StatusCodes.OK).json({ cart });
    } catch (error) {

    }
}
export const increaseProductQuantity = async (req, res) => {
    const { userId, productId } = req.body;
    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const product = cart.products.find((item) => item.productId.toString() === productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        // Tăng số lượng sản phẩm lên 1 đơn vị
        product.quantity++;

        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const decreaseProductQuantity = async (req, res) => {
    const { userId, productId } = req.body;
    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });

        }
        const product = cart.products.find((item) => item.productId.toString() === productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found in cart" });
        }
        if (product.quantity > 1) {
            product.quantity--;
        }
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const clearCart = async (req, res) => {
    const { userId } = req.params;
    // Lấy userId từ request body

    try {
        const cart = await Cart.findOne({ userId });

        // Kiểm tra xem giỏ hàng có tồn tại không
        if (!cart) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Cart not found" });
        }

        // Xóa tất cả sản phẩm trong giỏ hàng
        cart.products = [];

        // Lưu lại giỏ hàng đã được xóa
        await cart.save();

        // Trả về kết quả thành công
        return res.status(StatusCodes.OK).json({ message: "Cart cleared successfully" });
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error("An error occurred while clearing cart:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
    }
}
