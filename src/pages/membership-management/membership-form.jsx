import { forwardRef, useImperativeHandle, useEffect} from "react";
import FormWrapper from "@/components/page-wrapper/FormWrapper";
import { useForm, Controller, useWatch } from "react-hook-form";
import PropTypes from "prop-types";
import {InputField, TextareaField, SelectField, CheckBox, CheckBoxGroup, RadioGroup, DateField} from "@/components/ui/input-fields";
import Button from "@/components/ui/button";

const MemberShipForm = forwardRef(({ title, formFields, defaultValues, optionsGetter= () => [], autoFormChangeCallHandler }, ref) => {

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {...defaultValues},
        mode: "onSubmit",
    });

    const formValues = useWatch({ control });
    
    useImperativeHandle(ref, ()=>({
       formValues: formValues
    }), [formValues])

    const onSubmitHandler = (data) => {
        console.log(data)
    }

    const fromResetHandler = () => {
        reset({...defaultValues})
    }

    useEffect(()=>{
        autoFormChangeCallHandler?.(formValues)
    },[autoFormChangeCallHandler, formValues])

    return (
        <FormWrapper title={title}>
            <form className="row p-3 g-3" onSubmit={handleSubmit(onSubmitHandler)}>
                {(formFields || []).map((fromField)=>(
                    <div className={fromField.container} key={fromField.name}>
                        <Controller 
                            name={fromField.name}
                            control={control}

                            render={({field, fieldState})=>{

                                let options = optionsGetter?.(fromField.name) ?? [];

                                if(fromField.type==="text" || fromField.type==="number"){
                                    return (
                                        <InputField 
                                            label={fromField.label}
                                            id={fromField.name}
                                            placeholder={fromField.placeholder}
                                            readOnly={fromField.readOnly}
                                            disabled={fromField.disabled}
                                            {...field}
                                            error={fieldState?.error?.message}
                                            addOns={fromField?.addOns || null}
                                        />
                                    )
                                }
                                if(fromField.type==="textarea"){
                                    return(
                                        <TextareaField 
                                            label={fromField.label}
                                            id={fromField.name}
                                            readOnly={fromField.readOnly}
                                            disabled={fromField.disabled}
                                            {...field}
                                            error={fieldState?.error?.message}
                                        />
                                    )
                                }
                                if(fromField.type==="select"){
                                    return (
                                        <SelectField 
                                            label={fromField.label}
                                            id={fromField.name}
                                            readOnly={fromField.readOnly}
                                            disabled={fromField.disabled}
                                            {...field}
                                            error={fieldState?.error?.message}
                                            options={options}
                                        />
                                    )
                                }
                                if(fromField.type==="checkbox"){
                                    return (
                                        <CheckBox 
                                            label={fromField.label}
                                            id={fromField.name}
                                            readOnly={fromField.readOnly}
                                            disabled={fromField.disabled}
                                            {...field}
                                            error={fieldState?.error?.message}
                                        />
                                    )
                                }
                                if(fromField.type==="checkboxGroup"){
                                    return (
                                        <CheckBoxGroup 
                                            label={fromField.label}
                                            id={fromField.name}
                                            readOnly={fromField.readOnly}
                                            disabled={fromField.disabled}
                                            {...field}
                                            error={fieldState?.error?.message} 
                                            options={options}
                                        />
                                    )
                                }
                                if(fromField.type==="radioGroup"){
                                    return (
                                        <RadioGroup 
                                            label={fromField.label}
                                            id={fromField.name}
                                            readOnly={fromField.readOnly}
                                            disabled={fromField.disabled}
                                            {...field}
                                            error={fieldState?.error?.message} 
                                            options={options}
                                        />
                                    )
                                }
                                if(fromField.type==="date"){
                                    return (
                                        <DateField 
                                            label={fromField.label}
                                            id={fromField.name}
                                            readOnly={fromField.readOnly}
                                            disabled={fromField.disabled}
                                            {...field}
                                            error={fieldState?.error?.message} 
                                        />
                                    )
                                }
                                return null
                            }}
                        />
                    </div>
                ))}
                <div className="col-md-12 col-sm-12 mt-4 d-flex justify-content-end gap-2">
                    <Button 
                        type="button"
                        variant="danger"
                        title="Reset"
                        onClick={fromResetHandler}
                    />
                    <Button 
                        type="submit"
                        variant="primary"
                        title="Submit"
                    />
                </div>
            </form>
        </FormWrapper>
    )
});

export const formFieldPropType = PropTypes.shape({
    container: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
        "text",
        "number",
        "date",
        "select",
        "textarea",
        "radioGroup",
        "checkbox",
        "checkboxGroup",
        null,
    ]),
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool,
    addOns: PropTypes.string,
});

MemberShipForm.PropTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    formFields: PropTypes.arrayOf(formFieldPropType).isRequired,
    defaultValues: PropTypes.objectOf(PropTypes.string).isRequired,
    optionsGetter: PropTypes.func,
    autoFormChangeCallHandler: PropTypes.func,
    
}

export default MemberShipForm;