import React, { useState, useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TableColumn, TableProps } from "./types/types";
import TableFilters from "./components/TableFilters";
import TablePagination from "./components/TablePagination";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MdArrowDropDown } from "react-icons/md";

function Table<T extends Record<string, unknown>>({
  data,
  columns,
  filters,
  searchConfig,
  pagination = { enabled: true, pageSize: 10, showPageInfo: true },
  className = "",
  rowClassName = "",
  onRowClick,
  scrollAreaHeight,
}: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const filteredData = useMemo(() => {
    let result = [...data];

    if (filters && Object.keys(filterValues).length > 0) {
      result = result.filter((row) => {
        return Object.entries(filterValues).every(
          ([filterKey, filterValue]) => {
            if (!filterValue || filterValue === "all") return true;
            const rowValue = String(
              row[filterKey as keyof T] || ""
            ).toLowerCase();
            return rowValue === filterValue.toLowerCase();
          }
        );
      });
    }

    if (
      searchConfig?.enabled &&
      searchTerm &&
      searchConfig.columns.length > 0
    ) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter((row) =>
        searchConfig.columns.some((column) => {
          const value = String(row[column] || "").toLowerCase();
          return value.includes(searchLower);
        })
      );
    }

    return result;
  }, [data, filterValues, searchTerm, searchConfig, filters]);

  const totalPages = pagination.enabled
    ? Math.ceil(filteredData.length / (pagination.pageSize || 10))
    : 1;

  const paginatedData = pagination.enabled
    ? filteredData.slice(
        (currentPage - 1) * (pagination.pageSize || 10),
        currentPage * (pagination.pageSize || 10)
      )
    : filteredData;

  React.useEffect(() => {
    setCurrentPage(1);
  }, [filterValues, searchTerm]);

  const handleFilterChange = (filterKey: string, value: string) => {
    setFilterValues((prev) => ({
      ...prev,
      [filterKey]: value,
    }));
  };

  const clearFilter = (filterKey: string) => {
    setFilterValues((prev) => {
      const newFilters = { ...prev };
      delete newFilters[filterKey];
      return newFilters;
    });
  };

  const showRoundedTopCorners = !filters?.enabled && !searchConfig?.enabled;

  const getColumnWidth = (column: TableColumn<T>) => {
    if (column.className) return column.className;

    const totalColumns = columns.length;
    if (totalColumns <= 4) return "25%";
    if (totalColumns <= 6) return "56.666%";
    return `${100 / totalColumns}%`;
  };

  return (
    <div className={className}>
      <TableFilters
        filters={filters?.filters}
        enabled={filters?.enabled}
        searchConfig={searchConfig}
        filterValues={filterValues}
        searchTerm={searchTerm}
        handleFilterChange={handleFilterChange}
        clearFilter={clearFilter}
        setSearchTerm={setSearchTerm}
      />
      
       {/* for tablet and mobile */}
      {isSmallScreen ? (
        <div
          className={`border border-charcoal overflow-hidden p-2 ${
            showRoundedTopCorners ? "rounded-xl" : "rounded-b-xl"
          }`}
        >
          <ScrollArea
            className={cn("overflow-auto overflowY", scrollAreaHeight)}
          >
            <div className="bg-white divide-y divide-charcoal">
              {paginatedData.map((row, rowIndex) => {
                const nameColumn = columns.find((col) => col.key === "name");
                const isExpanded = expandedRow === rowIndex;

                return (
                  <div key={rowIndex} className="w-full">
                    <div
                      className="flex justify-between items-center p-4 cursor-pointer"
                      onClick={() =>
                        setExpandedRow(isExpanded ? null : rowIndex)
                      }
                    >
                      <div className="font-medium">
                        {nameColumn?.render
                          ? nameColumn.render(
                              row[nameColumn.key],
                              row,
                              rowIndex
                            )
                          : String(row[nameColumn?.key || "name"] || "-")}
                      </div>

                      <MdArrowDropDown
                        className={cn(
                          "h-5 w-5 text-[#535151] border-2 rounded-full border-[#444444]",
                          isExpanded ? "rotate-180" : ""
                        )}
                      />
                    </div>

                    {isExpanded && (
                      <div className="px-4 pb-5 ">
                        <div className="flex flex-col gap-3">
                          {columns
                            .filter((col) => col.key !== "name")
                            .map((column) => (
                              <div
                                key={String(column.key)}
                                className={cn(
                                  "flex items-center justify-between border-b border-charcoal last:border-none",
                                  onRowClick
                                    ? "cursor-pointer hover:bg-gray-50"
                                    : ""
                                )}
                                onClick={() => onRowClick?.(row, rowIndex)}
                              >
                                <span className="text-sm font-medium text-charcoal uppercase">
                                  {column.header}
                                </span>
                                <div className="text-sm">
                                  {column.render
                                    ? column.render(
                                        row[column.key],
                                        row,
                                        rowIndex
                                      )
                                    : String(row[column.key] || "-")}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      ) : (
        <div
          className={`border border-charcoal overflow-hidden ${
            showRoundedTopCorners ? "rounded-xl" : "rounded-b-xl"
          }`}
        >
          {/* Fixed Header */}
          <div className="bg-gray-soft sticky top-0 z-10 pt-2 px-2">
            <table className="w-full table-fixed">
              <thead>
                <tr className="divide-x divide-charcoal">
                  {columns.map((column) => (
                    <th
                      key={String(column.key)}
                      className={cn(
                        "p-4 text-left text-base font-medium text-chacoal capitalize",
                        getColumnWidth(column)
                      )}
                    >
                      {column.header}
                    </th>
                  ))}
                </tr>
              </thead>
            </table>
          </div>

          {/* Scrollable Body */}
          <div className={cn("pb-2 mx-2", scrollAreaHeight)}>
            <table className="w-full table-fixed">
              <tbody className="bg-white divide-y divide-charcoal">
                {paginatedData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No data found
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className={cn(
                        rowClassName,
                        onRowClick ? "cursor-pointer hover:bg-gray-50" : ""
                      )}
                      onClick={() => onRowClick?.(row, rowIndex)}
                    >
                      {columns.map((column, colIndex) => (
                        <td
                          key={String(column.key)}
                          className={`py-4 px-4 text-sm text-charcoal truncate ${
                            colIndex < columns.length - 1
                              ? "border-r border-charcoal"
                              : ""
                          } ${getColumnWidth(column)}`}
                        >
                          {column.render
                            ? column.render(row[column.key], row, rowIndex)
                            : String(row[column.key] || "-")}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {pagination.enabled && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredData.length}
          pageSize={pagination.pageSize || 10}
          showPageInfo={pagination.showPageInfo || false}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}

export default Table;
