// import { useQuery } from '@tanstack/react-query'
// import axios from 'axios'
// import { Link } from 'react-router-dom';

// const Category = () => {
//     const { data: categories } = useQuery({
//         queryKey: ["CATEGORY_LIST"],
//         queryFn: async () => {
//             const { data } = await axios.get(`http://localhost:8080/api/categories`);
//             return data;
//         }
//     });
//     return (
//         <section className="news">
//             <div className="container">
//                 <div className="section-heading">
//                     <h2 className="section-heading__title">Categories </h2>
//                 </div>
//                 <div>

//                     {Array.isArray(categories) && categories.map((category: { _id?: number, name: string }) => (
//                         <div key={category._id}>
//                             <p>{category.name}</p>
//                         </div>
//                     ))}

//                 </div>
//             </div>
//         </section>

//     )
// }

// export default Category