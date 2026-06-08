import {useEffect, useRef, useMemo} from "react";
import {useDispatch} from "react-redux";
import MainLayoutWrapper from "@/components/page-wrapper/MainLayoutWrapper";
import MemberShipForm from "./membership-form";
import {cancelMembership} from "@/constants/membership-forms.constant";
import FormWrapper from "@/components/page-wrapper/FormWrapper";
import {resetMembershipDetails} from "@/slices/membershipSlice";

const CancelMembership = () => {
    const dispatch = useDispatch();
    const cancelMemberRef = useRef(null)
    const defaultValues = useMemo(()=> ({
        ...(cancelMembership || []).filter((item)=> !item.name.startsWith("_")).reduce((acc, curr) => {
            acc[curr.name] = "";
            return acc;
        }, {})
    }), [])

    useEffect(()=>{
        dispatch(resetMembershipDetails());
    }, [dispatch])

    return (
        <MainLayoutWrapper title="Cancel Membership">
            <FormWrapper title="Cancel Membership Form">
                <MemberShipForm
                    ref={cancelMemberRef}
                    title="Cancel Membership Form"
                    formFields={[...cancelMembership]}
                    defaultValues={{...defaultValues}}
                />
            </FormWrapper>
        </MainLayoutWrapper>
    )
}

export default CancelMembership;