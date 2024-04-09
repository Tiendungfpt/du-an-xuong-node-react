import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Joi from "joi";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaGoogle } from "react-icons/fa6";
import { useLocalStorage } from "../../common/hooks/useStorage";


// const signupSchema = Joi.object({
//     name: Joi.string().min(3),
//     email: Joi.string().required().email(),
//     password: Joi.string().required().min(6),
//     confirmPassword: Joi.string().required().valid(Joi.ref("password")),
// })

const Signin = () => {
    const [, setUser] = useLocalStorage('user', {})
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        // resolver: joiResolver(signupSchema),
        defaultValues: {

            email: "",
            password: "",

        },
    });
    const { mutate } = useMutation({
        mutationFn: async (formdata: { email: string, password: string }) => {
            const { data } = await axios.post(`http://localhost:8080/api/signin`, formdata);
            localStorage.setItem('user', JSON.stringify(data))
            return data.product;

        },
        onSuccess: (data) => setUser(data),


    })
    const onSubmit = (formdata: { email: string, password: string }) => {
        mutate(formdata);
        navigate('/cart')
    }
    // const Signin = () => {
    //     const [, setUser] = useLocalStorage('user', {})
    //     const navigate = useNavigate();
    //     const { register, handleSubmit, formState: { errors } } = useForm({
    //         // resolver: joiResolver(signinSchema),
    //         defaultValues: {
    //             email: "",
    //             password: "",
    //         },
    //     });
    //     const { mutate } = useMutation({
    //         mutationFn: async (formdata: { email: string, password: string }) => {
    //             const { data } = await axios.post(`http://localhost:8080/api/signin`, formdata);
    //             return data.product;

    //         },
    //         onSuccess: (data) => setUser(data),
    //         onError: (error) => console.log(error),


    //     })
    //     const onSubmit = (formdata: { email: string, password: string }) => {
    //         mutate(formdata);
    //     }

    return (
        <>

            <div className="login-containeraa">
                <form className="login-formaa" onSubmit={handleSubmit(onSubmit)}>
                    <div className="close-formaa">
                        <Link to={'/'}>X</Link>

                    </div>
                    <h2>Login</h2>
                    <div className="form-groupaa">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" required  {...register("email")} />
                    </div>
                    <div className="form-groupaa">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" required {...register("password")} />
                    </div>
                    <button className="login-btnaa" type="submit">Login</button>
                    <div className="social-loginaa">
                        <button className='fb' type="button"><FaFacebook />Facebook</button>
                        <button className="google" type="button" ><FaGoogle /> Google</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signin