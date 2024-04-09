
import instance from "../config/axios";
import { IProduct } from "../interfaces/Product";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAllProducts = async (params?: any): Promise<IProduct[]> => {
    try {
        const response = await instance.get('/products', { params });
        console.log(response)
        return response.data;
    } catch (error) {
        return [];
    }
}
export const getProductById = async (id: number | string) => {
    try {
        const response = await instance.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
export const addProduct = async (product: IProduct) => {
    try {
        const response = await instance.post(`/products`, product);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}