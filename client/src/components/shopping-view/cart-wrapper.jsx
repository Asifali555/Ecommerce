import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({cartItems, setOpenCartSheet}){
    const navigate = useNavigate();

    const totalCartAmount = 
    cartItems && cartItems.length > 0
    ? cartItems.reduce(
        (sum, currentItem) =>
            sum + 
            (currentItem?.salePrice > 0
                ? currentItem?.salePrice
                : currentItem?.price) *
            currentItem?.quantity, 0 
    ) : 0;


    return(
        <SheetContent className="p-3 sm:max-w-md bg-white">
            <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
            </SheetHeader>
            <div className="space-y-4">
            {
                cartItems && cartItems.length > 0 ?
                cartItems.map(item=> <UserCartItemsContent cartItems={item} />) : null
            }
        </div>
        <div className="mt-8 space-y-4">
            <div className="flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold">${totalCartAmount}</span>
            </div>
        </div>
        <div className="p-4">
            <Button 
            onClick={()=> {
                navigate('/shop/checkout')
                setOpenCartSheet(false) 
            }}
            className="cursor-pointer w-full py-3 bg-black text-white">Checkout</Button>
        </div>


        </SheetContent>
    )
}


export default UserCartWrapper;