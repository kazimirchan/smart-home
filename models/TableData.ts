export interface TableColumnData {
    table: Array<string>
    data: Array<TableBodyData>
}

export interface TableBodyData {
    [key: string]: string | number | boolean
}