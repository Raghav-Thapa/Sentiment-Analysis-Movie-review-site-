import { Outlet } from "react-router-dom";
import "./components/admin.model.css"
import { AdminFooter, AdminSidebar, AdminTopNav } from "../admin/components";

const AdminLayout = () => {

    return (<>

        <AdminTopNav />

        <div id="layoutSidenav">

            <AdminSidebar />

            <div id="layoutSidenav_content" className="my-5">
                <main>
                    <Outlet />
                </main>

            </div>
        </div>
        <AdminFooter />
    </>
    )
}

export default AdminLayout