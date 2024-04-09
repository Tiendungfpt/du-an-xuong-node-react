import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { IProduct } from '../../../interfaces/Product';


const ProductList = () => {
    const queryClient = useQueryClient();
    const { data } = useQuery({
        queryKey: ['PRODUCTS'],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:8080/api/products`);
            return data;
        }
    });
    const { mutate } = useMutation({
        mutationFn: async (id: string) => {
            return window.confirm('bạn có chắc muốn xóa không') &&
                (await axios.delete(`http://localhost:8080/api/products/${id}`))
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['PRODUCTS'] });
        }
    })
    return (
        <>
            <div className="dflexom">
                <h1 className="h2">Quản lý sản phẩm</h1>
                <div className="bgrouppp">
                    <div className="bgroup">
                        <Link to="/admin/products/add" className="secondary" role="button">Thêm</Link>
                    </div>
                </div>
            </div>
            <div className="tablesmall">
                <table className="tabletable-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Ảnh</th>
                            <th scope="col">Tên sản phẩm</th>
                            <th scope="col">Mô tả sản phẩm</th>
                            <th scope="col">Giá sản phẩm</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((product: IProduct, index: number) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <img src={product.image} alt={product.name} width={100} />
                                </td>
                                <td>
                                    <h4>{product.name}</h4>
                                </td>
                                <td>
                                    <h4>{product.description}</h4>
                                </td>
                                <td>
                                    <span style={{ color: "red" }}>{product.price} $</span>
                                </td>
                                <td>
                                    <div className='dflex'>
                                        <button className='btdanger' onClick={() => mutate(product._id!)}>Xóa</button>
                                        <Link to={`/admin/products/${product._id}/edit`} className='btprimary' role="button">Cập nhật</Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ProductList