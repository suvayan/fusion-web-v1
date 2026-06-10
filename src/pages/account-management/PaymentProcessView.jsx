import {useMemo} from "react";
import DataTable from "@/components/ui/table/DataTable";
import Pagination from "@/components/ui/pagination/Pagination";

const PaymentProcessView = ({data, page, onPageChange, pageSize, totalRecords, totalPages, rowInputChangeHandler, rowCheckHandler}) => {

    const columns = useMemo(()=>([
        {
            key: "check",
            title: "",
            render: ({row}) => (
                <input 
                    className="form-check-input" 
                    type="checkbox" value="" 
                    checked={row.isChecked}
                    onChange={(e)=>rowCheckHandler(e.target.checked, "isChecked", row)}
                />
            ),
        },
        { key: "rh_receipt_no", title: "Receipt No" },
        {
            key: "",
            title: "Sr No",
            render: ({row}) => (row.rowId + 1)
        },
        { key: "rh_receipt_date", title: "Receipt Date" },
        { key: "rh_cheq_dd_no", title: "A/C Doc No."},
        { key: "rh_payee_name", title: "Payee Name" },
        { key: "rh_amount", title: "Ammount" },
        { key: "rh_amount", title: "Balance Amt." },
        { 
            key: "processAmt", title: "Process Amt.",
            render: ({value, row}) => (
                <input 
                    type="number"
                    value={value}
                    max={row.rh_amount}
                    disabled={row.isDisabledProcessAmt}
                    onChange={(e)=>rowInputChangeHandler(e.target.value, "processAmt", row)}
                />
            )
        },
    ]),[rowCheckHandler, rowInputChangeHandler])


    return (
        <div className="card border-0 shadow-sm rounded-3">
            <div className="card-header bg-white border-0 py-3">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <div>
                        <h5 className="mb-0 fw-semibold text-dark form-card-title">Payment Process List</h5>
                    </div>
                </div>
            </div>
            <div className="card-body pt-0">
                <DataTable 
                    columns={columns}
                    data={data}
                />
                <Pagination 
                    page={page}
                    pageSize={pageSize}
                    totalPages={totalPages}
                    totalRecords={totalRecords}
                    handlePageChange={(p) => onPageChange(p)}
                />
            </div>
        </div>
    )
}

export default PaymentProcessView;