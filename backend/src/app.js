import express from "express";
import { connect } from "mongoose";
import productRouter from "./routers/product"
import authRouter from "./routers/auth"
import cartRouter from "./routers/cart"
import orderRouter from "./routers/order"
import cors from 'cors'


const app = express();

app.use(express.json());
app.use(cors());


(async () => {
    try {
        await connect(`mongodb://localhost:27017/WD18328`)
    } catch (error) {
        console.log(error);
    }
})();

app.use(`/api`, productRouter);
app.use(`/api`, authRouter);
app.use(`/api`, cartRouter);
app.use(`/api`, orderRouter);



export const viteNodeApp = app;