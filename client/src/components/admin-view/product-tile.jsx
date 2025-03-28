import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({product, setFormData, setOpenCreateProductsDialog, setCurrentEditedId, handleDelete}){
    return (
        <Card className="w-60 mx-auto">  
    <div className="relative">
        <div>
            <img
                src={product?.image}
                alt={product?.name}
                className="w-full h-[300px] object-cover rounded-t-lg"
            />
        </div>
        <CardContent>
            <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
            <div className="flex justify-between items-center mb-2">
                <span
                  className={`${
                    product?.salePrice > 0 ? "line-through" : ""
                  } text-lg font-semibold text-primary`}
                >
                  ${product?.price}
                </span>
                {product?.salePrice > 0 ? (
                  <span className="text-lg font-bold">${product?.salePrice}</span>
                ) : null}
            </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
            <Button onClick={()=>{
                setOpenCreateProductsDialog(true);
                setCurrentEditedId(product?._id);
                setFormData(product);
            }} className="bg-black text-white">Edit</Button>
            <Button onClick={()=>handleDelete(product?._id)} className="bg-black text-white">Delete</Button>
        </CardFooter>
    </div>
</Card>

    )
}

export default AdminProductTile;