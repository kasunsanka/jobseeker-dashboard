import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Row,
  Tabs,
  Form,
  Input,
  message,
  Select,
  Space,
  DatePicker,
} from "antd";
import PageHeader from "components/shared-components/page-header";
import ActionButtons from "../../shared/components/buttons/ActionButtons";
import { PageHeaderActions } from "views/app-views/shared/constants/page";
import GuidelinesCard from "views/app-views/shared/components/cards/GuidelinesCard";
import AlertComp from "views/app-views/shared/components/alert/Alert";
import { useHistory } from "react-router-dom";
const AvailabilityAdd = (props) => {
  const { Option } = Select;
  const history = useHistory();
  const [warrantyForm] = Form.useForm();
  const [date1, setDate] = useState();
  const [time1, setTime] = useState();
  const [data1, setData] = useState();
  const dateFormat = "YYYY-MM-DD";
  // button generate info for action panel
  const pageHeaderActionButtons = [
    {
      text: "Cancel",
      title: "cancel",
      class: "btn-action-secondary mr-2",
      actionType: PageHeaderActions.CANCEL,
    },
    {
      text: "Save",
      title: "save",
      class: "btn-action-primary",
      //   loading: btnLoading,
      actionType: PageHeaderActions.SAVE,
    },
  ];

  const rules = {
    warrant_period: [
      {
        required: true,
        message: "Please enter warranty period",
      },
      {
        required: true,
        pattern: new RegExp("[a-zA-Z0-9s]+"),
        message: "Should be enter without white spaces and symbols",
      },
      {
        max: 255,
        message: "Not be allowed to enter more than 255 characters.",
      },
    ],
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  /**
   * handle action e.g: add new record, export data, etc...
   * @param data actionType: ActionTypes
   */
  const handleAction = (action) => {
    switch (action) {
      case PageHeaderActions.SAVE:
        //     setBtnLoading(true);
        return onWarrantySubmit();
      case PageHeaderActions.CANCEL: {
        history.push(`/app/section`);
        break;
      }
      default:
        break;
    }
  };
  useEffect(() => {
    
  
     fetch("http://localhost:8887/consultants")
       .then((response) => response.json())
       .then((data) => {
         setData(data); // Update the 'data' state with fetched data
        // setLoading(false); // Set loading to false once data is loaded
       })
       .catch((error) => {
         console.error("Error fetching data:", error);
        // setLoading(false); // Handle error and set loading to false
       });
   }, []); 

  const handleChange1 = (value) => {
    setTime(value?.value); // { key: "lucy", label: "Lucy (101)" }
  };
console.log(data1)
  const onWarrantySubmit = () => {
    warrantyForm
      .validateFields()
      .then((values) => {
        const { consultant } = values;
        const warrantyObj = {
      
          time: time1,
          date: date1,
          consultantId:consultant,
        };
        console.log(warrantyObj, "jjjjjjjjjjjjjjjjjjjjjjjj");
        // Make a POST request to your API endpoint
        fetch("http://localhost:8887/availabilities", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
           body: JSON.stringify(warrantyObj),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // Parse the response JSON
          })
          .then((data) => {
            // Handle the response data (e.g., show success message)
            console.log("Response:", data);
            message.success("Consultant created successfully");
            history.push(`/app/hubs`);
          })
          .catch((error) => {
            // Handle errors here (e.g., show error message)
            console.error("Fetch Error:", error);
            message.error("Failed to create consultant");
          });
      })
      .catch((error) => {
        // Handle form validation errors here (if any)
        console.error("Form Validation Error:", error);
        message.error("Please fill in all required fields");
      });
  };

  const getConsultantAllList = (state) => {
    const consut = [];
    state?.map((item) => {
      consut.push({
        id: item.id,
        text: item.name,
        value: item.id,
      });
    });
    return consut;
  };
  const onChange = (date, dateString) => {
    console.log(dateString);
    setDate(dateString);
    console.log(date, "KKKKKKKKKKKKKKKKK");
  };

  return (
    <div>
      <PageHeader
        title={"Create New Availability"}
        action={
          <ActionButtons
            buttons={pageHeaderActionButtons}
            triggerAction={handleAction}
          />
        }
      />
      <div className="container">
        <Tabs defaultActiveKey="1" style={{ marginTop: 50 }}>
          <Row gutter={{ xs: 18, sm: 18, md: 18, lg: 18 }}>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 24 }}
              lg={{ span: 24 }}
            >
              <Form form={warrantyForm}>
                <Card>
                  {/* {warrantyCreateState.messageAlert &&
                      warrantyCreateState.messageAlert?.map((item, index) => {
                        return (
                          <AlertComp
                            key={index}
                            showMessage={warrantyCreateState.showMessage}
                            message={item.msg}
                          />
                        );
                      })} */}
                  <Col span="12" offset="0">
                    <Form.Item
                      name="date"
                      label="date"
                      //rules={rules.warrant_period}
                    >
                      <DatePicker
                        format={"YYYY-MM-DD"}
                        onChange={(d, dString) => {
                          setDate(dString);
                        }}
                      />
                    </Form.Item>
                  </Col>
                
                  <Col span="12" offset="0">
                  <Form.Item name="consultant" label="Consultant"
          rules={[
            {
              required: false,
              message: "Please Select Bank",
            },
          ]}
        >
          <Select>
           
          {getConsultantAllList(data1)?.map((item) => {
            return (
              <Select.Option key={item.id} value={item.id}>
                {item.text}
              </Select.Option>
            );
          })}
        </Select>
        </Form.Item>
                  </Col>

                  <Col span="12" offset="0">
                    <Form.Item
                      name="time"
                      label="Time"
                      //  rules={rules.warrant_period}
                    >
                      <Select
                        labelInValue
                        style={{ width: 120 }}
                        onChange={handleChange1}
                      >
                        <Option value="morning">Morning</Option>
                        <Option value="afternoon">Afternoon</Option>
                        <Option value="evening">Evening</Option>
                      </Select>
                      ,
                    </Form.Item>
                  </Col>
                </Card>
              </Form>
            </Col>
          </Row>
        </Tabs>
      </div>
    </div>
  );
};

export default AvailabilityAdd;
