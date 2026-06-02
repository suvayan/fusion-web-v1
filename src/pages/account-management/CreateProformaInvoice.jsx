import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { useForm, Controller, useWatch } from "react-hook-form";
import MainLayoutWrapper from "@/components/page-wrapper/MainLayoutWrapper";
import FormWrapper from "@/components/page-wrapper/FormWrapper";
import {Button} from "@/components/ui/button/Button";
import { InputField, TextareaField, SelectField, DatalistField, InputBox, RadioGroupField } from "@/components/ui/inputs/InputFields";
import {fetchEnterpriseUnitList, fetchServiceList, fetchConcernDepartments, fetchStateNames, fetchStateCode} from "@/slices/commonSlice";
import {fetchAutoloadEnterpriseUnit, fetchGSTAndStateCodeDetails, fetchCustomerName, fetchCustomerDetails, createProformaInvoice} from "@/slices/paymentSlice";
import useDebounce from "@/hooks/useDebounce";


const fromFields = [
    {
        container: "col-md-6 col-sm-6",
        label: "Enterprise Unit",
        name: "enterpriseUnit",
        type: "select",
        readOnly: false,
        disabled: false,
        rules: {
            required: "Enterprise Unit is required",
        },
    },
    {
        container: "col-md-6 col-sm-6",
        label: "GSTIN",
        name: "gstin",
        type: "text",
        readOnly: true,
        disabled: false,
        rules: {
            required: "GSTIN is required",
        },
    },
    {
        container: "col-md-6 col-sm-6",
        label: "State Name",
        name: "stateName",
        type: "text",
        readOnly: true,
        disabled: false,
        rules: {
            required: "State Name is required",
        },
    },
    {
        container: "col-md-6 col-sm-6",
        label: "State Code",
        name: "stateCode",
        type: "text",
        readOnly: true,
        disabled: false,
        rules: {
            required: "State Code is required",
        },
    },
    {
        container: "col-md-6 col-sm-12",
        label: "Department",
        name: "department",
        type: "select",
        readOnly: false,
        disabled: false,
        rules: {
            required: "State Code is required",
        },
    },
    {
        container: "col-md-9 col-sm-12",
        label: "Customer Name",
        name: "customerName",
        type: "datalist",
        readOnly: false,
        disabled: false,
        rules: {
            required: "Customer Name is required",
        },
    },
    {
        container: "col-md-6 col-sm-12",
        label: "Customer Code",
        name: "customerCode",
        type: "text",
        readOnly: true,
        disabled: false,
        rules: {
            required: "Customer Code is required",
        },
    },
    {
        container: "col-md-6 col-sm-12",
        label: "Customer Type",
        name: "customerType",
        type: "text",
        readOnly: true,
        disabled: false,
        rules: {
            required: "Customer Type is required",
        },
    },
    {
        container: "col-md-6 col-sm-12",
        label: "Customer Address",
        name: "customerAddress",
        type: "textarea",
        readOnly: true,
        disabled: false,
        rules: {
            required: "Customer Address is required",
        },
    },
    {
        container: "col-md-6 col-sm-12",
        label: "Customer GSTN",
        name: "customerGSTN",
        type: "text",
        readOnly: true,
        disabled: false,
    },
    {
        container: "col-md-6 col-sm-12",
        label: "Cust. State Name",
        name: "customerStateName",
        type: "datalist",
        readOnly: false,
        disabled: false,
    },
    {
        container: "col-md-6 col-sm-12",
        label: "Cust. State Code",
        name: "customerStateCode",
        type: "text",
        readOnly: true,
        disabled: false,
    },
    {
        container: "col-md-6 col-sm-12",
        label: "Service/Material",
        name: "service",
        type: "select",
        readOnly: false,
        disabled: false,
        rules: {
            required: "State Code is required",
        },
    },
    {
        container: "col-md-6 col-sm-12",
        label: "HSN / SAC Code",
        name: "hsnSacCode",
        type: "text",
        readOnly: true,
        disabled: false,
        rules: {
            required: "State Code is required",
        },
    },
    {
        container: "col-md-12 col-sm-12",
        label: "Description",
        name: "description",
        type: "textarea",
        readOnly: false,
        disabled: false,
        rules: {
            required: "Description is required",
        },
    },
    {
        container: "col-md-12 col-sm-12",
        label: "Terms & Conditions",
        name: "terms",
        type: "textarea",
        readOnly: false,
        disabled: false,
        rules: {
            required: "Description is required",
        },
    },
        {
        container: "col-md-6 col-sm-12",
        label: "Quantity",
        name: "quantity",
        type: "text",
        readOnly: false,
        disabled: false,
        rules: {
            required: "Quantity is required",
        },
    },
    {
        container: "col-md-6 col-sm-12",
        label: "UOM",
        name: "uom",
        type: "text",
        readOnly: false,
        disabled: false,
        rules: {
            required: "Description is required",
        },
    },
    {
        container: "col-md-6 col-sm-12",
        label: "Base Amt.",
        name: "baseAmt",
        type: "text",
        readOnly: false,
        disabled: false,
        rules: {
            required: "Description is required",
        },
    },
    {
        container: "col-md-6 col-sm-12",
        label: "Taxable Amt.",
        name: "taxableAmt",
        type: "textBox",
        addOns: "INR",
        readOnly: false,
        disabled: false,
        rules: {
            required: "Description is required",
        },
    },
    {
        container: "col-md-6 col-sm-12",
        label: "IGST Amt.",
        name: "igstAmt",
        type: "textBox",
        addOns: "INR",
        readOnly: false,
        disabled: false,
        rules: {
            required: "Description is required",
        },
    },
    {
        container: "col-md-6 col-sm-12",
        label: "CGST Amt.",
        name: "cgstAmt",
        type: "textBox",
        addOns: "INR",
        readOnly: false,
        disabled: false,
        rules: {
            required: "Description is required",
        },
    },
    {
        container: "col-md-6 col-sm-12",
        label: "SGST Amt.",
        name: "sgstAmt",
        type: "textBox",
        addOns: "INR",
        readOnly: false,
        disabled: false,
        rules: {
            required: "Description is required",
        },
    },
    {
        container: "col-md-6 col-sm-12",
        label: "Total Amt.",
        name: "totalAmt",
        type: "textBox",
        addOns: "INR",
        readOnly: false,
        disabled: false,
        rules: {
            required: "Description is required",
        },
    },
    {
        container: "col-md-6 col-sm-12",
        label: "Reverse Changes",
        name: "reverseCharges",
        type: "radio",
        readOnly: false,
        disabled: false,
        options: [
            {label: "Yes", value: "Yes"},
            {label: "No", value: "No"},
        ],
        rules: {
            required: "Description is required",
        },
    },
    {
        container: "col-md-6 col-sm-12",
        label: "Is Exempted",
        name: "isExempted",
        type: "radio",
        readOnly: false,
        disabled: false,
        options: [
            {label: "Yes", value: "Yes"},
            {label: "No", value: "No"},
        ],
        rules: {
            required: "Description is required",
        },
    },
]

const defaultValues = fromFields.reduce((acc, curr) => {
    acc[curr.name] = "";
    return acc;
}, {});


const CreateProformaInvoice = () => {

    const dispatch = useDispatch()
    const {enterpriseUnitList, serviceList, concernDepartments, states, stateCode: custStateCode} = useSelector((state) => state.common);
    const {autoloadEnterpriseUnit, gstin, stateName, stateCode, customerNames, customerCode, customerType, customerGstin, customerAddress} = useSelector((state) => state.payment);

    const {control, setValue, handleSubmit} = useForm({
        defaultValues: {
            ...defaultValues,
        },
        mode: "onSubmit"
    })

    const formValues = useWatch({control});
    const customerNameValue = useWatch({ control, name: "customerName",});
    const debouncedCustomerName = useDebounce(customerNameValue, 500);

    const customerState = useWatch({ control, name: "customerStateName",});
    const debouncedCustomerState = useDebounce(customerState, 500);

    useEffect(()=> {
        dispatch(fetchEnterpriseUnitList());
        dispatch(fetchAutoloadEnterpriseUnit());
        dispatch(fetchServiceList());
        dispatch(fetchConcernDepartments());
    }, [dispatch])

    useEffect(()=>{
        setValue("enterpriseUnit", autoloadEnterpriseUnit);
        setValue("gstin", gstin);
        setValue("stateName", stateName);
        setValue("stateCode", stateCode);
        setValue("customerCode", customerCode);
        setValue("customerType", customerType)
        setValue("customerAddress", customerAddress)
        setValue("customerGSTN", customerGstin)
        setValue("customerStateCode", custStateCode);
    },[setValue, autoloadEnterpriseUnit, gstin, stateName, stateCode, customerCode, customerType, customerGstin, customerAddress, custStateCode])

    useEffect(()=>{
        if(formValues?.enterpriseUnit){
            dispatch(fetchGSTAndStateCodeDetails(formValues.enterpriseUnit))
        }
        if(!formValues?.customerName){
            setValue("customerCode", "");
            setValue("customerType", "")
            setValue("customerAddress", "")
            setValue("customerGSTN", "")
        }
        if(!formValues?.customerStateName){
            setValue("customerStateCode", "");
        }
    },[dispatch, setValue, formValues?.enterpriseUnit, formValues?.customerName, formValues?.customerStateName])

    useEffect(() => {
        const keyword = debouncedCustomerName?.trim();
        if(keyword){
            dispatch(fetchCustomerName(keyword));
        }
    }, [dispatch, debouncedCustomerName]);

    // console.log({autoloadEnterpriseUnit, gstin, stateName, stateCode, customerNames})
    // console.log("concernDepartments: ", concernDepartments)
    useEffect(() => {
        const keyword = debouncedCustomerState?.trim();
        if(keyword){
            dispatch(fetchStateNames(keyword));
        }
    }, [dispatch, debouncedCustomerState]);

    const resetFields = () => {
        fromFields.forEach((field)=>{
            
        })
    }

    const submitHandler = async (data) => {
        // createProformaInvoice
        const body = {
            "enterprise_unit": data?.enterpriseUnit ?? "",
            "enterprise_gstin": data?.gstin ?? "",
            "enterprise_state_code": data?.stateCode ?? "",
            "enterprise_state_name": data?.stateName ?? "",
            "is_reverse_charge": data?.reverseCharges ?? "No",
            "cust_id": data?.customerCode ?? "",
            "cust_name": data?.customerName ?? "",
            "cust_address": data?.customerAddress ?? "",
            "cust_gstin": data?.customerGSTN ?? "",
            "cust_state_code": data?.customerStateCode ?? "",
            "cust_state_name": data?.customerStateName ?? "",
            "department": data?.department ?? "",
            "remarks":data?.terms ?? "",
            "hsn_sac_code": data?.hsnSacCode ?? "",
            "service_desc": data?.description ?? "",
            "uom": data?.uom ?? "",
            "quantity": data?.quantity ?? "",
            "rate": "100",
            "amount": data?.baseAmt ?? 0,
            "taxable_value": data?.taxableAmt ?? 0,
            "cgst_amount": data?.cgstAmt ?? 0,
            "sgst_amount": data?.sgstAmt ?? 0,
            "igst_amount": data?.igstAmt ?? 0,
            "total": data?.totalAmt ?? 0,
            "ser_mat_desc": data?.service ?? 0
        }

        dispatch(createProformaInvoice(body));
    }


    return (
        <MainLayoutWrapper title="Create Proforma Invoice">
            <FormWrapper
                title="Performa Invoice From"
            >
                <form className="row p-3 g-3" onSubmit={handleSubmit(submitHandler)}>
                    {fromFields.map((fronField)=>(
                        <div className={fronField.container} key={fronField.name}>
                            <Controller 
                                name={fronField.name}
                                control={control}
                                render={({field, fieldState})=>{

                                    let options = [];
                                    if(fronField.type === "select" || fronField.type === "datalist"){
                                        if(fronField.name === "enterpriseUnit"){
                                            options = enterpriseUnitList.map((unit)=>({
                                                label: unit?.eu_enterprise_name ?? "",
                                                value: unit?.eu_enterprise_id ?? ""
                                            }))
                                        }
                                        if(fronField.name === "department"){
                                            options = concernDepartments.map((department)=>({
                                                label: department?.Description ?? "",
                                                value: department?.dept_id ?? ""
                                            }))
                                        }

                                        if(fronField.name === "customerName"){
                                            options = (customerNames || []).map((customer)=>({
                                                label: customer?.prm_name ?? "",
                                                value: customer?.prm_name ?? ""
                                            }))
                                        }

                                        if(fronField.name === "customerStateName"){
                                            options = (states || []).map((state)=>({
                                                label: state?.state_name ?? "",
                                                value: state?.state_name ?? ""
                                            }))
                                        }

                                        if(fronField.name === "service"){
                                            options = serviceList.map((service)=>({
                                                label: service?.Description ?? "",
                                                value: service?.code ?? ""
                                            }))
                                        }
                                    }

                                    if(fronField.type === "select") {
                                        return (
                                            <SelectField 
                                                label={fronField.label}
                                                id={fronField.name}
                                                readOnly={fronField.readOnly}
                                                disabled={fronField.disabled}
                                                {...field}
                                                options={options}
                                                error={fieldState?.error?.message}
                                            />
                                        )
                                    }

                                    if(fronField.type === "text" || fronField.type === "number"){
                                        return (
                                            <InputField 
                                                label={fronField.label}
                                                id={fronField.name}
                                                type={fronField.type}
                                                readOnly={fronField.readOnly}
                                                disabled={fronField.disabled}
                                                {...field}
                                                 error={fieldState?.error?.message}
                                            />
                                        )
                                    }

                                    if(fronField.type === "textarea") {
                                        return (
                                            <TextareaField 
                                                label={fronField.label}
                                                id={fronField.name}
                                                readOnly={fronField.readOnly}
                                                disabled={fronField.disabled}
                                                {...field}
                                                error={fieldState?.error?.message}
                                            />
                                        )
                                    }

                                    if(fronField.type === "textBox"){
                                        return (
                                            <InputBox 
                                                label={fronField.label}
                                                id={fronField.name}
                                                type="number"
                                                readOnly={fronField.readOnly}
                                                disabled={fronField.disabled}
                                                {...field}
                                                addOns={fronField.addOns}
                                                error={fieldState?.error?.message}
                                            />
                                        )
                                    }

                                    if(fronField.type === "radio"){
                                        return (
                                            <RadioGroupField 
                                                label={fronField.label}
                                                id={fronField.name}
                                                readOnly={fronField.readOnly}
                                                disabled={fronField.disabled}
                                                {...field}
                                                direction="row"
                                                options={fronField.options}
                                                error={fieldState?.error?.message}
                                            />
                                        )
                                    }

                                    if(fronField.type === "datalist") {
                                        return (
                                            <DatalistField
                                                label={fronField.label}
                                                id={fronField.name}
                                                readOnly={fronField.readOnly}
                                                disabled={fronField.disabled}
                                                isClear={true}
                                                {...field}
                                                options={options}
                                                error={fieldState?.error?.message}
                                                onSelectOption={(selectedItem, name)=>{
                                                    if(name === "customerName") dispatch(fetchCustomerDetails(selectedItem))
                                                    if(name === "customerStateName") dispatch(fetchStateCode(selectedItem))
                                                    
                                                }}
                                            />
                                        )
                                    }
                                }}
                            />
                        </div>
                    ))}
                    <div className="col-md-12 col-sm-12 d-flex justify-content-center gap-2 mt-4">
                        <Button type="submit" variant="primary" title="Submit">Submit</Button>
                    </div>
                </form>
            </FormWrapper>
        </MainLayoutWrapper>
    )
}

export default CreateProformaInvoice;