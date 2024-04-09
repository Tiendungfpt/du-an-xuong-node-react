import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../../interfaces/Product";


const productSchema = Joi.object({
    name: Joi.string().required().min(3),
    price: Joi.number().positive().required(),
    image: Joi.string(),
    description: Joi.string(),
});

const ProductAdd = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: joiResolver(productSchema),
        defaultValues: {
            name: "",
            price: 0,
            image: "",
            description: "",
        },
    });
    const { mutate } = useMutation({
        mutationFn: async (product: IProduct) => {
            const { data } = await axios.post(`http://localhost:8080/api/products`, product);
            return data.product;

        },
        onSuccess: () => {
            alert('Bạn đã thêm sản phẩm thành công')
            queryClient.invalidateQueries({
                queryKey: ["PRODUCTS"],
            })
        }
    })
    const onSubmit = (product: IProduct) => {
        mutate(product);
        navigate(`/admin`)
    }

    return (
        <>
            <div style={{ width: "1195px", }}>
                <h2>Thêm Sản phẩm</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="form-labeld" htmlFor="name">Tên sản phẩm:</label>
                    <input className="form-controld" type="text" id="name"  {...register("name", { required: true, minLength: 3 })} />
                    {errors?.name?.message && <span style={{ color: 'red' }} className="text-danger">{errors?.name?.message}</span>}


                    <label className="form-labeld" htmlFor="image">Ảnh sản phẩm:</label>
                    <input className="form-controld" type="text" id="image"  {...register("image", { required: true })} />
                    {errors?.image?.message && <span style={{ color: 'red' }} className="text-danger">{errors?.image?.message}</span>}

                    <label className="form-labeld" htmlFor="price">Giá sản phẩm:</label>
                    <input className="form-controld" type="number" id="price"  {...register("price", { required: true })} />
                    {errors?.price?.message && <span style={{ color: 'red' }} className="text-danger">{errors?.price?.message}</span>}

                    <label className="form-labeld" htmlFor="description">Mô tả:</label>
                    <textarea className="form-controld" id="description" rows={4} cols={50} defaultValue={""} {...register("description")} />

                    <input className='btn btn-dangerd' type="submit" defaultValue="thêm sản phẩm" />
                </form>
            </div>
        </>
    )
}

export default ProductAdd