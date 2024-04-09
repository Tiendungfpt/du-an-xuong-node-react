
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi/src/joi.js";
import { IProduct } from "../../../interfaces/Product";


// const productSchema = Joi.object({
//     name: Joi.string().required().min(3),
//     price: Joi.number().positive().required(),
//     image: Joi.string(),
//     description: Joi.string(),
// });

const ProductEdit = () => {
    const { id } = useParams()
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryKey: ["PRODUCTS", id],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:8080/api/products/${id}`);
            reset(data);
            return data;
        }
    });
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        // resolver: joiResolver(productSchema),
        // defaultValues: {
        //     name: data.name,
        //     price: data.price,
        //     image: data.image,
        //     description: data.description,
        // },
    });
    const { mutate } = useMutation({
        mutationFn: async (product: IProduct) => {
            const { data } = await axios.put(`http://localhost:8080/api/products/${id}`, product);
            return data;
        },
        onSuccess: () => {
            alert('Bạn đã cập nhập sản phẩm thành công')
            queryClient.invalidateQueries({
                queryKey: ["PRODUCTS",],
            })
        }
    })
    const onSubmit = (product: IProduct) => {
        mutate(product);
        navigate(`/admin/products`)
    }

    return (
        <>
            <div style={{ width: "1195px", }}>
                <h2>Chỉnh sửa Sản phẩm</h2>
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

export default ProductEdit