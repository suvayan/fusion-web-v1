import Header from "./Header";
import DynamicSidebar from "@/components/sidebar/DynamicSidebar";
import {Outlet} from "react-router-dom";

const MainLayout = () => {
    return (
        <div className="wrapper">
            <DynamicSidebar />
            <Header />
            <Outlet />
        </div>
    )
}

export default MainLayout