import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

function PaymentSuccessPage(){
    const navigate = useNavigate();
    return(
        <Card className="p-10">
            <CardHeader className="p-0">
                <CardTitle className="text-4xl">Payment is successful</CardTitle>
            </CardHeader>
            <Button className="mt-5 bg-black text-white" onClick={()=> navigate("/shop/account")}>View Card</Button>
        </Card>
    );
}

export default PaymentSuccessPage;