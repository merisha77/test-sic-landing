import React, { useState, useEffect } from "react";
import { Row, Col, Table } from "reactstrap";

import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Divider, Button, notification, Empty } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";
import APIServices from "src/apiUtils/APIServices";
import InputField from "src/pages/StudyInfoCentre/InputField";

const Document = ({ showDetail = true, onSkip }) => {
  const api = new APIServices("profile/client-document/");

  const [documents, setDocuments] = useState();
  const [showDocuments, setShowDocuments] = useState(showDetail);

  const submitHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    let isValid = true;
    let data = new FormData();
    Array.from(form.elements).forEach((a) => {
      if (a.checkValidity()) {
        if (!!a.id) {
          if (a.type === "file") {
            data.set(a.id, a.files[0]);
          } else data.set(a.id, a.value);
        }
      } else isValid = false;
    });
    if (!!isValid) onCreate(data);
  };

  const onCreate = async (data) => {
    const { success } = await api.post(data);
    if (success) {
      notification.success({ message: "Document created successfully!" });
      setShowDocuments(true);
      fetchDocument();
    } else {
      notification.error({ message: "Could not create new document." });
    }
  };

  const onDelete = async (id) => {
    const { success } = await api.delete(id);
    if (success) {
      notification.success({ message: "Document deleted successfully!" });
      setShowDocuments(true);
    } else {
      notification.error({ message: "Could not delete document." });
    }
  };

  const fetchDocument = async (_) => {
    const { data, success } = await api.get();
    if (success) setDocuments(data);
  };

  useEffect(() => {
    fetchDocument();
  }, []);

  useEffect(() => {
    if (!showDetail && documents?.length) onSkip();
  }, [documents]);

  return (
    <Row>
      <Col lg="12" className="mt-4">
        <span className="justify-content-space-between">
          <h5>Documents :</h5>
          {showDetail ? (
            <Button
              className={!!showDocuments ? "btn-primary" : "btn-secondary"}
              type={!!showDocuments ? "primary" : "danger"}
              onClick={() => setShowDocuments(!showDocuments)}
            >
              &nbsp; {!!showDocuments ? "Add Document" : "Hide Form"}
            </Button>
          ) : null}
        </span>
        {showDocuments ? (
          documents?.length ? (
            <div className="table-responsive bg-white shadow">
              <Table className="mb-0 table-center">
                <thead>
                  <tr>
                    <th scope="col">File Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {documents?.map(({ file, file_name, id }, idx) => (
                    <tr key={`document-key-${idx}`}>
                      <td>{file_name}</td>
                      <td>
                        <a
                          href={file}
                          target="_blank"
                          className="ant-btn btn-primary"
                        >
                          <EyeOutlined style={{ fontSize: 20 }} /> Preview
                        </a>
                        &nbsp;
                        {/* <button
                        onClick={() => {
                          setDocument(document);
                          setShowDocuments(false);
                        }}
                        className="ant-btn btn-primary"
                      >
                        <EditOutlined style={{ fontSize: 20 }} /> Update
                      </button>
                      &nbsp; */}
                        <button
                          className="ant-btn btn-secondary"
                          onClick={() => onDelete(id)}
                        >
                          <DeleteOutlined style={{ fontSize: 20 }} /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <Empty />
          )
        ) : (
          <DocumentForm
            onBackClick={() => setShowDocuments(true)}
            onSubmit={submitHandler}
            data={document}
            onSkip={onSkip}
            list={documents?.map(({ file_name }) => file_name)}
            fetchDocuments={fetchDocument}
            showDetail={showDetail}
          />
        )}
      </Col>
    </Row>
  );
};

export default Document;

const DocumentForm = ({
  onBackClick,
  onSubmit,
  data,
  showDetail = true,
  onSkip,
  list
}) => {
  return (
    <div className="col col-sm-12">
      <form onSubmit={onSubmit}>
        <h6>Add Document</h6>
        <Row>
          {!!data?.id ? (
            <input id="id" value={data?.id || undefined} type="hidden" />
          ) : null}

          <InputField
            id="file_name"
            label="File Name"
            required
            list="names"
            defaultValue={data?.file_name || undefined}
          />
          <datalist id="names">
            {[
              "Passport",
              "10+2 Certificate",
              "Bachelor Certificate",
              "PCL/ Diploma Certificate",
              "English Language Test Certificate",
              "Character Certificate",
              "Other 1",
              "Other 2"
            ].map((a) =>
              list?.includes(a) ? null : (
                <option value={a} key={a}>
                  {a}
                </option>
              )
            )}
          </datalist>
          <InputField
            id="file"
            label="File"
            type="file"
            required
            defaultValue={data?.file || undefined}
          />
        </Row>

        <Divider />

        <div
          className={`pull-right ${
            showDetail ? "" : "d-flex justify-content-center align-items-center"
          }`}
          style={{ marginBottom: 16 }}
        >
          <button
            className={
              showDetail
                ? "ant-btn btn-primary pull-right"
                : "btn btn-secondary btn-lg"
            }
            name="submit-button"
            type="submit"
          >
            {showDetail ? (
              "Confirm"
            ) : (
              <>
                Save & Continue&nbsp;
                <DoubleRightOutlined size={15} />
              </>
            )}
            &nbsp;
          </button>
          &nbsp;
          {showDetail ? (
            <button
              className="ant-btn btn-secondary pull-right"
              onClick={onBackClick}
            >
              Cancel
            </button>
          ) : (
            <u
              className="text-info ml-5 f-400 h6"
              onClick={onSkip}
              type="button"
            >
              <strong>Skip</strong>
            </u>
          )}
        </div>
      </form>
    </div>
  );
};
