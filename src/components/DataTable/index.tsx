import React, { useState } from "react";
import { Table } from "semantic-ui-react";

interface Map {
  [key: string]: any;
}
interface SortingProps {
  defaultSortBy: string;
  defaultSortAscending?: boolean;
}

interface DataTableColumn {
  dataIndex: string;
  label?: string;
  render?: (props: any) => any;
  type?: (props: any) => any;
}

interface DataTableProps {
  data: Array<Map>;
  keyField: string;
  sorting?: SortingProps;
  columns?: Array<DataTableColumn>;
}

const DataTable = (props: DataTableProps) => {
  // Prop recovery
  let { data } = props;
  const { columns, sorting } = props;

  // Sorting related code
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<
    "ascending" | "descending" | undefined
  >(sorting && sorting.defaultSortAscending ? "ascending" : "descending");

  data = sorting // This should care about default sort direction and defaultSortBy being defined
    ? data.sort(
        (a: Map, b: Map) => a[sorting.defaultSortBy] - b[sorting.defaultSortBy]
      )
    : data;

  const handleSort = (clickedColumn: string) => () => {
    if (clickedColumn !== sortColumn) {
      setSortColumn(clickedColumn);
      setSortDirection("ascending");
      data = data.sort((a: Map, b: Map) => a[clickedColumn] - b[clickedColumn]);
    }
    setSortDirection(
      sortDirection === "ascending" ? "descending" : "ascending"
    );
    data = data.reverse();
  };

  // Render
  return (
    <Table sortable>
      <Table.Header>
        <Table.Row>
          {columns &&
            columns.map((column: DataTableColumn) => (
              <Table.HeaderCell
                key={column.label}
                sorted={column.label === sortColumn ? sortDirection : undefined}
                onClick={sorting ? handleSort(column.dataIndex) : undefined}
              >
                {column.label}
              </Table.HeaderCell>
            ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((datum: Map) => (
          <Table.Row key={data.indexOf(datum)}>
            {columns &&
              columns.map((column: DataTableColumn) => (
                <Table.Cell key={column.dataIndex}>
                  {datum[column.dataIndex]}
                </Table.Cell>
              ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default DataTable;
