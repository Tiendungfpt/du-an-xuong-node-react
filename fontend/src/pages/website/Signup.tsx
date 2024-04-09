import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Joi from "joi";
import { useForm } from "react-hook-form";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";


// const signupSchema = Joi.object({
//     name: Joi.string().min(3),
//     email: Joi.string().required().email(),
//     password: Joi.string().required().min(6),
//     confirmPassword: Joi.string().required().valid(Joi.ref("password")),
// })

const Signup = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { register, handleSubmit, formState: { errors } } = useForm({
        // resolver: joiResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });
    // const { mutate } = useMutation({
    //     mutationFn: async (user) => {
    //         const { data } = await axios.post(`http://localhost:8080/api/signup`, user);
    //         return data;

    //     },
    //     onSuccess: () => {
    //         alert('Bạn đã đăng ký thành công')
    //         queryClient.invalidateQueries({
    //             queryKey: ["PRODUCTS"],
    //         })
    //     }
    // })
    const { mutate } = useMutation({
        mutationFn: async (user) => {
            const { data } = await axios.post(`http://localhost:8080/api/signup`, user);
            return data;
        },
        onSuccess: () => {
            alert('Bạn đã đăng ký thành công');
            queryClient.invalidateQueries({
                queryKey: ["PRODUCTS"],
            });
            navigate(`/signin`); // Chỉ chuyển trang khi đăng ký thành công
        }
    });

    const onSubmit = (user) => {
        mutate(user);
    }



    return (
        <>
            {/* <div style={{ width: "1995px", }}>
                <h2>Đăng ký</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="form-labeld" htmlFor="name">Tên người dùng:</label>
                    <input className="form-controld" type="text" id="name"  {...register("name", { minLength: 3 })} />
                    {errors?.name?.message && <span style={{ color: 'red' }} className="text-danger">{errors?.name?.message}</span>}


                    <label className="form-labeld" htmlFor="email">Email</label>
                    <input className="form-controld" type="email" id="email"  {...register("email", { required: true })} />
                    {errors?.email?.message && <span style={{ color: 'red' }} className="text-danger">{errors?.email?.message}</span>}

                    <label className="form-labeld" htmlFor="password">Password:</label>
                    <input className="form-controld" type="password" id="password" min={6} {...register("password")} />

                    <label className="form-labeld" htmlFor="confirmPassword">ConfirmPassword:</label>
                    <input className="form-controld" type="confirmPassword" id="confirmPassword" min={6} {...register("confirmPassword")} />

                    <input className='btn btn-dangerd' type="submit" defaultValue="thêm sản phẩm" />
                </form>
            </div> */}
            <div className="login-containerab">
                <form className="login-formaa" onSubmit={handleSubmit(onSubmit)}>
                    <div className="close-formaa">
                        <Link to={'/'}>X</Link>

                    </div>
                    <h2>Đăng ký</h2>
                    <div className="form-groupaa">
                        <label htmlFor="name">Name:</label>
                        <input type="name" id="name" required minLength={3} {...register("name")} />
                    </div>
                    <div className="form-groupaa">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" required  {...register("email")} />
                    </div>
                    <div className="form-groupaa">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" required {...register("password")} />
                    </div>
                    <div className="form-groupaa">
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input type="password" id="confirmPassword" required {...register("confirmPassword")} />

                    </div>

                    <button className="login-btnaa" type="submit">Login</button>
                    <div className="social-loginaa">
                        <button className='fb' type="button"><FaFacebook />Facebook</button>
                        <button className="google" type="button" ><Link style={{ textDecoration: 'none' }} to={'/signin'}>Đăng nhập</Link></button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signup