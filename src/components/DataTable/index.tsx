import React, { useState } from "react";
import { Table } from "semantic-ui-react";

interface Map {
  [key: string]: any;
}
interface SortingProps {
  defaultSortBy: string;
  defaultSortAscending?: boolean;
}

interface ColumnBasics {
  label?: string;
  renderColumn?: (props: any) => any;
  renderFull?: (props: any) => any;
}
interface ActionColumn extends ColumnBasics {
  action: (props: any) => any;
}

interface DisplayColumn extends ColumnBasics {
  dataIndex: string;
}

type Column = ActionColumn | DisplayColumn;

interface DataTableProps {
  data: Array<Map>;
  keyField: string;
  sorting?: SortingProps;
  columns?: Array<Column>;
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
            columns.map((column: Column) => (
              <Table.HeaderCell
                key={column.label}
                sorted={column.label === sortColumn ? sortDirection : undefined}
                onClick={
                  sorting && "dataIndex" in column
                    ? handleSort(column.dataIndex)
                    : undefined
                }
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
              columns.map((column: Column, i) => (
                <Table.Cell key={"dataIndex" in column ? column.dataIndex : i}>
                  {"dataIndex" in column
                    ? datum[column.dataIndex]
                    : column.action(datum)}
                </Table.Cell>
              ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default DataTable;
