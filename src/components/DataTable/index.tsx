import React from "react";
import { Table } from "semantic-ui-react";

interface SortingProps {
  defaultSortBy: string,
  defaultSortAscending?: boolean
}

interface DataTableColumn {
  dataIndex: string,
  label?: string,
  render?: (props: any) => any,
  type?: (props: any) => any,

}

interface DataTableProps {
  data: Array<object>;
  keyField: string;
  sorting?: SortingProps,
  columns?: Array<DataTableColumn>
}

const DataTable = (props: DataTableProps) => {
  const { columns } = props
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          {columns && columns.map((column: DataTableColumn) => (
            <Table.HeaderCell>{column.label}</Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Test</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default DataTable;
