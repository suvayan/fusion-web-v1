import {useEffect} from "react";
import {useDispatch} from "react-redux";
import MainLayoutWrapper from "@/components/page-wrapper/MainLayoutWrapper";
import PaymentReceiveForm from "./PaymentReceiveForm";
import {resetPaymentReceiveById} from "@/slices/paymentSlice";

const ModifyReceipt = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(resetPaymentReceiveById())
    },[dispatch])
    return (
        <MainLayoutWrapper title="Modify Receipt">
            <PaymentReceiveForm title="Modify Receipt" />
        </MainLayoutWrapper>
    )
}

export default ModifyReceipt;