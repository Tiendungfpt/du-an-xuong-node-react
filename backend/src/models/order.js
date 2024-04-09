import mongoose, { Schema } from "mongoose";

const OrderItemSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }
})

const OrderSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    items: [OrderItemSchema],
    orderNumber: {
        type: String,
        auto: true,
        unique: true,
    },
    customerInfo: {
        type: {
            name: {
                required: true,
                type: String,
            },
            email: {
                required: true,
                type: String,
            },
            phone: {
                type: Number,
            },
            payment: {
                type: String,
            },
            city: {
                type: String,
            },
            address: {
                type: String,
            }
        },
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
        default: "pending",
    }
}, { timestamps: true, versionKey: false });

export default mongoose.model("Order", OrderSchema);