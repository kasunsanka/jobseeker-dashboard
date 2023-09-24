import React, { useEffect, useState } from "react";
import { Card, Col, Row, Tabs, Form, Input, message, Select, DatePicker } from "antd";
import PageHeader from "components/shared-components/page-header";
import ActionButtons from "../../shared/components/buttons/ActionButtons";
import { PageHeaderActions } from "views/app-views/shared/constants/page";
import GuidelinesCard from "views/app-views/shared/components/cards/GuidelinesCard";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const SeekerEdit = () => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [filter, setFilteredData] = useState([]);
  const [warrantyForm] = Form.useForm();
  let history = useHistory();
  let { id } = useParams();
  const [date1, setDate] = useState();



  const [jobSeekerData, setJobSeekerData] = useState({});
  // ... (other state variables)

  // Function to fetch job seeker data
  const fetchJobSeekerData = async () => {
    try {
      const response = await axios.get(`http://localhost:8887/jobseekers/${id}`);
      if (response.status === 200) {
        setJobSeekerData(response.data); // Assuming the API response is JSON
        setDate(response.data)
      }
    } catch (error) {
      console.error("Error fetching job seeker data:", error);
    }
  };

  useEffect(() => {
    // Fetch job seeker data when the component mounts
    fetchJobSeekerData();
  }, []);

  useEffect(() => {
    if (jobSeekerData) {
      const { name,email,nic ,mobile,role,date,time,consultantId} = jobSeekerData;
      warrantyForm.setFieldsValue({ name: name , email:email,nic:nic,mobile:mobile,role:role,});
      
    }
  });


  
 
    // Define a function to fetch filtered data when form values change
    const fetchFilteredData = async () => {
      try {

        // Build the URL with query parameters
        const apiUrl = `http://localhost:8887/availabilities/byDateAndTime?date=${jobSeekerData?.date}&time=${jobSeekerData?.time}`;

        // Make an API call to apiUrl
        const response = await axios.get(apiUrl);
        if (response.status === 200) {
          const data = response.data; // Assuming the API response is JSON
          setFilteredData(data); // Update the state with the filtered data
        }
      } catch (error) {
        console.error("Error fetching filtered data:", error);
      }
    };

    //fetchFilteredData(); // Call the fetchFilteredData function when the component mounts or when form values change
 
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
    }

    function handleChange(value) {
        fetchFilteredData();
      }
  console.log(filter,"SSSSSSSSSSSSSSSSS")
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
      loading: btnLoading,
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

  /**
   * handle action e.g: add new record, export data, etc...
   * @param data actionType: ActionTypes
   */
  const handleAction = (action) => {
    switch (action) {
      case PageHeaderActions.SAVE:
        setBtnLoading(true);
        return onWarrantySubmit();
      case PageHeaderActions.CANCEL: {
        warrantyForm.resetFields();
        history.push(`/app/warranty`);
        break;
      }
      default:
        break;
    }
  };

  const onWarrantySubmit = () => {
    warrantyForm
      .validateFields()
      .then((values) => {
        const { name } = values;
        const warrantyObj = {
          name: name,
        };
        // createWarranty(warrantyObj, history, message, setBtnLoading);
      })
      .catch((error) => {
        setBtnLoading(false);
        return error;
      });
  };

  return (
    <div>
      <PageHeader
        title={"Add Consultant"}
        action={
          <ActionButtons
            buttons={pageHeaderActionButtons}
            triggerAction={handleAction}
          />
        }
      />
      <div className="container">
        <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
          <Tabs.TabPane tab="General" key="1">
            <Row gutter={{ xs: 18, sm: 18, md: 18, lg: 18 }}>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 12 }}
                md={{ span: 16 }}
                lg={{ span: 18 }}
              >
                <Form form={warrantyForm}>
                  <Card title="Basic Info">
                    <Form.Item
                      name="name"
                      label="Name"
                      rules={rules.warrant_period}
                    >
                      <Input placeholder="Period" />
                    </Form.Item>

                    <Form.Item
                      name="email"
                      label="Email"
                      rules={rules.warrant_period}
                    >
                      <Input placeholder="Period" />
                    </Form.Item>

                    <Form.Item
                      name="mobile"
                      label="Mobile"
                      rules={rules.warrant_period}
                    >
                      <Input placeholder="Period" />
                    </Form.Item>

                    <Form.Item
                      name="nic"
                      label="Nic"
                      rules={rules.warrant_period}
                    >
                      <Input placeholder="Period" />
                    </Form.Item>

                    <Form.Item
                      name="role"
                      label="Excepted Job"
                      rules={rules.warrant_period}
                    >
                      <Select
                        defaultValue="softengineer"
                        //   onChange={handleChange}
                        options={[
                          {
                            value: "softengineer",
                            label: "Soft Engineer",
                          },
                          {
                            value: "qa",
                            label: "QA",
                          },
                          {
                            value: "ba",
                            label: "Bussiness Analyst",
                          },
                        ]}
                      />
                    </Form.Item>

                         <Col span="12" offset="0">
                  <Form.Item name="consultant" label="Consultant"
          rules={[
            {
              required: false,
              message: "Please Select Bank",
            },
          ]}
        >
          <Select onSelect={handleChange}>
           
          {getConsultantAllList(filter)?.map((item) => {
            return (
              <Select.Option key={item.id} value={item.id}>
                {item.text}
              </Select.Option>
            );
          })}
        </Select>
        </Form.Item>
                  </Col>
                    



                  </Card>
                </Form>
              </Col>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 12 }}
                md={{ span: 8 }}
                lg={{ span: 6 }}
              ></Col>
            </Row>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default SeekerEdit;



// import React, { useEffect, useState } from "react";
// import { Card, Col, Row, Tabs, Form, Input, message, Select, DatePicker } from "antd";
// import PageHeader from "components/shared-components/page-header";
// import ActionButtons from "../../shared/components/buttons/ActionButtons";
// import { PageHeaderActions } from "views/app-views/shared/constants/page";
// import GuidelinesCard from "views/app-views/shared/components/cards/GuidelinesCard";
// import { useHistory, useParams } from "react-router-dom";
// import axios from "axios";

// const SeekerEdit = () => {
//   const [btnLoading, setBtnLoading] = useState(false);
//   const [jobSeekerData, setJobSeekerData] = useState({});
//   const [consultantOptions, setConsultantOptions] = useState([]); // To store the consultant options
//   const [warrantyForm] = Form.useForm();
//   let history = useHistory();
//   let { id } = useParams();

//   // Function to fetch job seeker data
//   const fetchJobSeekerData = async () => {
//     try {
//       const response = await axios.get(`http://localhost:8887/jobseekers/${id}`);
//       if (response.status === 200) {
//         setJobSeekerData(response.data); // Assuming the API response is JSON
//       }
//     } catch (error) {
//       console.error("Error fetching job seeker data:", error);
//     }
//   };

//   // Function to fetch consultant options
//   const fetchConsultantOptions = async () => {
//     try {
//       const response = await axios.get("http://localhost:8887/consultants"); // Adjust the endpoint as per your API
//       if (response.status === 200) {
//         // Assuming the API response is an array of consultant objects with id and name properties
//         const consultants = response.data;
//         const options = consultants.map((consultant) => ({
//           value: consultant.id,
//           label: consultant.name,
//         }));
//         setConsultantOptions(options);
//       }
//     } catch (error) {
//       console.error("Error fetching consultant data:", error);
//     }
//   };

//   useEffect(() => {
//     // Fetch job seeker data when the component mounts
//     fetchJobSeekerData();
//     // Fetch consultant options when the component mounts
//     fetchConsultantOptions();
//   }, []);

//   // Function to handle the update of consultantId
//   const handleUpdateConsultantId = async (newConsultantId) => {
//     try {
//       // Make a PUT request to update the consultantId
//       const response = await axios.put(`http://localhost:8887/jobseekers/${id}`, {
//         consultantId: newConsultantId,
//       });

//       if (response.status === 200) {
//         // The update was successful
//         message.success("Consultant updated successfully.");
//         // You can optionally update the state or perform other actions here
//       } else {
//         // Handle other response statuses if needed
//         message.error("Failed to update consultant.");
//       }
//     } catch (error) {
//       // Handle any errors that occur during the update process
//       console.error("Error updating consultant:", error);
//       message.error("An error occurred while updating the consultant.");
//     }
//   };

//   // Function to handle form submission
//   const handleFormSubmit = async () => {
//     try {
//       const values = await warrantyForm.validateFields();
//       const { consultantId } = values;
//       setBtnLoading(true);
//       await handleUpdateConsultantId(consultantId);
//       setBtnLoading(false);
//     } catch (error) {
//       setBtnLoading(false);
//     }
//   };

//   return (
//     <div>
//       <PageHeader
//         title={"Update Consultant"}
//         action={
//           <ActionButtons
//             buttons={[
//               {
//                 text: "Cancel",
//                 title: "cancel",
//                 class: "btn-action-secondary mr-2",
//                 actionType: PageHeaderActions.CANCEL,
//               },
//               {
//                 text: "Save",
//                 title: "save",
//                 class: "btn-action-primary",
//                 loading: btnLoading,
//                 actionType: PageHeaderActions.SAVE,
//                 onClick: handleFormSubmit,
//               },
//             ]}
//           />
//         }
//       />
//       <div className="container">
//         <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
//           <Tabs.TabPane tab="General" key="1">
//             <Row gutter={{ xs: 18, sm: 18, md: 18, lg: 18 }}>
//               <Col
//                 xs={{ span: 24 }}
//                 sm={{ span: 12 }}
//                 md={{ span: 16 }}
//                 lg={{ span: 18 }}
//               >
//                 <Form form={warrantyForm}>
//                   <Card title="Basic Info">
//                     <Form.Item name="consultantId" label="Consultant">
//                       <Select options={consultantOptions} placeholder="Select a Consultant" />
//                     </Form.Item>
//                   </Card>
//                 </Form>
//               </Col>
//               <Col
//                 xs={{ span: 24 }}
//                 sm={{ span: 12 }}
//                 md={{ span: 8 }}
//                 lg={{ span: 6 }}
//               ></Col>
//             </Row>
//           </Tabs.TabPane>
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// export default SeekerEdit;
