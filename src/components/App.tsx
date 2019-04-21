import React from "react";
import { Container, Header, Segment } from "semantic-ui-react";
import DataTable from "./DataTable";

const data = [
  { name: "test", id: 1, price: 15, company: "KFD" },
  { name: "burger", id: 2, price: 2, company: "MCD" },
  { name: "burrito", id: 3, price: 7, company: "ABSURD BIRD" }
];

const columns = [
  {
    dataIndex: "name",
    label: "Name"
  },
  {
    dataIndex: "id",
    label: "Id"
  },
  {
    dataIndex: "price",
    label: "Price"
  },
  {
    dataIndex: "company",
    label: "Company"
  }
];

const App = (props: any) => {
  console.log("props in app", props);
  return (
    <Container>
      <Header as="h1" content="Hello Typescript" />
      <Segment>Hi</Segment>
      <Segment>
        <DataTable
          data={data}
          keyField="name"
          columns={columns}
          sorting={{ defaultSortBy: "name", defaultSortAscending: true }}
        />
      </Segment>
    </Container>
  );
};

export default App;
