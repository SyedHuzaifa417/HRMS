import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ResponsiveModal from "@/components/ui/shared/ResponsiveModal";
import { Plus, X } from "lucide-react";
import { Label } from "@/components/ui/label";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  incidentFilters: { type: string; threshold: number }[];
  setIncidentFilters: React.Dispatch<
    React.SetStateAction<{ type: string; threshold: number }[]>
  >;
  uniqueIncidentTypes: string[];
  applyFilters: () => void;
  resetFilters: () => void;
  isFiltered: boolean;
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  incidentFilters,
  setIncidentFilters,
  uniqueIncidentTypes,
  applyFilters,
  resetFilters,
  isFiltered,
}) => {
  const handleSelectOpen = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <ResponsiveModal
      open={isOpen}
      onOpenChange={() => {
        onClose();
      }}
      title=""
      description=""
      className="sm:max-w-[600px]"
    >
      <div className="space-y-4 py-2 pb-4">
        <div className="flex flex-col items-start gap-3 mb-7 text-charcoal">
          <h2 className="text-2xl font-semibold">Settings</h2>
          <p className="text-sm">
            Set up criteria for an employee getting flagged
          </p>
        </div>
        {incidentFilters.map((filter, index) => (
          <div key={index} className="flex gap-3 items-end">
            <div className="w-full">
              <Label className="text-base font-light pb-1">
                {" "}
                Type of incident
              </Label>
              <Select
                value={filter.type}
                onValueChange={(value) => {
                  const newFilters = [...incidentFilters];
                  newFilters[index].type = value;
                  setIncidentFilters(newFilters);
                }}
              >
                <SelectTrigger
                  onMouseDown={handleSelectOpen}
                  className="bg-[#e9e9e9] border border-gray-800 rounded-sm p-2 h-9"
                >
                  <SelectValue placeholder="Select incident type" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueIncidentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label className="text-base font-light pb-1"> Threshold</Label>
              <Input
                type="number"
                placeholder="Threshold"
                value={filter.threshold}
                onChange={(e) => {
                  const newFilters = [...incidentFilters];
                  newFilters[index].threshold = parseInt(e.target.value) || 0;
                  setIncidentFilters(newFilters);
                }}
                min={0}
                autoFocus={index === 0}
                className="bg-[#e9e9e9] border border-gray-800 rounded-sm p-2"
              />
            </div>
            {incidentFilters.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  const newFilters = [...incidentFilters];
                  newFilters.splice(index, 1);
                  setIncidentFilters(newFilters);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}

        {incidentFilters.length < 4 && (
          <Button
            type="button"
            variant="default"
            className="flex items-center gap-3  rounded-sm justify-self-end"
            onClick={() => {
              if (incidentFilters.length < 4) {
                setIncidentFilters([
                  ...incidentFilters,
                  { type: "", threshold: 0 },
                ]);
              }
            }}
          >
            Add Another
            <span className="bg-gray-lite rounded-full size-5 flex items-center justify-center">
              <Plus className=" h-4 w-4 text-charcoal" />
            </span>
          </Button>
        )}
        <div className="w-full flex justify-between items-end">
          {isFiltered && (
            <Button
              type="button"
              variant="default"
              className=" bg-gray-dark text-black font-normal text-base hover:bg-gray-soft"
              onClick={resetFilters}
            >
              Reset
            </Button>
          )}

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={applyFilters}>Apply</Button>
          </div>
        </div>
      </div>
    </ResponsiveModal>
  );
};

export default FilterModal;
