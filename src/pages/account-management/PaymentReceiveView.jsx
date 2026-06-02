import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {Button} from "@/components/ui/button/Button";
import DataTable from "@/components/ui/table/DataTable";
import Pagination from "@/components/ui/pagination/Pagination";
import { fetchPaymentReceiveDetails } from "@/slices/paymentSlice";
import {Printer, FilePenLine} from "lucide-react";

const PaymentReceiveView = ({handleComponentChange, handleReceiptSelect}) => {
    const dispatch = useDispatch();
    const { paymentReceiveDetails } = useSelector((state) => state.payment);
    const [page, setPage] = useState(1);
    const pageSize = 15;

    useEffect(() => {
        dispatch(fetchPaymentReceiveDetails());
    }, [dispatch]);

    const totalRecords = useMemo(() => paymentReceiveDetails.length, [paymentReceiveDetails]);
    const totalPages = useMemo(() => Math.ceil(totalRecords / pageSize), [totalRecords, pageSize]);
    const paginatedData = useMemo(() => {
        const startIndex = (page - 1) * pageSize;
        return paymentReceiveDetails.slice(startIndex, startIndex + pageSize);
    }, [paymentReceiveDetails, page, pageSize]);


    const editHandler = (receipt_no) => {
        handleComponentChange("edit");
        handleReceiptSelect(receipt_no);
    }

    // console.log(paymentReceiveDetails)


    const columns = [
        { key: "rh_receipt_no", title: "Receipt No" },
        { key: "rh_receipt_date", title: "Receipt Date" },
        { key: "rh_payee_name", title: "Payee Name" },
        { key: "rh_receipt_mode", title: "Mode" },
        { key: "rh_cheq_dd_no", title: "CHQ/DD No" },
        { key: "rh_amount", title: "Amount" },
        { key: "rh_currency", title: "Currency" },
        {
            key: "actions",
            title: "",
            render: ({row}) => (
                <div className="d-flex gap-2">
                    <Button
                        variant="primary"
                        title="Edit"
                        onClick={() => editHandler(row.rh_receipt_no)}
                    >
                        <FilePenLine size={16} strokeWidth={2} />
                    </Button>
                    <Button 
                        variant="success"
                        title="Print"
                    >
                        <Printer size={16} strokeWidth={2} />
                    </Button>
                </div>
            ),
        }
    ];



    return (
        <div className="card border-0 shadow-sm rounded-3">
            <div className="card-header bg-white border-0 py-3">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <div>
                        <h5 className="mb-0 fw-semibold text-dark form-card-title">Payment Receive List</h5>
                    </div>
                    <Button 
                        variant="primary" 
                        onClick={() => handleComponentChange("create")}
                    >Create New</Button>
                </div>
            </div>
            <div className="card-body pt-0">
                <DataTable 
                    columns={columns}
                    data={paginatedData}
                />
                <Pagination 
                    page={page}
                    pageSize={pageSize}
                    totalPages={totalPages}
                    totalRecords={totalRecords}
                    handlePageChange={(p) => setPage(p)}
                />
            </div>
        </div>
    )
}

export default PaymentReceiveView;