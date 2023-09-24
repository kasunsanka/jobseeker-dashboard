import {
  Col,
  Modal,
  Row,
  Form,
  message,
  Upload,
  Tabs,
  Button,
  Tag,
  Table,
} from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { DownloadOutlined, InboxOutlined } from "@ant-design/icons";
import { getSession } from "session/Session";

export default function BulkUploadModal({
  add,
  setadd,
  id,
  Add,
  passFunction,
  tabs,
}) {
  const [data, setData] = useState();
  const [hide, setHide] = useState(true);
  const { Dragger } = Upload;
  let history = useHistory();

  const onCancel = () => {
    setData();
    setHide(true);
    setadd(false);
    passFunction(1);
  };
  const onAdd = () => {
    Add(id);
    setadd(false);
    history.push(`/app/file/addlist`);
  };

  const onFileChange = (info) => {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
      setData(info.file.response);
      setHide(false);
    } else if (status === "error") {
      
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const tableColumns = [
    {
      title: "Row Number",
      dataIndex: "brandId",
      render: (_, record) => <p className="mb-0">{record?.raw}</p>,
    },
    {
      title: "Column Name",
      dataIndex: "brandId",
      render: (_, record) => <p className="mb-0">{record?.name}</p>,
    },
    {
      title: "Reason",
      dataIndex: "brandId",
      render: (_, record) => <p className="mb-0">{record?.reason}</p>,
    },
  ];

  return (
    <Modal
      centered
      open={add}
      onCancel={onCancel}
      width={800}
      closable={true}
      footer={null}
      destroyOnClose={true}
      maskClosable={false}
    >
      <Tabs>
        {tabs &&
          tabs.map((tab, index) => (
            <Tabs.TabPane tab={tab.name} key={index}>
              <Row className="mt-2 mr-3">
                <Col xs={24}>
                  <Form>
                    <Dragger
                      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      headers={{
                        Accept: "application/json",
                        "Access-Control-Allow-Origin": "*",
                        Authorization: "Bearer " + getSession(),
                      }}
                      className="my-2"
                      listType="text"
                      multiple={tab.multiple}
                      name={tab.fileName}
                      action={tab.UploadUrl}
                      onChange={onFileChange}
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Click or drag file to this area to upload
                      </p>
                      <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit
                        from uploading company data or other band files
                      </p>{" "}
                    </Dragger>
                  </Form>
                </Col>
              </Row>
              {hide === false ? (
                <Row gutter={16}>
                  <Col className="mt-2" xs={24}>
                    <Tag
                      style={
                        data?.failedArrayNames.length !== 0
                          ? { color: "red" }
                          : { color: "green" }
                      }
                      key={index}
                    >
                      {data?.successRate}
                    </Tag>
                    {data?.failedArrayNames.length !== 0 ? (
                      <Table
                        className="my-2"
                        scroll={{ y: 240 }}
                        pagination={false}
                        columns={tableColumns}
                        dataSource={data?.failedArrayNames}
                      />
                    ) : (
                      <div></div>
                    )}
                  </Col>
                </Row>
              ) : (
                <div></div>
              )}
              <Row className="mt-4" justify="space-between">
                <Col>{tab.helpText}</Col>
                <Col>
                  <Row>
                    <Col>
                      <Button
                        href={tab.externalUrl}
                        icon={<DownloadOutlined />}
                        type="primary"
                      >
                        {tab.btnSampleName}
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Tabs.TabPane>
          ))}
      </Tabs>
    </Modal>
  );
}
