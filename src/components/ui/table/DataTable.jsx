const DataTable = ({  columns = [], data = [],}) => {
    return (
        <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                    <tr>
                    {columns.map((col, cox) => (
                        <th key={col.title ?? `col-${cox}`} className="fw-semibold text-secondary">
                            {col.title}
                        </th>
                    ))}
                    </tr>
                </thead>

                <tbody>
                {data.length > 0 ? (
                    data.map((row, irx) => (
                        <tr key={irx}>
                            {columns.map((col, icx) => (
                            <td key={col.title? `td-${col.title}`:`td-${icx}-${irx}`} className="text-dark">
                                {col.render
                                ? col.render({value: row[col.key], row, irx, icx})
                                : row[col.key]}
                            </td>
                            ))}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td
                            colSpan={columns.length}
                            className="text-center text-muted py-4"
                        >
                            No data available
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default DataTable;