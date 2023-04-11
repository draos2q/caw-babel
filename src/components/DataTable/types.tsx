import { useState, useEffect } from 'react'
import { ColumnDef, RowData } from '@tanstack/react-table'
import { Tooltip, Editable, EditablePreview, EditableTextarea, Text } from "@chakra-ui/react";

import { Dictionary } from 'src/types';

declare module '@tanstack/react-table' {
    //eslint-disable-next-line
    interface TableMeta<TData extends RowData> {
        updateData: (rowIndex: number, columnId: string, value: unknown) => void
    }
}

function truncate(str: string, length: number) {
    return str.length > length ? str.substring(0, length) + "..." : str
}

export const defaultColumn: Partial<ColumnDef<Dictionary>> = {

    cell: ({ getValue, row: { index }, column: { id }, table }) => {

        const initialValue = getValue()
        //eslint-disable-next-line
        const [value, setValue] = useState(initialValue)
        const onBlur = () => { table.options.meta?.updateData(index, id, value) }

        //eslint-disable-next-line
        useEffect(() => {
            setValue(initialValue)
        }, [initialValue])

        return (
            <Tooltip
                label={value as string}
                hasArrow
            >
                {id !== "translated_value" ?
                    <Text
                        as='h1'
                        size='4xl'
                        noOfLines={1}
                    >
                        {truncate(value as string, 100)}
                    </Text> :
                    <Editable
                        value={value as string}
                        placeholder='Enter your translation'
                        onChange={value => setValue(value)}
                        onBlur={onBlur}
                        sx={{
                            //add custom placeholder styles
                            "&::placeholder": {
                                color: "gray.100",
                                opacity: 1, // Override Firefox's unusual default opacity
                            },
                            //add custom styles for the editable preview
                            ".chakra-editable__preview": {
                                //add custom styles for the editable preview
                                fontWeight: value ? "bold" : "normal",
                                // fontSize: "2xl",
                                color: value ? "teal.900" : "gray.400",
                                lineHeight: "shorter",
                            },
                            //add custom styles for the editable input
                            ".chakra-editable__input": {
                                // fontWeight: "bold",
                                // fontSize: "2xl",
                                lineHeight: "shorter",
                            },
                        }}
                    >
                        <EditablePreview />
                        <EditableTextarea />
                    </Editable>
                    // <input
                    //     value={value as string}
                    //     readOnly={id !== "translated_value"}
                    //     placeholder={id === "translated_value" ? "Enter your translation" : ""}
                    //     onChange={e => setValue(e.target.value)}
                    //     onBlur={onBlur}
                    // />
                }
            </Tooltip>
        );
    },
}
