import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import accImg from "../../assets/account.jpg";
import Address from "@/components/shopping-view/address";
import ShoppingOrders from "@/components/shopping-view/orders";
import { useSelector } from "react-redux";

function ShoppingAccount() {
  const {user} = useSelector(state => state.auth);
    return (
        <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accImg}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
          <div className="p-3">
            <h2 className="text-xl font-bold">User Information</h2>
            <hr className="w-41 border-gray-300" />
            <p className="font-bold text-gray-600">User Name : {user?.userName}</p>
            <p className="font-bold text-gray-600">Email : {user?.email}</p>
            <p className="font-bold text-gray-600">Role : {user?.role}</p>
          </div>
            
          <Tabs defaultValue="orders">
          <TabsList className="bg-gray-100">
              <TabsTrigger  value="orders">Orders</TabsTrigger>
              <TabsTrigger  value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent  value="orders">
                <ShoppingOrders  />
            </TabsContent>
            <TabsContent value="address">
                <Address />
            </TabsContent>
           </Tabs>
        </div>
        </div>
        </div>
    )
}

export default ShoppingAccount;