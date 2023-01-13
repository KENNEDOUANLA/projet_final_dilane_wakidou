import React from 'react';
declare type record = any;
export declare type RecordType = {
    title: string | HTMLElement;
    dataIndex?: string;
    key?: string;
    render?: () => HTMLElement | string;
    record?: record;
};
export declare type TableComponentProps = {
    columns: RecordType[];
    dataSource: record[];
};
declare const TableComponent: React.FC<TableComponentProps>;
export default TableComponent;
