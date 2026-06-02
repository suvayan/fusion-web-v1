import {forwardRef, useState, useImperativeHandle, useEffect} from "react";
import { InputField, SelectField } from "@/components/ui/inputs/InputFields";

const createEmptyRow = (columns = []) => {
    const row = {};
    columns.forEach(col => {
        row[col.accessor] = "";
    });
    return row;
};


const validateRow = (row, columns = []) => {
    const errors = {};
    columns.filter(col => col.accessor !== "action").forEach(col => {
        const value = row[col.accessor];
        if (!value || value.toString().trim() === "") {
            errors[col.accessor] = `${col.name} is required`;
        }
    });
    return errors;
};


const TableHead = ({ columns = [], isSl }) => (
    <thead className="table-light">
        <tr>
            {isSl && <th style={{ width: "70px" }}>S.No.</th>}
            {columns.map((col, i) => (
                <th key={i} className="fw-semibold text-nowrap">{col.name}</th>
            ))}
        </tr>
    </thead>
);

const TableBody = ({ columns = [], data = [], isSl, editRowIndex, handleTableDataChange, errors }) => {
    return (
        <tbody>
            {data.map((row, rowIndex) => {
                const isEditing = editRowIndex === rowIndex;
                return (
                    <tr key={`row-${rowIndex}`}>
                        {isSl && <td className="align-middle">{rowIndex + 1}</td>}
                        {columns.map((col, colIndex) => (
                            <td key={`row${rowIndex}-col${colIndex}`} className="align-middle">
                                {isEditing?(
                                    col.type === "select" ? (
                                        <SelectField 
                                            options={col.options}
                                            value={row[col.accessor]}
                                            onChange= {(e)=>handleTableDataChange(e.target.value, rowIndex, col.accessor)}
                                            error={errors?.[rowIndex]?.[col.accessor] ?? ""}
                                        />
                                    ) : (col.type === "number" || col.type === "text") ?(
                                        <InputField 
                                            type={col.type}
                                            value={row[col.accessor]}
                                            onChange= {(e)=>handleTableDataChange(e.target.value, rowIndex, col.accessor)}
                                            error={errors?.[rowIndex]?.[col.accessor] ?? ""}
                                        />
                                    ) : col.render ? col.render({row, value: row[col.accessor], rowIndex, colIndex, editRowIndex}) : row[col.accessor]
                                ): col.render ? col.render({row, value: row[col.accessor], rowIndex, colIndex, editRowIndex}) : row[col.accessor]}
                            </td>
                        ))}
                    </tr>
                )
            })}
        </tbody>
    )
}



const EditableTable = forwardRef((props, ref) => {
    const { columns, isSl, data, onDataChange } = props;
    const [tableData, setTableData] = useState([]);
    const [editRowIndex, setEditRowIndex] = useState(null);
    const [errors, setErrors] = useState({});

    

    useEffect(() => {
        if (Array.isArray(data)) {
            setTableData(prev => {
                // avoid unnecessary state updates
                if (JSON.stringify(prev) === JSON.stringify(data)) {
                    return prev;
                }
                return data;
            });
        }
    }, [data]);



    const updateData = newData => {
        setTableData(newData);
        onDataChange && onDataChange(newData);
    };


    const handleAddRow = () => {
        if (editRowIndex !== null) {
            const rowErrors = validateRow(tableData[editRowIndex], columns);
            if (Object.keys(rowErrors).length > 0) {
                setErrors(prev => ({ ...prev, [editRowIndex]: rowErrors }));
                return;
            }
            return;
        }
        const newRow = createEmptyRow(columns);
        const newData = [...tableData, newRow];
        setTableData(newData);
        setEditRowIndex(newData.length - 1);
    }

    const handleEdit = rowIndex => {
        setEditRowIndex(rowIndex);
    };

    const handleSaveRow = (index) => {
        const rowErrors = validateRow(tableData[index], columns);
        if (Object.keys(rowErrors).length > 0) {
            setErrors(prev => ({ ...prev, [index]: rowErrors }));
            return;
        }

        setErrors({});
        setEditRowIndex(null);
        updateData([...tableData]);

    }

    const handleDeleteRow = (index) => {
        if (editRowIndex !== null && editRowIndex !== index) {
            const rowErrors = validateRow(tableData[editRowIndex], columns);
            if (Object.keys(rowErrors).length > 0) {
                setErrors(prev => ({ ...prev, [editRowIndex]: rowErrors }));
                return;
            }
            return;
        }

        const newData = structuredClone(tableData);
        newData.splice(index, 1);
        setTableData(newData);
        setEditRowIndex(null);
        updateData(newData);
    }

    const handleTableDataChange = (newValue, rowIndex, accessor) => {
        setTableData((prevData) => {
            const data = [...prevData];
            data[rowIndex] = {...data[rowIndex], [accessor]: newValue};
            const rowErrors = validateRow(data[rowIndex], columns);
            setErrors(prev => ({ ...prev, [rowIndex]: rowErrors }));
            return data;
        });
    }

    useImperativeHandle(ref, () => ({
        addRow: handleAddRow,
        saveRow: handleSaveRow,
        editRow: handleEdit,
        deleteRow: handleDeleteRow,
    }));

    return (
        <div className="table-responsive">
            <table className="table">
                <TableHead columns={columns} isSl={isSl} />
                <TableBody 
                    columns={columns} 
                    data={tableData} 
                    isSl={isSl} 
                    errors={errors}
                    editRowIndex={editRowIndex}
                    handleTableDataChange={handleTableDataChange}
                />
            </table>
        </div>
    );
})


export default EditableTable;