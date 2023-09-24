import { Modal, Button, Row, Col } from "antd";
import React from "react";
import axiosHttp from "http/axiosHttp";

export default function ExportModel(props) {
  const { add, setadd, buttons } = props;
  const onCancel = () => {
    setadd(false);
  };

  const footer = () => {
    return (
      <Row style={{ paddingTop: 5 }} justify="end">
        <Button onClick={onCancel}>Cancel</Button>
      </Row>
    );
  };
  const linkSubmitFunc = async (link, name) => {
    const passUrl = link;

    const data = await axiosHttp({
      url: `${passUrl}`,
      method: "GET",
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([data.data]));
    const link2 = document.createElement("a");
    link2.href = url;
    link2.setAttribute("download", `${name}.xlsx`);
    document.body.appendChild(link2);
    link2.click();
  };

  return (
    <Modal
      onCancel={onCancel}
      centered
      open={add}
      width={800}
      closable={false}
      footer={footer()}
      title="File Export"
    >
      <Row>
        {buttons &&
          buttons.map((button, index) => (
            <Col key={index} md={8} lg={8}>
              <Button
                style={{
                  paddingTop: "4.5px !important",
                }}
                htmlType="button"
                loading={button.loading}
                key={index}
                className={button.class}
                icon={button.icon}
                title={button.title}
                onClick={() => {
                  linkSubmitFunc(button.externalUrl, button.name);
                }}
              >
                {button.text}
              </Button>
            </Col>
          ))}
      </Row>
    </Modal>
  );
}
