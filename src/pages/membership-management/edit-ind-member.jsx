import {useState, useEffect, useCallback, useRef, useMemo} from "react";
import {useSelector, useDispatch} from "react-redux";
import MainLayoutWrapper from "@/components/page-wrapper/MainLayoutWrapper";
import MemberShipForm from "./membership-form";
import {resetPageLoader} from "@/slices/baseSlice";
import { states as statesMaster } from "@/constants/states";
import {memberIndship} from "@/constants/membership-forms.constant";
import FormWrapper from "@/components/page-wrapper/FormWrapper";
import {
    getPostalCodes, fetchCountries, 
    getMembershipClass, getRegions,
    getNationality, getChapters,
    getDispatchModes, setStateByCounrty
} from "@/slices/commonSlice";
import {getMembershipDetails, resetMembershipDetails} from "@/slices/membershipSlice";
import useDebounce from "@/hooks/useDebounce";
import {InputField} from "@/components/ui/input-fields";


const EditIndMember = () => {
    const editMemberRef = useRef(null);
    const [membershipId, setMembershipId] = useState("");
    const debounceMembershipId = useDebounce(membershipId, 500);
    const dispatch = useDispatch();
    const {membershipDetails} = useSelector((state) => state.membership);
    const {
        countries, postalCods, 
        memberShipClasses, regions,
        nationalities, chapters,
        dispatchModes, stateByCountry
    } = useSelector((state) => state.common);

    const defaultValues = useMemo(()=> ({
        ...(memberIndship || []).filter((item)=> !item.name.startsWith("_")).reduce((acc, curr) => {
            acc[curr.name] = membershipDetails?.[curr.name] ?? "";
            return acc;
        }, {})
    }), [membershipDetails])


    const optionsGetter = useCallback((fieldName)=>{
        if(fieldName === "postalCode"){
            return (postalCods ?? []).map((postalCode) => ({
                label: postalCode.pc_desc, value: postalCode.pc_id
            }))
        }
        if(fieldName === "country"){
            return (countries ?? []).map((item) => ({
                label: item.country, value: item.code
            }))
        }
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
        if(fieldName === "dispatchMode"){
            return (dispatchModes ?? []).map((item) => ({
                label: item.dm_description, value: item.dm_id
            }))
        }
        if(fieldName === "industryCat"){
            return ["IT", "Manufacturing", "Construction"].map((item) => ({
                label: item, value: item.toLocaleLowerCase()
            }))
        }
        if(fieldName === "status"){
            return ["Active", "Inactive"].map((item) => ({
                label: item, value: item.toLocaleLowerCase()
            }))
        }
        if(fieldName === "state"){
            return [{ state: "", code: "" }, ...(stateByCountry || [])].map((item) => ({
                label: item.state, value: item.state
            }))
        }
    },[postalCods, countries, memberShipClasses, regions, nationalities, chapters, dispatchModes, stateByCountry])


    const autoFormChangeCallHandler = useCallback(async(formValues)=>{
        if(formValues.region){
            await dispatch(getChapters(formValues.region));
        }
        if(formValues.country){
            const states = statesMaster[formValues.country];
            dispatch(setStateByCounrty(states))
        }
    }, [dispatch])

    useEffect(() => {
        const fetchCombo = async () => {
            try{
                dispatch(resetPageLoader(true));
                await Promise.allSettled([
                    dispatch(getPostalCodes()).unwrap(),
                    dispatch(fetchCountries()).unwrap(),
                    dispatch(getMembershipClass()).unwrap(),
                    dispatch(getRegions()).unwrap(),
                    dispatch(getNationality()).unwrap(),
                    dispatch(getDispatchModes()).unwrap(),
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
        <MainLayoutWrapper title="Edit Industry Member">
            <FormWrapper title="Edit Industry Member Form">
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
                    ref={editMemberRef}
                    title="Edit Industry Member Form"
                    formFields={[...memberIndship]}
                    defaultValues={{...defaultValues}}
                    optionsGetter={optionsGetter}
                    autoFormChangeCallHandler={autoFormChangeCallHandler}
                    formSubmitHandler={formSubmitHandler}
                />
            </FormWrapper>
        </MainLayoutWrapper>
    )
}

export default EditIndMember;