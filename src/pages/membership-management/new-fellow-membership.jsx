import {useMemo, useRef} from "react";
import MainLayoutWrapper from "@/components/page-wrapper/MainLayoutWrapper";
import {newFellowMembership} from "@/constants/membership-forms.constant";
import MemberShipForm from "./membership-form";

const NewFellowMembership = () => {
    const fellowMembership = useRef(null);

    const defaultValues = useMemo(()=> ({
        ...(newFellowMembership || []).filter((item)=> !item.name.startsWith("_")).reduce((acc, curr) => {
            acc[curr.name] = "";
            return acc;
        }, {})
    }), [])
    return (
        <MainLayoutWrapper title="New Fellow Membership">
            <MemberShipForm
                ref={fellowMembership}
                title="New Fellow Membership Form"
                formFields={[...newFellowMembership]}
                defaultValues={{...defaultValues}}
                // optionsGetter={optionsGetter}
                // autoFormChangeCallHandler={autoFormChangeCallHandler}
            />
        </MainLayoutWrapper>
    )
}

export default NewFellowMembership;