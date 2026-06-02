import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Plus, X, Check, Pen } from "lucide-react";

import { states as statesMaster } from "@/constants/states";
import FormWrapper from "@/components/page-wrapper/FormWrapper";
import { Button } from "@/components/ui/button/Button";
import {formatDateToDDMMYYYY} from "@/utils/utils";
import {
    InputField,
    TextareaField,
    SelectField,
    RadioGroupField,
    DateField,
} from "@/components/ui/inputs/InputFields";
import EditableTable from "@/components/ui/table/EditableTable";

import {
    fetchCountries,
    fetchDepositBanks,
    fetchConcernDepartments,
    fetchDepositBankAccounts,
} from "@/slices/commonSlice";
import {
    fetchPaymentReceivalById,
    createPaymentReceive,
} from "@/slices/paymentSlice";

const fronFields = [
    {
        container: "col-md-12 col-sm-12",
        label: "Payee Name",
        name: "payeeName",
        type: "text",
        readOnly: false,
        disabled: false,
        rules: {
            required: "Payee Name is required",
        },
    },
    {
        container: "col-md-6 col-sm-12",
        label: "Email",
        name: "email",
        type: "text",
        readOnly: false,
        disabled: false,
        rules: {
            required: "Email is required",
        },
    },
    {
        container: "col-md-6 col-sm-12",
        label: "Mobile No",
        name: "mobileNo",
        type: "text",
        readOnly: false,
        disabled: false,
        rules: {
            required: "Mobile No is required",
        },
    },
    {
        container: "col-md-12 col-sm-12",
        label: "Payee Address",
        name: "payeeAddress",
        type: "textarea",
        rules: {
            required: "Payee Address is required",
        },
    },
    {
        container: "col-md-6 col-sm-12",
        label: "Country",
        name: "country",
        type: "select",
        readOnly: false,
        disabled: false,
        rules: {
            required: "Country is required",
        },
    },
    {
        container: "col-md-6 col-sm-12",
        label: "State",
        name: "state",
        type: "select",
        readOnly: false,
        disabled: false,
        rules: {
            required: "State is required",
        },
    },
    {
        container: "col-md-6 col-sm-12",
        label: "Pincode",
        name: "pincode",
        type: "text",
        readOnly: false,
        disabled: false,
        rules: {
            required: "Pincode is required",
        },
    },
    {
        container: "col-md-6 col-sm-12",
        label: "Ammount",
        name: "amount",
        type: "number",
        rules: {
            required: "Ammount is required",
        },
    },
    {
        container: "col-md-6 col-sm-12",
        label: "Currency",
        name: "currency",
        type: "select",
        readOnly: false,
        disabled: false,
        rules: {
            required: "Currency is required",
        },
    },
    {
        container: "col-md-6 col-sm-12",
        label: "Receive Mode",
        name: "receiveMode",
        type: "select",
        readOnly: false,
        disabled: false,
        rules: {
            required: "Receive Mode is required",
        },
    },
    {
        container: "col-md-6 col-sm-12",
        label: "Bank Name",
        name: "bankName",
        type: "text",
        readOnly: false,
        disabled: false,
        rules: {
            required: "Bank Name is required",
        },
    },
    {
        container: "col-md-6 col-sm-12",
        label: "Branch Name",
        name: "branchName",
        type: "text",
        readOnly: false,
        disabled: false,
        rules: {
            required: "Branch Name is required",
        },
    },
    {
        container: "col-md-6 col-sm-12",
        label: "DD/CHQ/RTGS No",
        name: "ddNo",
        type: "text",
        readOnly: false,
        disabled: false,
        rules: {
            required: "DD/CHQ/RTGS No is required",
        },
    },
    {
        container: "col-md-6 col-sm-12",
        label: "DD/CHQ/RTGS Date",
        name: "ddDate",
        type: "date",
        readOnly: false,
        disabled: false,
        rules: {
            required: "DD/CHQ/RTGS Date is required",
        },
    },
    {
        container: "col-md-6 col-sm-12",
        label: "Deposit Bank",
        name: "depositBank",
        type: "select",
        readOnly: false,
        disabled: false,
        rules: {
            required: "Deposit Bank is required",
        },
    },
    {
        container: "col-md-6 col-sm-12",
        label: "Deposit Bank A/C No",
        name: "depositBankAcNo",
        type: "select",
        readOnly: false,
        disabled: false,
        rules: {
            required: "Deposit Bank A/C No is required",
        },
    },
    {
        container: "col-md-12 col-sm-12",
        label: "Local/Outstation",
        name: "localOutStation",
        type: "radio",
        rules: {
            required: "Local/Outstation is required",
        },
    },
    {
        container: "col-md-6 col-sm-12",
        label: "Receipt Date",
        name: "receiptDate",
        type: "date",
        readOnly: false,
        disabled: false,
        rules: {
            required: "Receipt Date is required",
        },
    },
    {
        container: "col-md-6 col-sm-12",
        label: "Receipt No",
        name: "receiptNo",
        type: "text",
        readOnly: true,
        disabled: false,
    },
];

const defaultValues = fronFields.reduce((acc, curr) => {
    acc[curr.name] = "";
    return acc;
}, {});

const getStatesByCountry = (countryCode) => {
    return statesMaster?.[countryCode] || [];
};

const PaymentReceiveForm = ({ title, receiptNo, handleComponentChange }) => {
    const dispatch = useDispatch();
    const tableRef = useRef(null);

    const isBack = title !== "Modify Receipt";
    const backTitle =
        title !== "Modify Receipt" ? "Back to Payment Receive List" : "";

    const { countries, depositBanks, depositBankAccounts, concernDepartments } =
        useSelector((state) => state.common);

    const { paymentReceiveById } = useSelector(
        (state) => state.payment,
    );

    const [receipt, setReceipt] = useState(() => receiptNo || null);
    const [receiptInput, setReceiptInput] = useState(receiptNo || "");
    const [err, setErr] = useState("");

    const { control, setValue, clearErrors, handleSubmit, reset } = useForm({
        defaultValues: {
            ...defaultValues,
            items: [],
        },
        mode: "onSubmit",
    });

    const formValues = useWatch({ control });

    const handleTableDataChange = useCallback(
        (data) => {
            setValue("items", data, {
                shouldDirty: true,
                shouldValidate: true,
            });
        },
        [setValue],
    );

    const columns = useMemo(
        () => [
            {
                name: "Department",
                accessor: "department",
                type: "select",
                options:
                    concernDepartments?.map((dept) => ({
                        value: dept.dept_id,
                        label: dept.Description,
                    })) || [],
            },
            {
                name: "Received Amount",
                accessor: "receivedAmount",
                type: "number",
            },
            {
                name: "Narration",
                accessor: "narration",
                type: "text",
            },
            {
                name: "",
                accessor: "action",
                type: "",
                render: ({ rowIndex, editRowIndex }) => {
                    const isEditing = editRowIndex === rowIndex;

                    return (
                        <div className="d-flex align-items-center gap-2">
                            {isEditing ? (
                                <Button
                                    type="button"
                                    variant="primary"
                                    onClick={() =>
                                        tableRef.current?.saveRow(rowIndex)
                                    }
                                >
                                    <Check size={16} strokeWidth={2} />
                                </Button>
                            ) : (
                                <Button
                                    type="button"
                                    variant="success"
                                    onClick={() =>
                                        tableRef.current?.editRow(rowIndex)
                                    }
                                >
                                    <Pen size={16} strokeWidth={2} />
                                </Button>
                            )}

                            <Button
                                type="button"
                                variant="danger"
                                onClick={() =>
                                    tableRef.current?.deleteRow(rowIndex)
                                }
                            >
                                <X size={16} strokeWidth={2} />
                            </Button>
                        </div>
                    );
                },
            },
        ],
        [concernDepartments],
    );

    useEffect(() => {
        dispatch(fetchCountries());
        dispatch(fetchDepositBanks());
        dispatch(fetchConcernDepartments());
    }, [dispatch]);

    useEffect(() => {
        const bankId = formValues?.depositBank ?? "";
        setValue("depositBankAcNo", "");
        if (bankId) {
            dispatch(fetchDepositBankAccounts(bankId));
        }
    }, [dispatch, setValue, formValues?.depositBank]);

    useEffect(() => {
        setValue("state", "");
    }, [setValue, formValues?.country]);

    useEffect(() => {
        const receiveMode = formValues?.receiveMode ?? "";

        if (receiveMode === "Cash") {
            const fields = [
                "ddChqNo",
                "ddChqDate",
                "bankName",
                "branchName",
                "depositBank",
                "depositBankAcNo",
            ];

            fields.forEach((field) => {
                setValue(field, "", {
                    shouldValidate: false,
                    shouldDirty: true,
                });
                clearErrors(field);
            });
        }
    }, [setValue, clearErrors, formValues?.receiveMode]);

    const states = useMemo(() => {
        return getStatesByCountry(formValues?.country);
    }, [formValues?.country]);

    const isNotValidation = useCallback(
        (fieldName) => {
            const receiveMode = formValues?.receiveMode ?? "";
            const fieldsToDisableForCash = [
                "ddNo",
                "ddDate",
                "bankName",
                "branchName",
                "depositBank",
                "depositBankAcNo",
            ];

            if (receiveMode === "Cash") {
                return fieldsToDisableForCash.includes(fieldName);
            }

            return false;
        },
        [formValues?.receiveMode],
    );

    const formResetHandler = useCallback(() => {
        reset({
            ...defaultValues,
            items: [],
        });

        setValue("items", [], {
            shouldDirty: true,
            shouldValidate: true,
        });

        setErr("");
    }, [reset, setValue]);

    useEffect(() => {
        if (receipt) {
            dispatch(fetchPaymentReceivalById(receipt));
        }
    }, [dispatch, receipt]);

    useEffect(() => {
        if (paymentReceiveById) {
            reset({
                ...defaultValues,
                payeeName: paymentReceiveById?.rh_payee_name ?? "",
                email: paymentReceiveById?.rh_email_id ?? "",
                mobileNo: paymentReceiveById?.rh_mobile_no ?? "",
                payeeAddress: paymentReceiveById?.rh_payee_address ?? "",
                country: paymentReceiveById?.rh_payee_country ?? "",
                state: paymentReceiveById?.rh_payee_state ?? "",
                pincode: paymentReceiveById?.rh_payee_pincode ?? "",
                amount: paymentReceiveById?.rh_amount ?? "",
                currency: paymentReceiveById?.rh_currency ?? "",
                receiveMode: paymentReceiveById?.rh_receipt_mode ?? "",
                bankName: paymentReceiveById?.rh_bank_name ?? "",
                branchName: paymentReceiveById?.rh_bank_branch ?? "",
                ddChqNo: paymentReceiveById?.rh_cheq_dd_no ?? "",
                ddChqDate: paymentReceiveById?.rh_cheq_dd_date ?? "",
                depositBank: paymentReceiveById?.rh_deposit_bank ?? "",
                depositBankAcNo: paymentReceiveById?.rh_deposi_ac_no ?? "",
                localOutStation: paymentReceiveById?.rh_local_outstation ?? "",
                receiptDate: paymentReceiveById?.rh_receipt_date ?? "",
                receiptNo: paymentReceiveById?.rh_receipt_no ?? "",
                items: [...(paymentReceiveById?.items ?? [])],
            });

            setErr("");
        } else {
            reset({
                ...defaultValues,
                items: [],
            });
        }
    }, [paymentReceiveById, reset]);

    const submitHandler = async (data) => {
        const items = data?.items ?? [];

        if (items.length) {
            const sum = items.reduce(
                (acc, item) => acc + Number(item?.receivedAmount || 0),
                0,
            );

            if (Number(data.amount) === sum) {
                setErr("");
            } else {
                setErr(
                    "Total of Received Amount in items should be equal to Amount field",
                );
                return;
            }
        } else {
            setErr("");
        }

        const payload = {
            ...data,
            receiptDate: data.receiptDate ? formatDateToDDMMYYYY(data.receiptDate) : "",
            ddDate: data.ddDate ? formatDateToDDMMYYYY(data.ddDate) : "",
            items: items.map((obj) => {
                const newObj = { ...obj };
                delete newObj.action;
                return newObj;
            }),
        };

        if (title === "Create Payment Receive") {
            const resultAction = await dispatch(createPaymentReceive(payload));
            if (createPaymentReceive.fulfilled.match(resultAction)) {
                formResetHandler();
                handleComponentChange("view");
            }
        }
    };

    const searchHandler = () => {
        setReceipt(receiptInput);
    };

    return (
        <FormWrapper
            title={title}
            isBack={isBack}
            backTitle={backTitle}
            handleBack={() =>
                typeof handleComponentChange === "function" &&
                handleComponentChange("view")
            }
        >
            {title === "Modify Receipt" && (
                <div className="d-flex justify-content-start align-items-center gap-2">
                    <span className="fw-semibold text-dark font-14">
                        Receipt No.
                    </span>

                    <InputField
                        className="w-25"
                        id="receiptInput"
                        value={receiptInput}
                        onChange={(e) => setReceiptInput(e.target.value)}
                    />

                    <Button
                        type="button"
                        variant="primary"
                        title="Search"
                        onClick={searchHandler}
                    >
                        Search
                    </Button>
                </div>
            )}

            <form
                className="row p-3 g-3"
                onSubmit={handleSubmit(submitHandler)}
            >
                {fronFields.map((fronField) => (
                    <div className={fronField.container} key={fronField.name}>
                        <Controller
                            name={fronField.name}
                            control={control}
                            // rules={
                            //     isNotValidation(fronField.name)
                            //         ? {}
                            //         : (fronField?.rules ?? {})
                            // }
                            render={({ field, fieldState }) => {
                                const fieldsToDisableForCash = [
                                    "ddNo",
                                    "ddDate",
                                    "bankName",
                                    "branchName",
                                    "depositBank",
                                    "depositBankAcNo",
                                ];

                                const shouldDisable =
                                    formValues?.receiveMode === "Cash" &&
                                    fieldsToDisableForCash.includes(
                                        fronField.name,
                                    );

                                let options = [];

                                if (
                                    fronField.type === "select" ||
                                    fronField.type === "radio"
                                ) {
                                    if (fronField.name === "country") {
                                        options =
                                            countries?.map((country) => ({
                                                value: country.code,
                                                label: country.country,
                                            })) || [];
                                    }

                                    if (fronField.name === "state") {
                                        options =
                                            states?.map((state) => ({
                                                value: state.code,
                                                label: state.state,
                                            })) || [];
                                    }

                                    if (fronField.name === "depositBank") {
                                        options =
                                            depositBanks?.map((bank) => ({
                                                value: bank.bm_id,
                                                label: bank.bm_name,
                                            })) || [];
                                    }

                                    if (fronField.name === "depositBankAcNo") {
                                        options =
                                            depositBankAccounts?.map((ac) => ({
                                                value: ac.bmd_ac_no,
                                                label: ac.name,
                                            })) || [];
                                    }

                                    if (fronField.name === "receiveMode") {
                                        options = ["Cash", "UPI", "Bank Transfer", "Cheque", "RTGS"].map((el) => ({
                                            value: el,
                                            label: el,
                                        }));
                                    }

                                    if (fronField.name === "currency") {
                                        options = ["INR", "USD", "EUR", "GBP", "JPY", "CNY"].map((el) => ({
                                            value: el,
                                            label: el,
                                        }));
                                    }

                                    if (fronField.name === "localOutStation") {
                                        options = ["Local", "Outstation"].map(
                                            (el) => ({
                                                value: el,
                                                label: el,
                                            }),
                                        );
                                    }
                                }

                                if (fronField.type === "textarea") {
                                    return (
                                        <TextareaField
                                            label={fronField.label}
                                            id={fronField.name}
                                            readOnly={fronField.readOnly}
                                            disabled={shouldDisable}
                                            {...field}
                                            error={fieldState?.error?.message}
                                        />
                                    );
                                }

                                if (fronField.type === "select") {
                                    return (
                                        <SelectField
                                            label={fronField.label}
                                            id={fronField.name}
                                            readOnly={fronField.readOnly}
                                            disabled={shouldDisable}
                                            isClear={true}
                                            {...field}
                                            options={options}
                                            error={fieldState?.error?.message}
                                        />
                                    );
                                }

                                if (fronField.type === "date") {
                                    return (
                                        <DateField
                                            label={fronField.label}
                                            id={fronField.name}
                                            readOnly={fronField.readOnly}
                                            disabled={shouldDisable}
                                            isClear={true}
                                            {...field}
                                            error={fieldState?.error?.message}
                                        />
                                    );
                                }

                                if (fronField.type === "radio") {
                                    return (
                                        <RadioGroupField
                                            label={fronField.label}
                                            id={fronField.name}
                                            {...field}
                                            direction="row"
                                            options={options}
                                            error={fieldState?.error?.message}
                                        />
                                    );
                                }

                                return (
                                    <InputField
                                        label={
                                            fronField.name !== "receiptNo"
                                                ? fronField.label
                                                : receipt
                                                  ? fronField.label
                                                  : null
                                        }
                                        id={fronField.name}
                                        type={
                                            fronField.name !== "receiptNo"
                                                ? fronField.type
                                                : receipt
                                                  ? "text"
                                                  : "hidden"
                                        }
                                        readOnly={fronField.readOnly}
                                        disabled={shouldDisable}
                                        {...field}
                                        error={fieldState?.error?.message}
                                    />
                                );
                            }}
                        />
                    </div>
                ))}

                <div className="col-md-12 col-sm-12">
                    <span
                        className="text-muted cursor-pointer d-flex align-items-center gap-2"
                        onClick={() => tableRef.current?.addRow()}
                    >
                        <Plus size={16} strokeWidth={2} />
                        Add Items
                        {!!err && <span className="text-danger">{err}</span>}
                    </span>
                </div>

                <div className="col-md-12 col-sm-12">
                    <EditableTable
                        isSl={true}
                        ref={tableRef}
                        onDataChange={handleTableDataChange}
                        columns={columns}
                        data={formValues?.items ?? []}
                        isAction={true}
                        isAddRow={false}
                    />
                </div>

                <div className="col-md-12 col-sm-12 d-flex justify-content-center gap-2">
                    <Button type="submit" variant="primary" title="Submit">
                        Submit
                    </Button>

                    <Button
                        type="button"
                        variant="danger"
                        title="Reset"
                        onClick={formResetHandler}
                    >
                        Reset
                    </Button>
                </div>
            </form>
        </FormWrapper>
    );
};

export default PaymentReceiveForm;
