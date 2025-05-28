import React from "react";
import { Search, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableFilter } from "../types/types";
import { MdArrowDropDown } from "react-icons/md";

interface TableFiltersProps {
  filters?: TableFilter[];
  enabled?: boolean;
  searchConfig?: {
    enabled: boolean;
    columns: string[] | (string | number | symbol)[];
  };
  filterValues: Record<string, string>;
  searchTerm: string;
  handleFilterChange: (filterKey: string, value: string) => void;
  clearFilter: (filterKey: string) => void;
  setSearchTerm: (term: string) => void;
}

const TableFilters: React.FC<TableFiltersProps> = ({
  filters,
  enabled = true,
  searchConfig,
  filterValues,
  searchTerm,
  handleFilterChange,
  clearFilter,
  setSearchTerm,
}) => {
  const showHeader = ((filters && filters.length > 0 && enabled) || searchConfig?.enabled);

  if (!showHeader) return null;

  return (
    <div className="bg-white p-4 border border-charcoal rounded-t-lg border-b-0 flex flex-wrap items-center justify-between gap-4 max-lg:justify-center">
      {filters && filters.length > 0 && enabled && (
        <div className="flex flex-wrap max-lg:gap-2 max-lg:justify-center gap-4">
          {filters.map((filter) => {
            const hasValue = filterValues[filter.key] && filterValues[filter.key] !== "all";
            
            return (
              <div key={filter.key} className="min-w-40 relative">
                <Select
                  value={filterValues[filter.key] || ""}
                  onValueChange={(value) => handleFilterChange(filter.key, value)}
                >
                  <SelectTrigger 
                    id={`filter-${filter.key}`} 
                    className="w-full bg-[#e9e9e9] gap-5 focus:ring-0 shadow-none [&>svg]:hidden pr-10"
                  >
                    <SelectValue 
                      placeholder={filter.label} 
                      className="text-charcoal"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All {filter.label}</SelectItem>
                    {filter.options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  {hasValue ? (
                    <X 
                      className="h-5 w-5 text-[#535151] rounded-full p-0.5 cursor-pointer pointer-events-auto" 
                      onClick={(e) => {
                        e.stopPropagation();
                        clearFilter(filter.key);
                      }}
                    />
                  ) : (
                    <MdArrowDropDown className="h-5 w-5 text-[#535151] border-2 rounded-full border-[#898989]" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {searchConfig?.enabled && (
        <div className="relative max-w-40">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-dark" />
          <input
            type="text"
            placeholder= "Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border bg-[#e9e9e9] pl-10 pr-4 py-2  focus:outline-none text-charcoal"
          />
        </div>
      )}
    </div>
  );
};

export default TableFilters;