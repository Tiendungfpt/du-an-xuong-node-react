import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './pages/admin/components/Layout'
import ProductList from './pages/admin/components/ProductList'
import ProductAdd from './pages/admin/components/ProductAdd'
import ProductEdit from './pages/admin/components/ProductEdit'
import LayoutWebsite from './pages/website/LayoutWebsite'
import Home from './pages/website/Home'
import ProductDetail from './pages/website/ProductDetail'
import Shops from './pages/website/Shops'
import Cart from './pages/website/Cart'
import Signup from './pages/website/Signup'
import Signin from './pages/website/Signin'
import Order from './pages/website/Order'
import OrderList from './pages/admin/components/OrderList'




function App() {

  return (
    <>
      <Routes>
        <Route path='/admin' element={<Layout />}>
          <Route index element={<Layout />} />
          <Route path='/admin/products' element={<ProductList />} />
          <Route path='/admin/orders' element={<OrderList />} />
          <Route path='/admin/products/add' element={<ProductAdd />} />
          <Route path='/admin/products/:id/edit' element={<ProductEdit />} />
        </Route>

      </Routes >
      <Routes>
        <Route path='/' element={<LayoutWebsite />}>
          <Route index element={<Home />} />
          <Route path='shops' element={<Shops />} />
          <Route path='products/:id' element={<ProductDetail />} />
          <Route path='cart' element={<Cart />} />
          <Route path='order' element={<Order />} />
        </Route>
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
      </Routes>
    </>
  )
}

export default App
