import React from "react";
import * as XLSX from "xlsx";

interface ExcelExportProps {
  data: Record<string, unknown>[];
  columns: Array<{ key: string | number | symbol; header: string }>;
  filename?: string;
}

const ExcelExport: React.FC<ExcelExportProps> = ({
  data,
  columns,
  filename = "export.xlsx",
}) => {
  const handleExport = () => {
    const workbook = XLSX.utils.book_new();
    
    const formattedData = data.map((row) => {
      const formattedRow: Record<string, unknown> = {};
      columns.forEach((column) => {
        const key = String(column.key);
        formattedRow[column.header] = row[key] || "";
      });
      return formattedRow;
    });
    
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, filename);
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center justify-center px-4 py-2 text-base bg-gray-dark text-charcoal rounded-full hover:bg-gray-soft transition-colors duration-200 font-medium"
    >
      Export to Excel
    </button>
  );
};

export default ExcelExport;
