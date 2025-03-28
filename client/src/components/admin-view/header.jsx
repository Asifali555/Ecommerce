import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/store/auth-slice";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useState } from "react";

function AdminHeader({ setOpen }) {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [isSheetOpen, setIsSheetOpen] = useState(false); 

    function handleLogout() {
        dispatch(logoutUser());
    }

    console.log(user, "user");

    return (
        <header className=" flex items-center justify-between px-4 py-3 bg-background border-b">
            <Button onClick={() => setOpen(true)} className="cursor-pointer lg:hidden sm:block bg-black text-white">
                <AlignJustify />
                <span className="sr-only">Toggle Menu</span>
            </Button>

            <div className="flex flex-1 gap-5 justify-end">

                {/* Avatar that opens the Sheet on click */}
                <Sheet  open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                        <Avatar 
                            onClick={() => setIsSheetOpen(true)} 
                            className="bg-black cursor-pointer"
                        >
                            <AvatarFallback className="bg-black text-white font-extrabold">
                                {user?.userName?.[0]?.toUpperCase() || "U"}
                            </AvatarFallback>
                        </Avatar>
                    </SheetTrigger>

                    <SheetContent className="p-5 bg-white text-black">
                        <div className="flex justify-around">
                        <h2 className="text-xl font-bold">Admin Information</h2>
                        <Avatar>
                        <AvatarFallback className="bg-black text-white font-extrabold">
                                {user?.userName?.[0]?.toUpperCase() || "U"}
                            </AvatarFallback>
                        </Avatar>
                        </div>
                        <hr className="my-2 border-gray-300" />
                        <p className="font-bold">Name : <span className="font-bold text-gray-500">{user?.userName}</span></p>
                        <p className="font-bold">Email : <span className="font-bold text-gray-500">{user?.email}</span></p>
                        <p className="font-bold">Role : <span className="font-bold text-gray-500">{user?.role}</span></p>
                    </SheetContent>
                </Sheet>

                <Button onClick={handleLogout} className="cursor-pointer bg-black text-white inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow">
                    <LogOut />
                    Logout
                </Button>
            </div>
        </header>
    );
}

export default AdminHeader;
