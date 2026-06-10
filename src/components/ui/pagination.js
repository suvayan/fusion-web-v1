import PropTypes from "prop-types";


const getVisiblePages = (page, totalPages) => {
    const maxVisible = 3;
    if (totalPages <= 0) return [];
    let start = Math.max(1, page - 1);
    let end = Math.min(totalPages, start + maxVisible - 1);
    start = Math.max(1, end - maxVisible + 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};



const Pagination = ({
    page,
    pageSize,
    totalPages,
    totalRecords,
    handlePageChange
}) => {
    const visiblePages = getVisiblePages(page, totalPages);

    const start = totalRecords === 0 ? 0 : (page - 1) * pageSize + 1;
    const end = totalRecords === 0 ? 0 : Math.min(page * pageSize, totalRecords);

    const goToPage = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
            handlePageChange(newPage);
        }
    };

    return (
        <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
            <small className="text-muted">
                {`Showing ${start}-${end} of ${totalRecords} entries`}
            </small>

            {totalPages > 0 && (
                <nav>
                    <ul className="pagination pagination-sm mb-0">
                        <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                            <button
                                type="button"
                                className="page-link"
                                disabled={page === 1}
                                onClick={() => goToPage(page - 1)}
                            >
                                &laquo;
                            </button>
                        </li>

                        {visiblePages.map((i) => (
                            <li
                                key={`page-${i}`}
                                className={`page-item ${page === i ? "active" : ""}`}
                            >
                                <button
                                    type="button"
                                    className="page-link"
                                    onClick={() => goToPage(i)}
                                >
                                    {i}
                                </button>
                            </li>
                        ))}

                        <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                            <button
                                type="button"
                                className="page-link"
                                disabled={page === totalPages}
                                onClick={() => goToPage(page + 1)}
                            >
                                &raquo;
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
}

Pagination.propTypes = {
    page: PropTypes.number,
    pageSize: PropTypes.number,
    totalPages: PropTypes.number,
    totalRecords: PropTypes.number,
    handlePageChange: PropTypes.func
}

export default Pagination;