import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useEffect, useState } from "react";
import ProductImageUpload from "./image-upload";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct, fetchAllProducts, editProduct, deleteProduct } from "@/store/admin/products-slice";
import { toast } from "sonner";
import AdminProductTile from "@/components/admin-view/product-tile";

const initialFormData = {
    image : null,
    title : '',
    description : '',
    category : "",
    brand : '',
    price : '',
    salePrice : '', 
    totalStock : ''
}

function AdminProducts() {
    const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl]= useState('');
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const {productList} = useSelector(state=> state.adminProducts);
    const [currentEditedId, setCurrentEditedId] = useState(null);
    const dispatch = useDispatch()

    function onSubmit(event) {
    event.preventDefault();
    currentEditedId !== null
      ? dispatch(
          editProduct({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          console.log(data, "edit");

          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setFormData(initialFormData);
            setOpenCreateProductsDialog(false);
            setCurrentEditedId(null);
          }
        })
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setOpenCreateProductsDialog(false);
            setImageFile(null);
            setFormData(initialFormData);
            toast.success("Product Added Successfully")
          }
        });
  }

  //delete product
  function handleDelete(getCurrentProductId){
    console.log(getCurrentProductId);
    dispatch(deleteProduct(getCurrentProductId)).then(data=>{
        dispatch(fetchAllProducts());
    })
  }

  function isFormValid(){
    return Object.keys(formData)
        .map((key) => formData[key] !== "")
        .every((item) => item)
    }

    useEffect(() => {
        dispatch(fetchAllProducts()) 
    }, [dispatch])

    console.log(productList, uploadedImageUrl, "productList");
    
    return (
        <>
        <div className="mb-5 w-full flex justify-end">
        <Button className="bg-black text-white" onClick={() => {
    setOpenCreateProductsDialog(true);
    setCurrentEditedId(null);  
    setFormData(initialFormData);  
}}> Add New Products</Button>

        </div>
        <div className="flex flex-wrap gap-4  w-full">
    {productList && productList.length > 0
        ? productList.map((productItem) => (
            <AdminProductTile 
            setFormData={setFormData} 
            setOpenCreateProductsDialog={setOpenCreateProductsDialog} 
            setCurrentEditedId={setCurrentEditedId} 
            product={productItem}
            handleDelete ={handleDelete}
            className="w-60" />
        ))
        : null}
</div>


        <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
            setOpenCreateProductsDialog(false);
        }}
        >
            <SheetContent   side="right" className="overflow-auto bg-white">
                <SheetHeader >
                    <SheetTitle >
                        {
                            currentEditedId !== null ?
                            "Edit Product" : "Add New Product"
                        }
                    </SheetTitle>
                </SheetHeader>
                
                <ProductImageUpload 
                imageFile={imageFile}
                setImageFile={setImageFile}
                uploadedImageUrl={uploadedImageUrl}
                setUploadedImageUrl={setUploadedImageUrl}
                setImageLoadingState={setImageLoadingState}
                imageLoadingState={imageLoadingState}
                currentEditedId={currentEditedId}
                isEditedMode={currentEditedId !== null}
                />
                <div className="p-6">
                    
                    <CommonForm 
                    onSubmit={onSubmit}
                    formData={formData} 
                    setFormData={setFormData}
                    buttonText={currentEditedId !== null ? "Edit" : "Add"}
                    formControls={addProductFormElements} 
                    isBtnDisabled={!isFormValid()}
                    />
                </div>
            </SheetContent>
        </Sheet>
        </>
    )
}

export default AdminProducts;