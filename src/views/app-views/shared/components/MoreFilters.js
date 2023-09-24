import {
  Form,
  Input,
  Col,
  Select,
  Drawer,
  Button,
  Row,
  Radio,
  InputNumber,
} from "antd";
import React from "react";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";

export default function MoreFilter(props) {
  const { title, elements, visible, onClose, form, onSubmit } = props;

  const onChange = (element, event) => {
    if (element.listenOnChange) {
      props.onChange(element, event);
    }
  };

  const cardUI =
    elements &&
    elements?.map((element, index) => {
      const xs = { span: 24 };
      const sm = { span: 24 };
      const md = { span: 24 };
      const lg = { span: 24 };
      const key = element.key ? element.key : index;

      switch (element.type) {
        case "input":
          return (
            <Col xs={xs} sm={sm} md={md} lg={lg}>
              <Form.Item
                key={index}
                name={element?.name}
                label={element?.label}
                labelCol={element.labelCol}
                wrapperCol={element.wrapperCol}
              >
                <Input
                  placeholder={element?.placeholder}
                  prefix={element?.prefix}
                />
              </Form.Item>
            </Col>
          );

        case "select":
          return (
            //   <Row gutter={18} align="middle">
            //   <Col>

            //       <UserOutlined
            //         style={{ color: "Red", fontSize: 18, marginRight: 8}}
            //       />

            //   </Col>
            //   <Col>
            //   <Form.Item
            //       key={index}
            //       name={element.name}
            //      // style={{marginTop : 25}}
            //      label={element.label}
            //       labelCol={element.labelCol}
            //       wrapperCol={element.wrapperCol}
            //     >

            //       <Select
            //        showSearch
            //         className="w-100"
            //         placeholder={element.placeholder}
            //         onChange={(e) => onChange(element, e)}
            //       >
            //         {element &&
            //           element.options &&
            //           element.options.map((option, index) => (
            //             <Select.Option key={index} value={option.value}>
            //               {option.text}
            //             </Select.Option>
            //           ))}
            //       </Select>
            //     </Form.Item>
            //   </Col>
            // </Row>
            <Col xs={xs} sm={sm} md={md} lg={lg}>
              {/* <span>
                <UserOutlined
                  style={{ color: "red", fontSize: 18, marginRight: 10 }}
                />
              </span> */}
              <Form.Item
                key={index}
                name={element.name}
                label={element.label}
                labelCol={element.labelCol}
                wrapperCol={element.wrapperCol}
              >
                <Select
                  showSearch
                  className="w-100"
                  placeholder={element.placeholder}
                  onChange={(e) => onChange(element, e)}
                  disabled={element.disabled}
                >
                  {element &&
                    element.options &&
                    element.options.map((option, index) => (
                      <Select.Option key={index} value={option.value}>
                        {option.text}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          );
        case "radio":
          return (
            <Col key={key} xs={xs} sm={sm} md={md} lg={lg}>
              <Form.Item
                labelCol={element.labelCol}
                wrapperCol={element.wrapperCol}
                name={element.name}
                label={element.label}
                hidden={element.canDisplay === false}
                extra={element.hint}
                fieldKey={element.fieldKey}
              >
                <Radio.Group
                  //  onChange={(e) => props.onChange(element.name, e.target)}
                  onChange={(e) => onChange(element, e)}
                >
                  {element &&
                    element.options &&
                    element.options.map((option, index) => (
                      <Radio
                        key={index}
                        value={option.value}
                        checked={option.checked}
                      >
                        {option.text}
                      </Radio>
                    ))}
                </Radio.Group>
              </Form.Item>
            </Col>
          );
        case "inputNumber": {
          return (
            <Col key={key} xs={xs} sm={sm} md={md} lg={lg}>
              {element.action && element.action}
              <Form.Item
                labelCol={element.labelCol}
                wrapperCol={element.wrapperCol}
                name={element.name}
                label={element.label}
                className={element.class}
                hidden={element.canDisplay === false}
                extra={element.hint}
                fieldKey={element.fieldKey}
              >
                <InputNumber
                  placeholder={"Min"}
                  formatter={element.formatter1}
                  parser={element.parser1}
                  max={element.max1}
                  min={0}
                  style={{ width: element.width1 }}
                />

                <InputNumber
                  placeholder={"Max"}
                  formatter={element.formatter2}
                  parser={element.parser2}
                  max={element.max2}
                  min={0}
                  style={{ width: element.width2 }}
                />
              </Form.Item>
            </Col>
          );
        }

        default:
          return null;
      }
    });

  return (
    <Drawer
      width={350}
      open={visible}
      onClose={onClose}
      placement="right"
      closable={false}
      title={title}
      drawerStyle={{ backgroundColor: "#FAFAFB" }}
      footer={
        <div
          style={{
            bottom: 0,
            width: "100%",
            padding: "10px 16px",
            textAlign: "right",
            left: 0,
          }}
        >
          <Button
            onClick={onClose}
            style={{
              width: "100px",
              borderWidth: "1px",
              borderColor: "#000000",
              color: "#000000",
              marginRight: 8,
            }}
          >
            Cancel
          </Button>

          <Button
            type="primary"
            icon={<SearchOutlined />}
            style={{
              width: "100px",
            }}
            onClick={onSubmit}
          >
            Search
          </Button>
        </div>
      }
    >
      <Form form={form} name={"filter"} layout="vertical">
        <Row>{cardUI}</Row>
      </Form>
    </Drawer>
  );
}
