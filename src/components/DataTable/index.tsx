import React from 'react';
import { ColumnDef, useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, flexRender, SortingState, getSortedRowModel } from '@tanstack/react-table';
import { Table, Thead, Tbody, Tr, Th, Td, chakra, Stack } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";

import { Dictionary } from 'src/types';
import { useTranslationsStore } from 'src/store';

import { TableTools } from './TableTools';
import { Filter } from './Filter';
import { useSkipper } from './useSkipper';
import { defaultColumn } from './types';

export function DataTable() {

    const translations = useTranslationsStore(state => state.englishTranslations);

    const columns = React.useMemo<ColumnDef<Dictionary>[]>(
        () => [
            {
                header: 'ReadOnly Columns',
                footer: props => props.column.id,
                enableHiding: true,
                columns: [
                    {
                        accessorKey: 'group',
                        enableHiding: true,
                        enableSorting: true,
                        enableColumnFilter: true,
                        header: () => <span>Group</span>,
                        footer: props => props.column.id,
                    },
                    {
                        accessorFn: row => row.key,
                        id: 'key',
                        enableSorting: true,
                        enableColumnFilter: true,
                        header: () => <span>Key</span>,
                        footer: props => props.column.id,
                    },
                ],
            },
            {
                header: 'Translate',
                footer: props => props.column.id,
                columns: [
                    {
                        accessorKey: 'value',
                        enableSorting: true,
                        enableColumnFilter: true,
                        header: () => 'English Content',
                        footer: props => props.column.id,
                    },
                    {
                        accessorKey: 'translated_value',
                        enableSorting: true,
                        enableColumnFilter: true,
                        header: () => 'Content in your language',
                        footer: props => props.column.id,
                    },
                ],
            },
        ],
        []
    );

    const [data, setData] = React.useState(() => translations.diccionary);
    const refreshData = () => setData(() => translations.diccionary);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

    const table = useReactTable({
        data,
        columns,
        defaultColumn,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        autoResetPageIndex,

        meta: {
            updateData: (rowIndex, columnId, value) => {
                // Skip age index reset until after next rerender
                skipAutoResetPageIndex();
                setData(old => old.map((row, index) => {
                    if (index === rowIndex) {
                        return {
                            ...old[rowIndex]!,
                            [columnId]: value,
                        };
                    }
                    return row;
                })
                );
            },
        },
        debugTable: true,
        state: {
            sorting
        }
    });

    return (
        <div className="p-2">

            <Table
                variant='striped'
                colorScheme='gray'
                size={{ base: 'sm', md: 'md' }}
                scrollBehavior='auto'
            >
                <Thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                return (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div>
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {header.depth > 1 && (
                                                    <chakra.span pl="4">
                                                        {header.column.getIsSorted() === "desc" ? (
                                                            <TriangleDownIcon aria-label="sorted descending" onClick={header.column.getToggleSortingHandler()} />
                                                        ) : (
                                                            <TriangleUpIcon aria-label="sorted ascending" onClick={header.column.getToggleSortingHandler()} />
                                                        )}
                                                    </chakra.span>
                                                )}
                                                {header.column.getCanFilter() ? (
                                                    <div>
                                                        <Filter column={header.column} table={table} />
                                                    </div>
                                                ) : null}
                                            </div>
                                        )}
                                    </Th>
                                );
                            })}
                        </Tr>
                    ))}
                </Thead>
                <Tbody>
                    {table.getRowModel().rows.map(row => {
                        return (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map(cell => {
                                    return (
                                        <Td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </Td>
                                    );
                                })}
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
            <div className="h-2" />
            <TableTools table={table} refreshData={refreshData} />
        </div>
    );
}
