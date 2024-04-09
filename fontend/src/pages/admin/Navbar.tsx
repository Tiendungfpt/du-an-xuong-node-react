
import MobileSidebar from "./MobileSidebar";
import SidebarRoutes from "./SidebarRouter";

const Navbar = () => {
    return (
        <div className="p-4 border-b h-full flex items-center bg-whiteshadow-sm ">
            <MobileSidebar />
            <SidebarRoutes />
        </div>
    );
};

export default Navbar;