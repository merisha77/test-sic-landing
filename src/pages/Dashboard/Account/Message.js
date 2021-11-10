import React from "react";
import { Row, Col, Table } from "reactstrap";
import { Empty } from "antd";

const Message = ({ messages = [] }) => (
  <Row>
    <Col lg="12" className="mt-4">
      <h5>Message :</h5>
      {messages?.length ? (
        <div className="table-responsive bg-white shadow">
          <Table className="mb-0 table-center">
            <thead>
              <tr>
                <th scope="col">Message</th>
                <th scope="col">Date</th>
                <th scope="col">Seen</th>
              </tr>
            </thead>
            <tbody>
              {messages?.map(({ message, is_read, created_at }, idx) => (
                <tr key={`message-key-${idx}`}>
                  <td>{message}</td>
                  <td>{created_at?.split("T")[0]}</td>
                  <td>{is_read ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <Empty />
      )}
    </Col>
  </Row>
);

export default Message;
