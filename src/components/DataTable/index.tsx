import React, { useState } from "react";
import { Table } from "semantic-ui-react";

interface Map {
  [key: string]: any;
}
interface SortingProps {
  defaultSortIndex: string;
  sortDirection?: "ascending" | "descending";
}

interface ColumnBasics {
  label?: string;
}
interface ActionColumn extends ColumnBasics {
  action: (props: any) => JSX.Element;
}

interface DisplayColumn extends ColumnBasics {
  dataIndex: string;
  renderColumn?: (props: any) => JSX.Element;
  renderFull?: (props: any) => JSX.Element;
}

type Column = ActionColumn | DisplayColumn;

interface DataTableProps {
  data: Array<Map>;
  keyField: string;
  sort?: SortingProps;
  columns?: Array<Column>;
}

const DataTable = (props: DataTableProps) => {
  // Prop recovery
  let { data } = props;
  const { columns, sort } = props;

  // Sorting related code
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<
    "ascending" | "descending" | undefined
  >((sort && sort.sortDirection) || "ascending");

  data = sort // This should care about default sort direction and defaultSortIndex being defined
    ? data.sort(
        (a: Map, b: Map) => a[sort.defaultSortIndex] - b[sort.defaultSortIndex]
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
                  sort && "dataIndex" in column
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
                // Need to find better solution for keyƒ
                <Table.Cell key={"dataIndex" in column ? column.dataIndex : i}>
                  {"dataIndex" in column
                    ? column.renderColumn
                      ? column.renderColumn(datum[column.dataIndex])
                      : column.renderFull
                      ? column.renderFull(datum)
                      : datum[column.dataIndex]
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
