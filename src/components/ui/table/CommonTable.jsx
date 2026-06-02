const CommonTable = ({
  columns = [],
  data = [],
  title,
  subtitle
}) => {
  return (
    <div className="card border-0 shadow-sm rounded-3">
      
      {/* Header */}
      <div className="card-header bg-white border-0 py-3">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div>
            <h5 className="mb-0 fw-bold text-dark">{title ?? null}</h5>
            <small className="text-muted">{subtitle ?? null}</small>
          </div>

          {/* Optional actions placeholder */}
          <div>
            {/* You can add filters/search here later */}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card-body pt-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            
            <thead className="table-light">
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className="fw-semibold text-secondary">
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
                      <td key={col.key} className="text-dark">
                        {col.render
                          ? col.render(row[col.key], row, irx, icx)
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

        {/* Footer */}
        <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
          <small className="text-muted">
            Showing 1-3 of 3 entries
          </small>

          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className="page-item disabled">
                <button className="page-link">
                  &laquo;
                </button>
              </li>

              <li className="page-item active">
                <button className="page-link">1</button>
              </li>

              <li className="page-item">
                <button className="page-link">2</button>
              </li>

              <li className="page-item">
                <button className="page-link">3</button>
              </li>

              <li className="page-item">
                <button className="page-link">
                  &raquo;
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default CommonTable;