import {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import MainLayoutWrapper from "@/components/page-wrapper/MainLayoutWrapper";
import PaymentReceiveView from "@/pages/account-management/PaymentReceiveView";
import PaymentReceiveForm from "@/pages/account-management/PaymentReceiveForm";
import {resetPaymentReceiveById} from "@/slices/paymentSlice";

const PaymentReceive = () => {
    const dispatch = useDispatch();
    const [component, setComponent] = useState("view");
    const [selectedReceipt, setSelectedReceipt] = useState(null);

    const componentChangeHandler = (comp) => {
        setComponent(comp);
    }

    const receiptSelectHandler = (receiptNo) => {
        setSelectedReceipt(receiptNo);
    }

    useEffect(()=>{
        dispatch(resetPaymentReceiveById())
    },[dispatch])

    return (
        <MainLayoutWrapper title="Payment Receive">
            {component === "view" && (
                <PaymentReceiveView  
                    handleComponentChange={(comp)=>componentChangeHandler(comp)}
                    handleReceiptSelect={(receiptNo)=>receiptSelectHandler(receiptNo)}
                />
            )}
            {component === "create" && (
                <PaymentReceiveForm 
                    title="Create Payment Receive"
                    handleComponentChange={(comp)=>componentChangeHandler(comp)}
                />
            )}
            {component === "edit" && (
                <PaymentReceiveForm 
                    title="Edit Payment Receive"
                    receiptNo={selectedReceipt}
                    handleComponentChange={(comp)=>componentChangeHandler(comp)}
                />
            )}
        </MainLayoutWrapper>
    )
}

export default PaymentReceive;