import {
  forwardRef,
  useState,
  useImperativeHandle,
  useEffect,
} from "react";
import { InputField, SelectField } from "@/components/ui/inputs/InputFields";

const createEmptyRow = (columns = []) => {
  const row = {};
  columns.forEach((col) => {
    row[col.accessor] = "";
  });
  return row;
};

const validateRow = (row = {}, columns = []) => {
  const errors = {};

  columns
    .filter((col) => col.accessor !== "action")
    .forEach((col) => {
      const value = row?.[col.accessor];

      if (
        value === undefined ||
        value === null ||
        value.toString().trim() === ""
      ) {
        errors[col.accessor] = `${col.name} is required`;
      }
    });

  return errors;
};

const TableHead = ({ columns = [], isSl }) => (
  <thead>
    <tr>
      {isSl && <th>S.No.</th>}
      {columns.map((col, i) => (
        <th key={i}>{col.name}</th>
      ))}
    </tr>
  </thead>
);

const TableBody = ({
  columns = [],
  data = [],
  isSl,
  editRowIndex,
  handleTableDataChange,
  errors,
}) => {
  return (
    <tbody>
      {data.map((row, rowIndex) => {
        const isEditing = editRowIndex === rowIndex;

        return (
          <tr key={rowIndex}>
            {isSl && <td>{rowIndex + 1}</td>}

            {columns.map((col, colIndex) => (
              <td key={colIndex}>
                {isEditing ? (
                  col.type === "select" ? (
                    <SelectField
                      value={row?.[col.accessor] ?? ""}
                      options={col.options ?? []}
                      onChange={(e) =>
                        handleTableDataChange(
                          e?.target?.value ?? e,
                          rowIndex,
                          col.accessor
                        )
                      }
                      error={errors?.[rowIndex]?.[col.accessor] ?? ""}
                    />
                  ) : col.type === "number" || col.type === "text" ? (
                    <InputField
                      type={col.type}
                      value={row?.[col.accessor] ?? ""}
                      onChange={(e) =>
                        handleTableDataChange(
                          e.target.value,
                          rowIndex,
                          col.accessor
                        )
                      }
                      error={errors?.[rowIndex]?.[col.accessor] ?? ""}
                    />
                  ) : col.render ? (
                    col.render({
                      row,
                      value: row?.[col.accessor],
                      rowIndex,
                      colIndex,
                      editRowIndex,
                    })
                  ) : (
                    row?.[col.accessor] ?? ""
                  )
                ) : col.render ? (
                  col.render({
                    row,
                    value: row?.[col.accessor],
                    rowIndex,
                    colIndex,
                    editRowIndex,
                  })
                ) : (
                  row?.[col.accessor] ?? ""
                )}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
};

const EditableTable = forwardRef((props, ref) => {
  const { columns = [], isSl = false, data = [], onDataChange } = props;

  const [tableData, setTableData] = useState([]);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Do not overwrite local editing row while editing
    if (editRowIndex !== null) return;

    if (Array.isArray(data)) {
      setTableData((prev) => {
        if (JSON.stringify(prev) === JSON.stringify(data)) {
          return prev;
        }
        return data;
      });
    }
  }, [data, editRowIndex]);

  const updateData = (newData) => {
    setTableData(newData);
    if (onDataChange) {
      onDataChange(newData);
    }
  };

  const handleAddRow = () => {
    if (editRowIndex !== null) {
      const currentRow = tableData?.[editRowIndex] || {};
      const rowErrors = validateRow(currentRow, columns);

      if (Object.keys(rowErrors).length > 0) {
        setErrors((prev) => ({
          ...prev,
          [editRowIndex]: rowErrors,
        }));
        return;
      }

      // keep one-row edit flow only
      return;
    }

    const newRow = createEmptyRow(columns);
    const newData = [...tableData, newRow];

    setTableData(newData);
    if (onDataChange) {
      onDataChange(newData);
    }

    setEditRowIndex(newData.length - 1);
  };

  const handleEdit = (rowIndex) => {
    setEditRowIndex(rowIndex);
  };

  const handleSaveRow = (index) => {
    const rowErrors = validateRow(tableData?.[index] || {}, columns);

    if (Object.keys(rowErrors).length > 0) {
      setErrors((prev) => ({
        ...prev,
        [index]: rowErrors,
      }));
      return;
    }

    setErrors((prev) => ({
      ...prev,
      [index]: {},
    }));

    setEditRowIndex(null);
    updateData([...tableData]);
  };

  const handleDeleteRow = (index) => {
    if (editRowIndex !== null && editRowIndex !== index) {
      const rowErrors = validateRow(tableData?.[editRowIndex] || {}, columns);

      if (Object.keys(rowErrors).length > 0) {
        setErrors((prev) => ({
          ...prev,
          [editRowIndex]: rowErrors,
        }));
        return;
      }

      return;
    }

    const newData = structuredClone(tableData);
    newData.splice(index, 1);

    setTableData(newData);
    setEditRowIndex(null);
    updateData(newData);
  };

  const handleTableDataChange = (newValue, rowIndex, accessor) => {
    setTableData((prevData) => {
      const updated = [...prevData];
      updated[rowIndex] = {
        ...(updated[rowIndex] || {}),
        [accessor]: newValue,
      };

      const rowErrors = validateRow(updated[rowIndex], columns);

      setErrors((prev) => ({
        ...prev,
        [rowIndex]: rowErrors,
      }));

      // Sync immediately to parent so unrelated form field changes
      // do not reset the table
      if (onDataChange) {
        onDataChange(updated);
      }

      return updated;
    });
  };

  useImperativeHandle(ref, () => ({
    addRow: handleAddRow,
    saveRow: handleSaveRow,
    editRow: handleEdit,
    deleteRow: handleDeleteRow,
  }));

  return (
    <div className="table-responsive">
      <table className="table table-bordered align-middle">
        <TableHead columns={columns} isSl={isSl} />
        <TableBody
          columns={columns}
          data={tableData}
          isSl={isSl}
          editRowIndex={editRowIndex}
          handleTableDataChange={handleTableDataChange}
          errors={errors}
        />
      </table>
    </div>
  );
});

export default EditableTable;
