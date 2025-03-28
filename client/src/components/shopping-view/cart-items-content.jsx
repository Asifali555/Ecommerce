import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { toast } from "sonner";

function UserCartItemsContent({ cartItems }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { cartItems: cartItemsFromRedux } = useSelector((state) => state.shopCart); 
  const { productList } = useSelector((state) => state.shopProducts);

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    if (typeOfAction == "plus") {
      let getCartItems = cartItemsFromRedux.items || []; 

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId
        );

        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId
        );
        const getTotalStock = productList[getCurrentProductIndex].totalStock;

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast.error(`Only ${getQuantity} quantity can be added for this item`);
            return;
          }
        }
      }
    }

    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity: typeOfAction === "plus" ? getCartItem?.quantity + 1 : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Cart item is updated successfully");
      }
    });
  }

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItems?.image}
        alt={cartItems?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItems?.title}</h3>
        <div className="flex gap-2 items-center mt-1">
          <Button
            variant="outline"
            className="cursor-pointer h-8 w-8 rounded-full"
            disabled={cartItems?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItems, "minus")}
            size="icon"
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="font-semibold">{cartItems?.quantity}</span>
          <Button
            variant="outline"
            className="cursor-pointer h-8 w-8 rounded-full"
            onClick={() => handleUpdateQuantity(cartItems, "plus")}
            size="icon"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(
            (cartItems?.salePrice > 0 ? cartItems?.salePrice : cartItems?.price) *
            cartItems?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handlecartItemsDelete(cartItems)}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
}

export default UserCartItemsContent;
