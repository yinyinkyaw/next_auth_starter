"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useQueryState, parseAsInteger } from "nuqs";
import CustomPagination from "./pagination";
import { useRouter } from "next/navigation";

interface ServersidePagination {
  rowCount: number;
  manualPagination: true;
}

interface ClientSidePagination {
  rowCount?: never;
  manualPagination: false;
  pagination?: never;
  setPagination?: never;
}

type PaginationType = ServersidePagination | ClientSidePagination;

interface BaseDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  isError?: boolean;
}

type DataTableProps<TData, TValue> = BaseDataTableProps<TData, TValue> &
  PaginationType;

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  rowCount,
  manualPagination,
  isError,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(10));
  const [pagination, setPagination] = useState({
    pageIndex: page,
    pageSize: limit,
  });

  const paginationConfig = rowCount
    ? {
        state: { pagination },
        onPaginationChange: setPagination,
        getPaginationRowModel: getPaginationRowModel(),
      }
    : {};

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    autoResetPageIndex: false,
    manualPagination,
    rowCount,
    ...paginationConfig,
  });

  const currentPage = table.getState().pagination.pageIndex;

  useEffect(() => {
    if (manualPagination) {
      void router.push(`?page=${currentPage}&limit=${limit}`);
    }
  }, [router, currentPage, manualPagination, limit]);

  if (isError) {
    return <div>Something went wrong. Please try again</div>;
  }

  return (
    <div className="grid gap-y-3">
      <div className="w-full border rounded-md bg-background">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers?.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length > 0 ? (
              table.getRowModel().rows?.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No Result Found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <CustomPagination
        hasPrevious={() =>
          manualPagination ? page > 1 : table.getCanPreviousPage()
        }
        hasNext={() =>
          manualPagination
            ? page < table.getPageCount()
            : table.getCanNextPage()
        }
        totalPage={table.getPageCount()}
        rowPerPage={table.getState().pagination.pageSize}
        currentPage={table.getState().pagination.pageIndex}
        onPrevious={() => table.previousPage()}
        onNext={() => table.nextPage()}
        onClickPage={(page) => table.setPageIndex(page)}
      />
    </div>
  );
}
