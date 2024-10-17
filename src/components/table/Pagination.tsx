import React from "react";
import {
  Pagination as PaginationBase,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
                                                        currentPage,
                                                        totalPages,
                                                        onPageChange,
                                                      }) => {
  const handlePrevious = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <PaginationBase>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={currentPage === 0 ? undefined : '#'}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage === 0) return;
              handlePrevious();
            }}
            aria-disabled={currentPage === 0}
            className={currentPage === 0 ? 'disabled' : ''}
          />
        </PaginationItem>

        {Array.from({ length: totalPages }).map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              href="#"
              isActive={index === currentPage}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(index);
              }}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {totalPages > 5 && currentPage < totalPages - 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            href={currentPage === totalPages - 1 ? undefined : '#'}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage === totalPages - 1) return;
              handleNext();
            }}
            aria-disabled={currentPage === totalPages - 1}
            className={currentPage === totalPages - 1 ? 'disabled' : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationBase>
  );
};
