import { Outlet } from "react-router-dom";
import AdminHeader from "./header.jsx";
import AdminSidebar from "./sidebar.jsx";
import { useState } from "react";

function AdminLayout() {
    const [openSidebar, setOpenSidebar] = useState(false);
    return (
        <div className="flex min-h-screen w-full">
            {/* admin sidebar */}
            <AdminSidebar open={openSidebar} setOpen={setOpenSidebar}/>
            <div className="flex flex-1 flex-col">
                {/* Admin header */}
                <AdminHeader setOpen={setOpenSidebar}/>
                <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
                  <Outlet />
                </main>
            </div>
        </div>
    )
}

export default AdminLayout;