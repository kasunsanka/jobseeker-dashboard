

import {
  Card,
  Form,
  Input,
  Checkbox,
  Radio,
  Select,
  Col,
  Row,
  InputNumber,
  Spin,
  TreeSelect,
} from "antd";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import FileUploader from "../buttons/FileUploader";
import DraggerFileUploader from "../buttons/DraggerFileUploader";
import PropTypes from "prop-types";

export default function DynamicCard(props) {
  // props
  const { title, elements, withCard, topSection, option, showImage } = props;
  /**
   * on file change notify to subscribers
   * @param name field identifier
   * @param file selected file
   * @return void
   */
  const onFileChange = (name, file) => {
    props.onFileChange({
      name,
      file,
    });
  };

  /**
   * on change notify to subscribers
   * @param name field identifier
   * @param target element target
   * @return void
   */

  const onChange = (element, event) => {
    if (element.listenOnChange) {
      props.onChange(element, event);
    }
  };


  // generate UI based on array of configuration
  const cardUI =
    elements &&
    elements.map((element, index) => {
      const labelCol = element.labelCol ? element.labelCol : props.labelCol;
      const wrapperCol = element.wrapperCol
        ? element.wrapperCol
        : props.wrapperCol;
      const xs = element.xs ? element.xs : props.xs;
      const sm = element.sm ? element.sm : props.sm;
      const md = element.md ? element.md : props.md;
      const lg = element.lg ? element.lg : props.lg;
      const key = element.key ? element.key : index;

      switch (element.type) {
        case "input": {
          return (
            <Col key={key} xs={xs} sm={sm} md={md} lg={lg}>
              {element.action && element.action}
              <Form.Item
                labelCol={labelCol}
                wrapperCol={wrapperCol}
                name={element.name}
                label={element.label}
                rules={element.rules}
                className={element.class}
                hidden={element.canDisplay === false}
                extra={element.hint}
                fieldKey={element.fieldKey}
              >
                <Input
                  disabled={element.status}
                  placeholder={element.placeholder}
                  maxLength={element.maxLength}
                  addonBefore={element.addonBefore}
                />
              </Form.Item>
            </Col>
          );
        }
        case "inputNumber": {
          return (
            <Col key={key} xs={xs} sm={sm} md={md} lg={lg}>
              {element.action && element.action}
              <Form.Item
                labelCol={labelCol}
                wrapperCol={wrapperCol}
                name={element.name}
                label={element.label}
                rules={element.rules}
                className={element.class}
                hidden={element.canDisplay === false}
                extra={element.hint}
                fieldKey={element.fieldKey}
              >
                <InputNumber
                  placeholder={element.placeholder}
                  formatter={element.formatter}
                  parser={element.parser}
                  max={element.max}
                  min={element.min}
                  step={element.step}
                  precision={element.precision}
                  style={{ width: element.width }}
                />
              </Form.Item>
            </Col>
          );
        }
        case "inputTextArea": {
          return (
            <Col key={key} xs={xs} sm={sm} md={md} lg={lg}>
              <Form.Item
                labelCol={labelCol}
                wrapperCol={wrapperCol}
                name={element.name}
                label={element.label}
                rules={element.rules}
                className={element.class}
                hidden={element.canDisplay === false}
                extra={element.hint}
                fieldKey={element.fieldKey}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
          );
        }
        case "fileUploader":
          return (
            <Col key={key} xs={xs} sm={sm} md={md} lg={lg}>
              <Form.Item
                labelCol={labelCol}
                wrapperCol={wrapperCol}
                name={element.name}
                label={element.label}
                valuePropName="fileList"
                rules={element.rules}
                className={element.class}
                hidden={element.canDisplay === false}
                extra={element.hint}
                fieldKey={element.fieldKey}
              >
                <FileUploader
                  icon={
                    element.uploader && element.uploader.icon ? (
                      element.uploader.icon
                    ) : (
                      <PlusOutlined />
                    )
                  }
                  text={element.uploader && element.uploader.text}
                  onFileChange={(e) => onFileChange(element.name, e)}
                />
              </Form.Item>
            </Col>
          );

        case "draggerFileUploader":
          return (
            <Col key={key} xs={xs} sm={sm} md={md} lg={lg}>
              <Spin
                spinning={element.fileName === element.name && element.loading}
              >
                <Form.Item
                  labelCol={labelCol}
                  wrapperCol={wrapperCol}
                  name={element.name}
                  label={element.label}
                  valuePropName="fileList"
                  rules={element.rules}
                  className={element.class}
                  hidden={element.canDisplay === false}
                  extra={element.hint}
                  fieldKey={element.fieldKey}
                >
                  <DraggerFileUploader
                    ratioValue={element.ratioValue}
                    enableCrop={element.enableCrop}
                    iconClass="text-info"
                    onFileChange={(e) => onFileChange(element.name, e)}
                  />
                </Form.Item>
              </Spin>
            </Col>
          );

        case "select":
          return (
            <Col key={key} xs={xs} sm={sm} md={md} lg={lg}>
              <Row>
                <Col xs={element.isAction === true ? 22 : 24}>
                  <Form.Item
                    labelCol={labelCol}
                    wrapperCol={wrapperCol}
                    name={element.name}
                    label={element.label}
                    rules={element.rules}
                    className={element.class}
                    hidden={element.canDisplay === false}
                    extra={element.hint}
                    fieldKey={element.fieldKey}
                    initialValue={element.defaultValue}
                  >
                    <Select
                      defaultValue={element.defaultValue}
                      allowClear={true}
                      className="w-100"
                      mode={element.mode}
                      placeholder={element.placeholder}
                      onChange={(e) => onChange(element, e)}
                    >
                      {element &&
                        element.options &&
                        element.options.map((option, index) => (
                          <Select.Option
                            key={index}
                            value={option.value}
                            data-extra={option}
                          >
                            {option.text}
                          </Select.Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>
                {element.isAction === true ? (
                  <Col>{element.action && element.action}</Col>
                ) : (
                  ""
                )}
              </Row>
            </Col>
          );

        case "searchableSelect":
          return (
            <Col key={key} xs={xs} sm={sm} md={md} lg={lg}>
              <Form.Item
                labelCol={labelCol}
                wrapperCol={wrapperCol}
                name={element.name}
                label={element.label}
                rules={element.rules}
                className={element.class}
                hidden={element.canDisplay === false}
                extra={element.hint}
                fieldKey={element.fieldKey}
              >
                <Select
                  disabled={element.status}
                  showSearch
                  allowClear={true}
                  onChange={(e) => onChange(element, e)}
                  mode={element.mode}
                  placeholder={element.placeholder}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
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
                labelCol={labelCol}
                wrapperCol={wrapperCol}
                name={element.name}
                label={element.label}
                rules={element.rules}
                className={element.class}
                hidden={element.canDisplay === false}
                extra={element.hint}
                fieldKey={element.fieldKey}
              >
                <Radio.Group
                  disabled={element.radioDisable}
                  onChange={(e) => props.onChange(element.name, e.target)}
                  className={element.class}
                  value={element.defaultValue}
                  defaultValue={element.defaultValue2}
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
        case "checkbox":
          return (
            <Col key={key} xs={xs} sm={sm} md={md} lg={lg}>
              <Form.Item
                labelCol={labelCol}
                wrapperCol={
                  element.wrapperCol ? element.wrapperCol : wrapperCol
                }
                name={element.name}
                label={element.label}
                rules={element.rules}
                className={element.class}
                hidden={element.canDisplay === false}
                extra={element.hint}
                fieldKey={element.fieldKey}
              >
                <Checkbox
                  checked={element.isChecked}
                  onChange={(e) => props.onChange(element.name, e.target)}
                >
                  {element.text}
                </Checkbox>
              </Form.Item>
            </Col>
          );
        case "component":
          if (element.canDisplay === false) {
            return null;
          }

          return (
            element.component && (
              <Col key={key} xs={xs} sm={sm} md={md} lg={lg}>
                {element.component}
              </Col>
            )
          );

        case "tree":
          return (
            <Col key={key} xs={xs} sm={sm} md={md} lg={lg}>
              <Form.Item
                labelCol={labelCol}
                wrapperCol={wrapperCol}
                name={element.name}
                label={element.label}
                rules={element.rules}
                className={element.class}
                hidden={element.canDisplay === false}
                extra={element.hint}
                fieldKey={element.fieldKey}
              >
                <TreeSelect
                  disabled={element.status}
                  showSearch
                  allowClear={true}
                  multiple={element.mode}
                  treeDefaultExpandAll
                  treeData={element?.options}
                  placeholder="Please select"
                  filterTreeNode={(search, item) => {
                    return (
                      item.title.toLowerCase().indexOf(search.toLowerCase()) >=
                      0
                    );
                  }}
                />
              </Form.Item>
            </Col>
          );

        case "inputPrasentage": {
          return (
            <Col key={key} xs={xs} sm={sm} md={md} lg={lg}>
              {element.action && element.action}
              <Form.Item
                labelCol={labelCol}
                wrapperCol={wrapperCol}
                name={element.name}
                label={element.label}
                rules={element.rules}
                className={element.class}
                hidden={element.canDisplay === false}
                extra={element.hint}
                fieldKey={element.fieldKey}
              >
                <InputNumber
                  disabled={element.status}
                  placeholder={element.placeholder}
                  maxLength={element.maxLength}
                  formatter={element.formatter}
                  parser={element.parser}
                  max={element.max}
                  min={element.min}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          );
        }
        case "SearchListWithImg": {
          return (
            <Col key={key} xs={xs} sm={sm} md={md} lg={lg}>
              <Form.Item
                name={element.name}
                hidden={element.canDisplay === false}
                label={element.label}
                labelCol={labelCol}
                fieldKey={element.fieldKey}
                wrapperCol={wrapperCol}
                rules={element.rules}
              >
                <Select
                  allowClear={true}
                  mode={element.mode === true ? "tags" : ""}
                  showSearch
                  optionFilterProp="children"
                  filterOption={false}
                  placeholder={element.placeholder}
                  onSearch={element?.search}
                  notFoundContent={
                    element.options?.length === 0 ? "Not found" : ""
                  }
                >
                  {element?.options?.map((product) => {
                    return (
                      <Select.Option
                        key={product?._source?.id}
                        value={product?._source?.code}
                        label={product?._source?.name.substring(0, 30) + "..."}
                      >
                        {element.mode === true ? (
                          <span role="img" aria-label="China">
                            <img
                              src={product?._source?.image?.url}
                              className="mr-2"
                              width="25"
                              alt=""
                            />
                          </span>
                        ) : (
                          ""
                        )}
                        {product?._source?.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          );
        }
        case "helpTextWithSelect": {
          return (
            <Col key={key} xs={xs} sm={sm} md={md} lg={lg}>
              <Row>
                <Col xs={element.isAction === true ? 22 : 24}>
                  <Form.Item
                    labelCol={labelCol}
                    wrapperCol={wrapperCol}
                    name={element.name}
                    label={element.label}
                    rules={element.rules}
                    className={element.class}
                    hidden={element.canDisplay === false}
                    extra={element.hint}
                    fieldKey={element.fieldKey}
                    initialValue={element.defaultValue}
                    help={element.helpText}
                  >
                    <Select
                      defaultValue={element.defaultValue}
                      allowClear={true}
                      className="w-100"
                      mode={element.mode}
                      placeholder={element.placeholder}
                      onChange={(e) => onChange(element, e)}
                    >
                      {element &&
                        element.options &&
                        element.options.map((option, index) => (
                          <Select.Option
                            key={index}
                            value={option.value}
                            data-extra={option}
                          >
                            {option.text}
                          </Select.Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>
                {element.isAction === true ? (
                  <Col>{element.action && element.action}</Col>
                ) : (
                  ""
                )}
              </Row>
            </Col>
          );
        }

        default:
          return null;
      }
    });

  return (
    <>
      {withCard && (
        <Card title={title}>
          <Row gutter={16}>
            {topSection && topSection}
            {cardUI}
          </Row>
        </Card>
      )}
      {!withCard && (
        <>
          <Row gutter={16}>
            {topSection && topSection}
            {cardUI}
          </Row>
        </>
      )}
    </>
  );
}

DynamicCard.propTypes = {
  text: PropTypes.string,
  labelCol: PropTypes.object,
  wrapperCol: PropTypes.object,
  xs: PropTypes.object,
  sm: PropTypes.object,
  md: PropTypes.object,
  lg: PropTypes.object,
};

DynamicCard.defaultProps = {
  text: "Card Header",
  labelCol: { span: 4 },
  withCard: true,
  wrapperCol: { span: 20 },
  xs: { span: 24 },
  sm: { span: 24 },
  md: { span: 24 },
  lg: { span: 24 },
};
