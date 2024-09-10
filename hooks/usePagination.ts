import { useMemo } from "react";

interface Pagination {
  totalCount: number;
  pageSize: number;
  sliblingCount?: number;
  currentPage: number;
}
const usePagination = ({
  totalCount,
  pageSize,
  sliblingCount = 1,
  currentPage,
}: Pagination) => {
  const Range = (start: number, end: number) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, index) => index + start);
  };

  const DOTS = "...";

  const paginationRange = useMemo(() => {
    const totalPagesShow = sliblingCount + 5;

    if (totalPagesShow >= totalCount) {
      return Range(1, totalCount);
    }

    const leftSliblingIndex = Math.max(currentPage - sliblingCount, 1);
    const rightSliblingIndex = Math.min(
      currentPage + sliblingCount,
      totalCount
    );

    const shouldShowLeftDots = leftSliblingIndex > 2;
    const shouldShowRightDots = rightSliblingIndex < totalCount - 2;

    const firstIndex = 1;
    const lastIndex = totalCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftRage = Range(1, 3 + 2 * sliblingCount);
      return [...leftRage, DOTS, totalCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * sliblingCount;
      const rightRange = Range(totalCount - rightItemCount + 1, totalCount);
      return [firstIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Range(leftSliblingIndex, rightSliblingIndex);
      return [firstIndex, DOTS, middleRange, DOTS, lastIndex];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalCount, pageSize, sliblingCount, currentPage]);

  return paginationRange;
};

export default usePagination;
