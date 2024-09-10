import usePagination from "@/hooks/usePagination";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

interface CustomPaginationProps {
  hasPrevious: () => boolean;
  hasNext: () => boolean;
  onPrevious: () => void;
  onNext: () => void;
  onClickPage: (page: number) => void;
  totalPage: number;
  rowPerPage: number;
  currentPage: number;
}
export default function CustomPagination({
  hasPrevious,
  hasNext,
  onPrevious,
  onNext,
  totalPage,
  rowPerPage,
  currentPage,
  onClickPage,
}: CustomPaginationProps) {
  const rangeList = usePagination({
    totalCount: totalPage,
    pageSize: rowPerPage,
    currentPage,
  });

  return (
    <Pagination>
      <PaginationContent>
        {hasPrevious() ? (
          <PaginationItem>
            <PaginationPrevious onClick={onPrevious} />
          </PaginationItem>
        ) : null}
        {rangeList?.map(
          (value: string | number | Array<number>, index: number) =>
            !Array.isArray(value) ? (
              <PaginationItem key={index}>
                <PaginationLink onClick={() => onClickPage(Number(value) - 1)}>
                  {value}
                </PaginationLink>
              </PaginationItem>
            ) : null
        )}
        {hasNext() ? (
          <PaginationItem>
            <PaginationNext onClick={onNext} />
          </PaginationItem>
        ) : null}
      </PaginationContent>
    </Pagination>
  );
}
