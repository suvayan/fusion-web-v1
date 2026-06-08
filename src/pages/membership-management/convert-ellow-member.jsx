import {useState, useEffect, useCallback, useRef, useMemo} from "react";
import {useSelector, useDispatch} from "react-redux";
import MainLayoutWrapper from "@/components/page-wrapper/MainLayoutWrapper";
import MemberShipForm from "./membership-form";
import {convertMembership} from "@/constants/membership-forms.constant";
import {resetPageLoader} from "@/slices/baseSlice";
import { 
    getMembershipClass, getRegions,
    getNationality, getChapters
} from "@/slices/commonSlice";
import FormWrapper from "@/components/page-wrapper/FormWrapper";
import {getMembershipDetails, resetMembershipDetails} from "@/slices/membershipSlice";
import useDebounce from "@/hooks/useDebounce";
import {InputField} from "@/components/ui/input-fields";

const ConvertFellowMember = () => {
    const covertMemberRef = useRef(null);
    const [membershipId, setMembershipId] = useState("");
    const debounceMembershipId = useDebounce(membershipId, 500);
    const dispatch = useDispatch();
    const {membershipDetails} = useSelector((state) => state.membership);
    const {
        memberShipClasses, regions,
        nationalities, chapters
    } = useSelector((state) => state.common);
    const defaultValues = useMemo(()=> ({
        ...(convertMembership || []).filter((item)=> !item.name.startsWith("_")).reduce((acc, curr) => {
            acc[curr.name] = membershipDetails?.[curr.name] ?? "";
            return acc;
        }, {})
    }), [membershipDetails])

    const optionsGetter = useCallback((fieldName)=>{
        
        if(fieldName === "membershipClass"){
            return (memberShipClasses ?? []).map((item) => ({
                label: item.mc_description, value: item.mc_id
            }))
        }
        if(fieldName === "region"){
            return (regions ?? []).map((item) => ({
                label: item.region_description, value: item.region_id
            }))
        }
        if(fieldName === "nationality"){
            return (nationalities ?? []).map((item) => ({
                label: item.label, value: item.value
            }))
        }
        if(fieldName === "chapter"){
            return (chapters ?? []).map((item) => ({
                label: item.chapter_description, value: item.chapter_id
            }))
        }
    },[memberShipClasses, regions, nationalities, chapters])


    const autoFormChangeCallHandler = useCallback(async(formValues)=>{
        if(formValues.region){
            await dispatch(getChapters(formValues.region));
        }
    }, [dispatch])


    useEffect(() => {
        const fetchCombo = async () => {
            try{
                dispatch(resetPageLoader(true));
                await Promise.allSettled([
                    dispatch(getMembershipClass()).unwrap(),
                    dispatch(getRegions()).unwrap(),
                    dispatch(getNationality()).unwrap(),
                ]);

            } catch(err){
                console.log(err?.message || "Error to load data")
                dispatch(resetPageLoader(false))
            }finally{
                dispatch(resetPageLoader(false))
            }
            
        }

        fetchCombo()
    }, [dispatch])

    useEffect(()=>{
        if(debounceMembershipId){
            dispatch(getMembershipDetails({"imm_id": debounceMembershipId}))
        }
    },[dispatch, debounceMembershipId])

    useEffect(()=>{
        dispatch(resetMembershipDetails());
    }, [dispatch])

    const formSubmitHandler = (data) => {
        console.log(data);
    }

    return (
        <MainLayoutWrapper title="Convert Fellow Membership">
            <FormWrapper title="Convert Fellow Membership Form">
                <div className="row p-3 g-3">
                    <div className="col-md-4 col-sm-12">
                        <InputField 
                            label="Membership ID"
                            type="text"
                            value={membershipId}
                            onChange={(e)=>setMembershipId(e.target.value)}
                        />
                    </div>
                </div>
                <MemberShipForm
                    ref={covertMemberRef}
                    title="Convert Fellow Membership Form"
                    formFields={[...convertMembership]}
                    defaultValues={{...defaultValues}}
                    optionsGetter={optionsGetter}
                    autoFormChangeCallHandler={autoFormChangeCallHandler}
                    formSubmitHandler={formSubmitHandler}
                />
            </FormWrapper>
        </MainLayoutWrapper>
    )
}

export default ConvertFellowMember;