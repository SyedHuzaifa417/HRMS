import React, { useState, useEffect, useMemo } from "react";
import {
  TableColumn,
  TableFilter,
} from "@/components/ui/shared/Table/types/types";
import { Button } from "@/components/ui/button";
import Table from "@/components/ui/shared/Table";
import FilterModal from "./components/FilterModal";
import { attendance } from "../../../tempData";
import moment from "moment";
import { MdOutlineSettings } from "react-icons/md";

const ManageWarningLog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [incidentFilters, setIncidentFilters] = useState<
    {
      type: string;
      threshold: number;
    }[]
  >([{ type: "", threshold: 0 }]);
  const [filteredData, setFilteredData] = useState<(typeof processedData)[0][]>(
    []
  );
  const [isFiltered, setIsFiltered] = useState(false);
  const [uniqueIncidentTypes, setUniqueIncidentTypes] = useState<string[]>([]);

  const processedData = useMemo(
    () =>
      attendance.map((item, index) => ({
        ...item,
        srNo: index + 1,
        warningContent: item.warningLetter?.content ?? "None",
        warningStatus: item.warningLetter?.status ?? "Not Issued",
      })),
    []
  );

  useEffect(() => {
    const types = new Set<string>();
    attendance.forEach((item) => {
      if (item.incidents) {
        item.incidents.forEach((incident) => {
          types.add(incident.type);
        });
      }
    });
    setUniqueIncidentTypes(Array.from(types));
  }, []);

  useEffect(() => {
    if (processedData.length > 0) {
      setFilteredData(processedData);
    }
  }, [processedData]);

  const WarningLogColumns: TableColumn<(typeof processedData)[0]>[] = [
    {
      key: "srNo",
      header: "Sr No.",
      className: "w-20",
      render: (_value, _row, index) => (
        <div>{String(index + 1).padStart(2, "0")}</div>
      ),
    },
    {
      key: "name",
      header: "employee",
      render: (value) => <div>{String(value)}</div>,
    },
    {
      key: "title",
      header: "Title",
      render: (value) => <div>{String(value)}</div>,
    },
    {
      key: "date",
      header: "Date",
      render: (value) => (
        <div>{moment(value as string).format("DD/MM/YY")}</div>
      ),
    },
    {
      key: "warningContent",
      header: "Warning Content",
      className: "w-56 max-xl:w-44",
      render: (value) => {
        return (
          <div className="text-blue-600 underline underline-offset-2 font-medium truncate overflow-hidden">
            {String(value)}
          </div>
        );
      },
    },
    {
      key: "warningStatus",
      header: "Warning Letter",
      render: (value) => {
        return <div>{String(value)}</div>;
      },
    },
  ];

  const createFilters = (data: (typeof processedData)[0][]): TableFilter[] => {
    const uniqueDesignation = [...new Set(data.map((item) => item.title))]
      .filter(Boolean)
      .map((item) => ({ value: item, label: item }));
    const uniqueDate = [...new Set(data.map((item) => item.date))]
      .filter(Boolean)
      .map((item) => ({ value: item, label: moment(item).format("DD/MM/YY") }));
    const uniqueLocation = [...new Set(data.map((item) => item.location))]
      .filter(Boolean)
      .map((item) => ({ value: item, label: item }));
    const uniqueDepartment = [...new Set(data.map((item) => item.department))]
      .filter(Boolean)
      .map((item) => ({ value: item, label: item }));
    return [
      {
        key: "title",
        label: "Designation",
        options: [...uniqueDesignation],
      },
      {
        key: "department",
        label: "Department",
        options: [...uniqueDepartment],
      },
      {
        key: "location",
        label: "Location",
        options: [...uniqueLocation],
      },
      {
        key: "date",
        label: "Date",
        options: [...uniqueDate],
      },
    ];
  };

  return (
    <>
      <div className="flex items-center justify-between px-3 py-6">
        <h2 className="text-2xl font-semibold">Manage Employee Warning</h2>
        <Button
          variant={"ghost"}
          onClick={() => setIsModalOpen(true)}
          className="hover:bg-transparent cursor-pointer"
        >
          <MdOutlineSettings size={30} />
        </Button>
      </div>

      <Table<(typeof processedData)[0]>
        data={isFiltered ? filteredData : processedData}
        columns={WarningLogColumns}
        pagination={{
          enabled: true,
          pageSize: 9,
          showPageInfo: true,
        }}
        filters={{
          enabled: true,
          filters: createFilters(isFiltered ? filteredData : processedData),
        }}
        searchConfig={{ enabled: true, columns: ["name"] }}
        scrollAreaHeight="h-auto max-h-[560px]"
        className="mb-4"
      />

      <FilterModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          if (!isFiltered) {
            setIncidentFilters([{ type: "", threshold: 0 }]);
          }
        }}
        incidentFilters={incidentFilters}
        setIncidentFilters={setIncidentFilters}
        uniqueIncidentTypes={uniqueIncidentTypes}
        isFiltered={isFiltered}
        resetFilters={() => {
          setIncidentFilters([{ type: "", threshold: 0 }]);
          setFilteredData(processedData);
          setIsFiltered(false);
        }}
        applyFilters={() => {
          const validFilters = incidentFilters.filter(
            (filter) => filter.type && filter.threshold > 0
          );

          if (validFilters.length === 0) {
            setFilteredData(processedData);
            setIsFiltered(false);
            setIsModalOpen(false);
            return;
          }

          const filtered = processedData.filter((item) => {
            const attendanceItem = attendance.find((a) => a.id === item.id);
            if (!attendanceItem || !attendanceItem.incidents) return false;

            return validFilters.some((filter) => {
              const matchingIncidents = attendanceItem.incidents.filter(
                (incident) => incident.type === filter.type
              );
              return matchingIncidents.length >= filter.threshold;
            });
          });

          setFilteredData(filtered);
          setIsFiltered(true);
          setIsModalOpen(false);
        }}
      />
    </>
  );
};

export default ManageWarningLog;
