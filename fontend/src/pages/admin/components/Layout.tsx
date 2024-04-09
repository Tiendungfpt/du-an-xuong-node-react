import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar'

const Layout = () => {
    return (
        <div className="h-full">

            <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
                <Sidebar />
            </div>
            <hr />
            <main className="relative md:pl-56 pt-[80px] h-full z-10">
                <div className="m-5">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default Layout