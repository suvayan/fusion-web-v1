const getVisiblePages = (page, totalPages) => {
    const maxVisible = 3;
    let start = Math.max(1, page - 1);
    let end = Math.min(totalPages, start + maxVisible - 1);
    start = Math.max(1, end - maxVisible + 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

const Pagination = ({page, pageSize, totalPages, totalRecords, handlePageChange}) => {

    const start = (page - 1) * pageSize + 1;
    const end = Math.min(page * pageSize, totalRecords);
    const visiblePages = getVisiblePages(page, totalPages);

    return (
        <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
            <small className="text-muted">{`Showing ${start}-${end} of ${totalRecords} entries`}</small>

            <nav>
                <ul className="pagination pagination-sm mb-0">
                    <li className="page-item disabled">
                        <button 
                            className="page-link"
                            disabled={page === 1}
                            onClick={() => handlePageChange(page - 1)}
                        >&laquo;</button>
                    </li>
                    {visiblePages.map((i) => (
                        <li key={`page-${i}`} className={`page-item ${page === i ? "active" : ""}`}>
                            <button 
                                className="page-link"
                                onClick={() => handlePageChange(i)}
                            >{i}</button>
                        </li>
                    ))}
                    <li className="page-item">
                        <button 
                            className="page-link"
                            disabled={page === totalPages}
                            onClick={() => handlePageChange(page + 1)}
                        >&raquo;</button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Pagination;