import { useEffect, useMemo, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {Button} from "@/components/ui/button/Button";
import { fetchPaymentReceiveDetails } from "@/slices/paymentSlice";
import MainLayoutWrapper from "@/components/page-wrapper/MainLayoutWrapper";
import PaymentProcessView from "./PaymentProcessView";
import PaymentProcessForm from "./PaymentProcessForm";

const radioItems = [ "New Membership(for Individual/Student/Affiliate)", "New Industry Membership", "Renew Membership", "Member To Industry Membership"]



const PaymentProcess = () => {
    const dispatch = useDispatch();
    const { paymentReceiveDetails } = useSelector((state) => state.payment);
    const [tblData, setTableData] = useState([]);
    const [info, setInfo] = useState({
        processAmmount: 0,
        receiptNumber: ""
    });
    const [selectedRow, seSelectedRow] = useState([]);
    const [pageView, setPageView] = useState("view");
    const [memberShipType, setMemberShipType] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 15;



    useEffect(() => {
        dispatch(fetchPaymentReceiveDetails());
    }, [dispatch]);

    
    useEffect(() => {
        if (paymentReceiveDetails?.length) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setTableData(
                paymentReceiveDetails.map((r, idx) => ({
                    ...r, rowId: idx,
                    isChecked: false,
                    isDisabledProcessAmt: false,
                    processAmt: r.processAmt ?? r.rh_amount ?? "",
                }))
            );
        } else {
            setTableData([]);
        }

        if(pageView === "view"){
            seSelectedRow([]);
            setMemberShipType("");
        }
        
    }, [paymentReceiveDetails, pageView]);

    const totalRecords = useMemo(() => tblData.length, [tblData]);
    const totalPages = useMemo(() => Math.ceil(totalRecords / pageSize), [totalRecords, pageSize]);
    const paginatedData = useMemo(() => {
        const startIndex = (page - 1) * pageSize;
        return tblData.slice(startIndex, startIndex + pageSize);
    }, [tblData, page, pageSize]);



    const rowInputChangeHandler = (value, key, row) => {
        setTableData((prev)=>{
            const index = row.rowId
            const updated = [...prev];
            updated[index] = {...updated[index], [key]: value};
            return updated;
        })
    }

    const rowCheckHandler = (check, key, row) => {
        const index = row.rowId;
        setTableData((prev)=>{
            const updated = [...prev];
            updated[index] = {...updated[index], [key]: check, isDisabledProcessAmt: !updated[index].isDisabledProcessAmt};
            return updated;
        })

        const processAmmount = Number(tblData[index].processAmt);
        const receiptNumber = `${tblData[index].rh_receipt_no}/${index + 1}`;

        setInfo((prev)=>({
            ...prev,
            processAmmount: check? prev.processAmmount + processAmmount : prev.processAmmount - processAmmount,
            receiptNumber: check ? prev.receiptNumber ? `${prev.receiptNumber}, ${receiptNumber}` : receiptNumber : prev.receiptNumber.split(", ").filter((item) => item !== receiptNumber).join(", ")

        }))

        
        seSelectedRow((prev) => {
            if (check) {
                return [...prev, row];
            } else {
                return prev.filter((r) => r.rowId !== index);
            }
        });

    }

    useEffect(()=>{
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setInfo((prev)=>({
            ...prev,
            processAmmount: 0,
            receiptNumber: ""

        }))
    },[page, pageView])



    return (
        <MainLayoutWrapper title="Payment Process (New)">
            {pageView === "view" && (
                <Fragment>
                    <PaymentProcessView 
                        data={paginatedData}
                        page={page}
                        onPageChange={(page)=>setPage(page)}
                        pageSize={pageSize}
                        totalRecords={totalRecords}
                        totalPages={totalPages}
                        rowInputChangeHandler={rowInputChangeHandler}
                        rowCheckHandler={rowCheckHandler}
                    />
                    <div className="card border-0 shadow-sm rounded-3">
                        <div className="card-body p-5">
                            <div className="d-flex justify-content-center align-items-center gap-lg-5">
                                <div className="d-flex justify-content-center align-items-center gap-2">
                                    <label htmlFor="processAmmount" className="form-label">Process Amount</label>
                                    <div className="input-group">
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="processAmmount" 
                                            aria-describedby="inr"
                                            readOnly={true}
                                            value={info.processAmmount}
                                        />
                                        <span className="input-group-text" id="inr">INR</span>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center align-items-center gap-2">
                                    <label htmlFor="receiptNumber" className="form-label">Receipt Numbers</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="receiptNumber"
                                        readOnly={true}
                                        value={info.receiptNumber}
                                    />
                                </div>
                            </div>
                            <div className="d-flex justify-content-center align-items-center gap-3 pt-3">
                                {radioItems.map((item)=>(
                                    <div className="form-check" key={item}>
                                        <input 
                                            className="form-check-input" 
                                            type="radio" 
                                            name={item}
                                            id={item}
                                            value={item}
                                            checked={memberShipType === item}
                                            onChange={(e)=>setMemberShipType(e.target.value)}
                                        />
                                        <label className="form-check-label" htmlFor={item}>
                                            {item}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <div className="d-flex justify-content-center align-items-center gap-3 pt-3">
                                <Button type="button" variant="primary" title="Submit" onClick={()=>setPageView(memberShipType)}>Process</Button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
            {pageView !== "view" && <PaymentProcessForm title={pageView} selectedRow={selectedRow} setPageView={setPageView}/>}
        </MainLayoutWrapper>
    )
}

export default PaymentProcess;