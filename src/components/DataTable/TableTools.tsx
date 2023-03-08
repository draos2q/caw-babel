import React from 'react';
import { Table as ReactTable } from '@tanstack/react-table';
import { Button, Select, Stack, Spacer } from "@chakra-ui/react";

export function TableTools({ table, refreshData }: { table: ReactTable<any>; refreshData: () => void; }) {

    const [showAllColumns, setShowAllColumns] = React.useState(false);

    return (
        <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={4} align="center"
        >
            <Stack direction="row" spacing={4} align="center">
                <Button
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<<'}
                </Button>
                <Button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<'}
                </Button>
                <Button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {'>'}
                </Button>
                <Button
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    {'>>'}
                </Button>
            </Stack>
            <Stack direction="row" spacing={4} align="center">
                <span className="flex items-center gap-1">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount()}
                    </strong>
                </span>
                <span className="flex items-center gap-1">
                    | Go to page:
                    <input
                        type="number"
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            table.setPageIndex(page);
                        }}
                        className="border p-1 rounded w-16" />
                </span>
            </Stack>
            <Spacer />
            <Stack direction="row" spacing={4} align="center">
                <Select
                    width={"-webkit-fit-content"}
                    value={table.getState().pagination.pageSize}
                    onChange={e => { table.setPageSize(Number(e.target.value)); }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </Select>
                <Button onClick={() => refreshData()}>Reset Data</Button>
            </Stack>
        </Stack>
    );
}
