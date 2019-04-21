import React from "react";
import { Container, Header, Segment, Button } from "semantic-ui-react";
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
    label: "Price",
    renderFull: (datum: any) => <span>{datum.price}</span>
  },
  {
    dataIndex: "company",
    label: "Company",
    renderColumn: (companyName: string) => <strong>{companyName}</strong>
  },
  {
    action: (data: any) => (
      <Button
        content="Sale Price"
        onClick={() => window.alert(data.price / 2)}
      />
    )
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
          sort={{ defaultSortIndex: "name" }}
        />
      </Segment>
    </Container>
  );
};

export default App;
