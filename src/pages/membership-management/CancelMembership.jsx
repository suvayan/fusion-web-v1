import {useEffect, useCallback, useRef, useMemo} from "react";
import {useSelector, useDispatch} from "react-redux";
import MainLayoutWrapper from "@/components/page-wrapper/MainLayoutWrapper";
import MemberShipForm from "./membership-form";
import {resetPageLoader} from "@/slices/baseSlice";
import {cancelMembership} from "@/constants/membership-forms.constant";

const CancelMembership = () => {

    const cancelMemberRef = useRef(null)

    const defaultValues = useMemo(()=> ({
        ...(cancelMembership || []).filter((item)=> !item.name.startsWith("_")).reduce((acc, curr) => {
            acc[curr.name] = "";
            return acc;
        }, {})
    }), [])

    return (
        <MainLayoutWrapper title="Cancel Membership">
            <MemberShipForm
                ref={cancelMemberRef}
                title="Cancel Membership Form"
                formFields={[...cancelMembership]}
                defaultValues={{...defaultValues}}
            />
        </MainLayoutWrapper>
    )
}

export default CancelMembership;