import React, { useState, Fragment } from "react";
import { Icon, Table, Input, Segment } from "semantic-ui-react";
import common from "common-react";

console.log("common", common);

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
  actions: Array<(props: any) => JSX.Element>;
}

interface DisplayColumn extends ColumnBasics {
  label: string;
  dataIndex: string;
  renderColumn?: (props: any) => JSX.Element;
  renderFull?: (props: any) => JSX.Element;
  selectable?: boolean;
}

type Column = ActionColumn | DisplayColumn;

interface DataTableProps {
  data: Array<Map>;
  keyField: string;
  sort?: SortingProps;
  searchable?: boolean;
  columns?: Array<Column>;
}

const DataTable = (props: DataTableProps) => {
  // Prop recovery
  const { columns, data, searchable, sort } = props;

  // Sorting related code
  const [displayData, setDisplayData] = useState(
    sort
      ? [...data].sort(
          (a: Map, b: Map) =>
            a[sort.defaultSortIndex] - b[sort.defaultSortIndex]
        )
      : [...data]
  );
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<
    "ascending" | "descending" | undefined
  >((sort && sort.sortDirection) || "ascending");

  const handleSort = (clickedColumn: string) => () => {
    if (clickedColumn !== sortColumn) {
      setSortColumn(clickedColumn);
      setSortDirection("ascending");
      setDisplayData(
        displayData.sort(
          (a: Map, b: Map) => a[clickedColumn] - b[clickedColumn]
        )
      );
    }
    setSortDirection(
      sortDirection === "ascending" ? "descending" : "ascending"
    );
    setDisplayData(displayData.reverse());
  };

  // Search related code

  const handleSearch = (value: string | number) => {
    if (!value) return setDisplayData(data);
    console.log("value", value);
    setDisplayData(
      data.filter(datum =>
        Object.values(datum).some(datumValue => {
          return datumValue.toString().includes(value || datumValue === value);
        })
      )
    );
  };

  // Render
  return (
    <Fragment>
      {searchable && (
        // This handles search and pagination etc.
        <Segment basic style={{ justifyContent: "flex-end", display: "flex" }}>
          <Input
            placeholder="Search..."
            icon="search"
            onChange={(e, { value }) =>
              setTimeout(() => handleSearch(value), 300)
            }
          />
        </Segment>
      )}
      <Table sortable>
        <Table.Header>
          <Table.Row>
            {columns &&
              columns.map((column: Column) => (
                <Table.HeaderCell
                  key={column.label}
                  sorted={
                    "dataIndex" in column && column.dataIndex === sortColumn
                      ? sortDirection
                      : undefined
                  }
                  onClick={
                    sort && "dataIndex" in column
                      ? handleSort(column.dataIndex)
                      : undefined
                  }
                >
                  {column.label}

                  {sort &&
                    !("actions" in column) &&
                    column.dataIndex !== sortColumn && <Icon name={"sort"} />}
                </Table.HeaderCell>
              ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {displayData.map((datum: Map) => (
            <Table.Row key={data.indexOf(datum)}>
              {columns &&
                columns.map((column: Column, i) => (
                  // Need to find better solution for keyƒ
                  <Table.Cell
                    key={"dataIndex" in column ? column.dataIndex : i}
                    selectable={"selectable" in column && column.selectable}
                    collapsing={"actions" in column && true}
                  >
                    {"dataIndex" in column
                      ? column.renderColumn
                        ? column.renderColumn(datum[column.dataIndex])
                        : column.renderFull
                        ? column.renderFull(datum)
                        : datum[column.dataIndex]
                      : column.actions.map(action => action(datum))}
                  </Table.Cell>
                ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Fragment>
  );
};

export default DataTable;
