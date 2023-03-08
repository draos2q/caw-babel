import React from 'react';
import { Column, Table as ReactTable } from '@tanstack/react-table';
import { Input } from "@chakra-ui/react";

export function Filter({ column, table, }: { column: Column<any, any>; table: ReactTable<any>; }) {

    const firstValue = table
        .getPreFilteredRowModel()
        .flatRows[0]?.getValue(column.id);

    const columnFilterValue = column.getFilterValue();

    if (column.id === 'translated_value')
        return null;

    return typeof firstValue === 'number' ? (
        <div className="flex space-x-2">
            <Input
                type="number"
                value={(columnFilterValue as [number, number])?.[0] ?? ''}
                onChange={e => column.setFilterValue((old: [number, number]) => [
                    e.target.value,
                    old?.[1],
                ])}
                placeholder={`Min`}
                className="w-24 border shadow rounded" />
            <Input
                type="number"
                value={(columnFilterValue as [number, number])?.[1] ?? ''}
                onChange={e => column.setFilterValue((old: [number, number]) => [
                    old?.[0],
                    e.target.value,
                ])}
                placeholder={`Max`}
                className="w-24 border shadow rounded" />
        </div>
    ) : (
        <Input
            mt={2}
            type="text"
            value={(columnFilterValue ?? '') as string}
            onChange={e => column.setFilterValue(e.target.value)}
            placeholder={`Search...`}
            width="100%" />
    );
}
