import React, { useState } from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationsProps<T> {
    data: T[];
    itemsPerPage: number;
    children: (currentData: T[]) => React.ReactNode;
    dataLabel?: string;
}

const Paginations = <T,>({ 
    data, 
    itemsPerPage, 
    children, 
    dataLabel = "items" 
}: PaginationsProps<T>) => {
    const [currentPage, setCurrentPage] = useState(1);
    
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);
    
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    
    const getPageNumbers = () => {
        const pageNumbers: (number | 'ellipsis')[] = [];
        const maxVisiblePages = 5;
        
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('ellipsis');
                pageNumbers.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pageNumbers.push(1);
                pageNumbers.push('ellipsis');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pageNumbers.push(i);
                }
            } else {
                pageNumbers.push(1);
                pageNumbers.push('ellipsis');
                pageNumbers.push(currentPage - 1);
                pageNumbers.push(currentPage);
                pageNumbers.push(currentPage + 1);
                pageNumbers.push('ellipsis');
                pageNumbers.push(totalPages);
            }
        }
        
        return pageNumbers;
    };

    return (
        <div className="space-y-6">
           
            {children(currentData)}
            
            {totalPages > 1 && (
                <div className="flex justify-between items-center">
                    <div className="w-full text-sm text-muted-foreground">
                        Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of {data.length} {dataLabel}
                    </div>
                    
                    <Pagination className="justify-end">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>
                            
                            {getPageNumbers().map((pageNum, index) => (
                                <PaginationItem key={index}>
                                    {pageNum === 'ellipsis' ? (
                                        <PaginationEllipsis />
                                    ) : (
                                        <PaginationLink
                                            onClick={() => handlePageChange(pageNum)}
                                            isActive={currentPage === pageNum}
                                            className="cursor-pointer"
                                        >
                                            {pageNum}
                                        </PaginationLink>
                                    )}
                                </PaginationItem>
                            ))}
                            
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    );
};

export default Paginations;