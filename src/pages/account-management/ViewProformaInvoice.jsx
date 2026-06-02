import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {fetchProformaInvoiceList} from "@/slices/paymentSlice";
import MainLayoutWrapper from "@/components/page-wrapper/MainLayoutWrapper";
import DataTable from "@/components/ui/table/DataTable";
import Pagination from "@/components/ui/pagination/Pagination";
import {Button} from "@/components/ui/button/Button";
import {Eye} from "lucide-react";


const ViewProformaInvoice = () => {
    const dispatch = useDispatch();
    const { performaInvoiceList } = useSelector((state) => state.payment);
    const [page, setPage] = useState(1);
    const pageSize = 15;

    useEffect(()=>{
        dispatch(fetchProformaInvoiceList())
    },[dispatch])
    const totalRecords = useMemo(() => performaInvoiceList.length, [performaInvoiceList]);
    const totalPages = useMemo(() => Math.ceil(totalRecords / pageSize), [totalRecords, pageSize]);
    const paginatedData = useMemo(() => {
        const startIndex = (page - 1) * pageSize;
        return performaInvoiceList.slice(startIndex, startIndex + pageSize);
    }, [performaInvoiceList, page, pageSize]);

    const columns = [
        { key: "invoice_no", title: "Invoice No" },
        { key: "invoice_date", title: "Invoice Date" },
        { key: "cust_name", title: "Customer Name" },
        { key: "cust_gstin", title: "Customer GSTIN" },
        { key: "status", title: "Status" },
        {
            key: "actions",
            title: "",
            render: ({row}) => (
                <div className="d-flex gap-2">
                    <Button 
                        variant="success"
                        title="Print"
                    >
                        <Eye size={16} strokeWidth={2} />
                    </Button>
                </div>
            ),
        }
    ]


    return (
        <MainLayoutWrapper title="View Proforma Invoice">
            <div className="card border-0 shadow-sm rounded-3">
                <div className="card-header bg-white border-0 py-3">
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                        <div>
                            <h5 className="mb-0 fw-semibold text-dark form-card-title">Proforma Invoice List</h5>
                        </div>
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
        </MainLayoutWrapper>
    )
}

export default ViewProformaInvoice;