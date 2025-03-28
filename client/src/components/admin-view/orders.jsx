import { useEffect, useState } from "react";
import { Button } from "../ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";
import AdminOrderDetailsView from "./order-details";
import { Dialog } from "../ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, resetOrderDetails } from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";

function AdminOrdersView(){

    const [openDetailsDialog, setOpenDetailsDialog]=useState(false); 
    const {orderList, orderDetails} = useSelector((state)=> state.adminOrder)
    const dispatch = useDispatch();

    function handleFetchOrderDetails(getId) {
      dispatch(getOrderDetailsForAdmin(getId));
    }

    useEffect(()=>{
      dispatch(getAllOrdersForAdmin())
    }, [dispatch])

    console.log(orderDetails, "orderList")

    useEffect(() => {
      if (orderDetails !== null) setOpenDetailsDialog(true);
    }, [orderDetails]);


    return(
        <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {orderList && orderList.length > 0
              ? orderList.map((orderItem) => (
                  <TableRow>
                    <TableCell>{orderItem?._id}</TableCell>
                    <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                    <TableCell>
                      <Badge
                        className={`py-1 px-3 text-white ${
                          orderItem?.orderStatus === "confirmed"
                            ? "bg-green-500 text-white"
                            : orderItem?.orderStatus === "rejected"
                            ? "bg-red-600 text-white"
                            : "bg-black text-white"
                        }`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>${orderItem?.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <Button className="cursor-pointer text-white bg-black"
                          onClick={() =>
                            handleFetchOrderDetails(orderItem?._id)
                          }
                        >
                          View Details
                        </Button>
                        <AdminOrderDetailsView orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
          </ Table>
        </ CardContent>
    </Card>
    )
}

export default AdminOrdersView;