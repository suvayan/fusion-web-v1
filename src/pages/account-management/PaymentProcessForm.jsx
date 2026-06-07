import {useMemo, useEffect} from "react";
import DataTable from "@/components/ui/table/DataTable";
import FormWrapper from "@/components/page-wrapper/FormWrapper";
import { Button } from "@/components/ui/button/Button";
import { useForm, Controller, useWatch } from "react-hook-form";
import {useSelector, useDispatch} from "react-redux";
import { InputField, TextareaField, SelectField, RadioGroupField, InputBox, DateField } from "@/components/ui/inputs/InputFields";
import { paymentProcessFieldObj } from "@/constants/fromFieldObject";
import {fetchCountries, getNationality, getAllState, getDispatchModes, getPostalCodes, getRegions, getChapters, getMembershipClass} from "@/slices/commonSlice.js";
import {getReceiptPayeeDetails, getMemberCategories} from "@/slices/paymentProcessSlice.js";


const PaymentProcessForm = ({title, selectedRow, setPageView}) => {
    const dispatch = useDispatch();
    const receiptNo = selectedRow[0]?.rh_receipt_no ?? "";
    const receiptAmt = selectedRow[0]?.processAmt ?? "";
    const {
        countries, nationalities, allStates,
        dispatchModes, postalCods, regions,
        chapters, memberShipClasses
    } = useSelector((state) => state.common);
    const {
        payeeName, payeeCountry, payeeState,
        payeeStateCode, payeeAddress, payeePincode,
        membershipCategories
    } = useSelector((state) => state.paymentProcess);

    const fromFields = useMemo(()=>paymentProcessFieldObj[title],[title]);

    const defaultValues = useMemo(()=>fromFields.reduce((acc, curr) => {
        acc[curr.name] = "";
        return acc;
    }, {}), [fromFields]);

    const columns = [
        { key: "rh_receipt_no", title: "Receipt No"},
        { key: "rh_cheq_dd_no", title: "A/C Doc No."},
        { key: "rh_amount", title: "Ammount" },
    ]

    const {control, setValue,  handleSubmit} = useForm({
        defaultValues: {...defaultValues},
        mode: "onSubmit"
    });

    useEffect(()=>{
        dispatch(fetchCountries());
        dispatch(getNationality());
        dispatch(getAllState());
        dispatch(getDispatchModes());
        dispatch(getPostalCodes());
        dispatch(getRegions());
        dispatch(getMembershipClass())
        dispatch(getMemberCategories())
        dispatch(getReceiptPayeeDetails(receiptNo));
        setValue("receiptAmt", receiptAmt);
        
        if(title === "New Membership(for Individual/Student/Affiliate)"){
            console.log(title, title === "New Membership(for Individual/Student/Affiliate)");
            setValue("ind_fore", "Indian");
            setValue("addressType", "Home");
            setValue("notification", "Yes");
        }

    },[title, dispatch, setValue, receiptAmt, receiptNo])





    

    const formValues = useWatch({control});

    useEffect(()=>{
        setValue("company_name", payeeName);
        setValue("country", payeeCountry);
        setValue("state", payeeState);
        setValue("stateCode", payeeStateCode);
        setValue("mailingAddress", payeeAddress);
        setValue("pinCode", payeePincode);
    },[setValue, payeeName, payeeCountry, payeeState, payeeStateCode, payeeAddress, payeePincode])

    useEffect(()=>{
        dispatch(getChapters(formValues?.region))
    }, [dispatch, formValues?.region])


    const submitHandler = (data) => {
        if(title === "New Membership(for Individual/Student/Affiliate)"){
            console.log(data)
        }
        console.log(data)
    }



    return (
        
        <FormWrapper
            title={title}
            isBack={true}
            handleBack={()=>setPageView("view")}
        >
            <div className="row col-md-12 col-sm-12 pb-5">
                <DataTable 
                    columns={columns}
                    data={selectedRow}
                />
            </div>
            <form className="row p-3 g-3" onSubmit={handleSubmit(submitHandler)}>
                {(fromFields ?? []).map((fromField) => (
                    <div className={fromField.container} key={fromField.name}>
                        {fromField.label && <label className="form-title-label">{fromField.label}</label>}
                        <Controller 
                            name={fromField.name ?? ""}
                            control={control}
                            render={({field, fieldState})=>{
                                let options = []

                                if(fromField.type === "select" || fromField.type === "radio"){
                                    if(fromField.name === "country"){
                                        options = (countries ?? []).map((country)=>({
                                            label: country.country, value: country.code
                                        }))
                                    }

                                    if(fromField.name === "ind_fore"){
                                        options = (nationalities ?? []).map((nationality)=>({
                                            label: nationality.label, value: nationality.value
                                        }))
                                    }

                                    if(fromField.name === "subsciptionYear"){
                                        options = ["0.5", "1", "2", "3"].map((item)=>({
                                            label: item, value: item
                                        }))
                                    }

                                    if(fromField.name === "state"){
                                        options = allStates.map((sta)=>({
                                            label: sta.state_name, value: sta.state_name
                                        }))
                                    }

                                    if(fromField.name === "despatchMode"){
                                        options = dispatchModes.map((r)=>({
                                            label: r.dm_description, value: r.dm_id
                                        }))
                                    }

                                    if(fromField.name === "postalCode"){
                                        options = postalCods.map((r)=>({
                                            label: r.pc_desc, value: r.pc_id
                                        }))
                                    }

                                    if(fromField.name === "region"){
                                        options = regions.map((el)=>({
                                            label: el.region_description, value: el.region_id
                                        }))
                                    }

                                    if(fromField.name === "chapter"){
                                        options = chapters.map((el)=>({
                                            label: el.chapter_description, value: el.chapter_id
                                        }))
                                    }

                                    if(fromField.name === "membershipClass"){
                                        options = memberShipClasses.map((el)=>({
                                            label: el.mc_description, value: el.mc_id
                                        }))
                                    }

                                    if(fromField.name === "membershipCategory"){
                                        options = membershipCategories.map((el)=>({
                                            label: el.mc_description, value: el.mc_id
                                        }))
                                    }

                                    if(fromField.name === "isExempted"){
                                        options = ["Yes", "No"].map((el)=>({
                                            label: el, value: el
                                        }))
                                    }

                                    if(fromField.name === "notification"){
                                        options = ["Yes", "No"].map((el)=>({
                                            label: el, value: el
                                        }))
                                    }
                                    if(fromField.name === "addressType"){
                                        options = ["Home", "Work/Office"].map((el)=>({
                                            label: el, value: el
                                        }))
                                    }
                                }

                                if(fromField.type === "select") {
                                    return (
                                        <SelectField 
                                            id={fromField.name}
                                            readOnly={fromField.readOnly}
                                            disabled={fromField.disabled}
                                            {...field}
                                            options={options}
                                            error={fieldState?.error?.message}
                                        />
                                    )
                                }

                                if(fromField.type === "text"){
                                    return (
                                        <InputField 
                                            id={fromField.name}
                                            type={fromField.type}
                                            readOnly={fromField.readOnly}
                                            disabled={fromField.disabled}
                                            {...field}
                                            error={fieldState?.error?.message}
                                        />
                                    )
                                }

                                if(fromField.type === "textarea") {
                                    return (
                                        <TextareaField 
                                            id={fromField.name}
                                            readOnly={fromField.readOnly}
                                            disabled={fromField.disabled}
                                            {...field}
                                            error={fieldState?.error?.message}
                                        />
                                    )
                                }

                                if(fromField.type === "radio"){
                                    return (
                                        <RadioGroupField 
                                            id={fromField.name}
                                            readOnly={fromField.readOnly}
                                            disabled={fromField.disabled}
                                            {...field}
                                            direction="row"
                                            options={options}
                                            error={fieldState?.error?.message}
                                        />
                                    )
                                }

                                if(fromField.type === "textBox"){
                                    return (
                                        <InputBox 
                                            id={fromField.name}
                                            type={fromField.type}
                                            readOnly={fromField.readOnly}
                                            disabled={fromField.disabled}
                                            {...field}
                                            addOns={fromField.addOns}
                                            error={fieldState?.error?.message}
                                        />
                                    )
                                }
                                if(fromField.type === "date") {
                                    return (
                                        <DateField
                                            id={fromField.name}
                                            isClear={true}
                                            readOnly={fromField.readOnly}
                                            disabled={fromField.disabled}
                                            {...field}
                                            error={fieldState?.error?.message}
                                        />
                                    )
                                }
                                return null;
                            }}
                        />
                    </div>
                ))}
                <div className="col-md-12 col-sm-12 d-flex justify-content-center gap-2">
                    <Button type="submit" variant="primary" title="Submit">Submit</Button>
                </div>
            </form>
        </FormWrapper>  
    )
}

export default PaymentProcessForm;