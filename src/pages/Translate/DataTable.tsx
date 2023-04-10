import { TableVirtuoso } from "react-virtuoso";
import { Tr, Th, Td, useColorModeValue } from '@chakra-ui/react';

import { TableComponents } from 'src/components/Virtuoso'
import { Dictionary, Translation } from "src/types";
import EditableCell from './EditableCell';
import { EnglishContentCell } from "./EnglishContentCell";

export type EventLogModel = {
    id: string;
    date: Date;
    value: string;
    payload: any;
}

type Props = {
    data: Translation
}

export default function DataTable({ data }: Props) {

    const trBg = useColorModeValue('gray.200', 'gray.800');
    const { diccionary } = data;
    return (
        <TableVirtuoso
            style={{
                height: 'calc(100vh - 300px)',
            }}
            data={diccionary}
            overscan={200}
            components={TableComponents as any}
            fixedHeaderContent={() => (
                <Tr
                    bg={trBg}
                >
                    <Th w={60} textAlign="center" >#</Th>
                    <Th w={240} textAlign="center">Group</Th>
                    <Th w={240}>Key</Th>
                    <Th w={330}
                    >
                        English Content
                    </Th>
                    <Th
                        w="calc(100% - 600px)"
                        h={25}
                    >
                        Content in your Language
                    </Th>
                </Tr>
            )}
            itemContent={(index, log: Dictionary) => (
                <>
                    <Td w={60} textAlign="center" > {index + 1}</Td>
                    <Td w={240} textAlign="center" > {log.group} </Td>
                    <Td w={240} > {log.key} </Td>
                    <Td w={330}
                    >
                        <EnglishContentCell
                            value={log.value}
                            jsonKey={log.key}
                            jsonGroup={log.group}
                        />
                    </Td>
                    <Td
                        w="calc(100% -  600px)"
                        h={100}
                    >
                        <EditableCell
                            value={log.translated_value}
                            jsonKey={log.key}
                            jsonGroup={log.group}
                        />
                    </Td>
                </>
            )}
        />
    );
}


