import {Card, Form, Menu, Modal, Table, Tabs } from "antd";
import PageHeader from "components/shared-components/page-header/";
import ActionButtons from "views/app-views/shared/components/buttons/ActionButtons";
import TableActionBar from "views/app-views/shared/components/tables/TableActionBar";
import {
  EditOutlined,
  SearchOutlined,
  PlusOutlined
} from "@ant-design/icons";
import { PageHeaderActions } from "views/app-views/shared/constants/page";
import { useHistory } from "react-router-dom";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import { TableRowActions } from "views/app-views/shared/constants/table";
import Flex from "components/shared-components/Flex";
import { useState } from "react";

const HubList = () => {
  const history = useHistory();
  const [filterForm] = Form.useForm();
  const[filteredData,setFilteredData]= useState();
  const pageHeaderActionButtons = [
    {
      class: "btn-action-primary mr-1 ml-2",
      icon: <PlusOutlined />,
      title: "Add New Section",
      text: "Add New Section",
      actionType: PageHeaderActions.ADD,
    },
  ];
  // breadcrumbs generate data
  const breadcrumbs = [
    {
      link: "/app/home",
      text: "Home",
    },
    {
      link: null,
      text: "Availability List",
    },
  ];

  // generate table action bar dynamically
  const tableActionBarConfig = [
    {
    
      type: "datepic",
      name: "date",
      action: "dateString",
      prefix: <SearchOutlined />,
      columnSize: {
        lg: 8,
        sm: 12,
        md: 10,
        xs: 12,
      },
    },
    {
      section: "field",
      type: "select",
      name: "time",
      placeholder: "time.....",
      options: [
        { text: "Morning", value: "morning" },
        { text: "Afternoon", value: "afternoon" },
        { text: "Evening", value: "evening" },
      ],
      columnSize: {
        lg: 8,
        sm: 12,
        md: 10,
        xs: 12,
      },
    },
    {
      section: "button",
      type: "button",
      name: "refresh",
      text: "Reset",
      class: "btn-action-secondary",
      icon: "",
      columnSize: {
        lg: 4,
        sm: 24,
        md: 4,
        xs: 24,
      },
    },
    {
      section: "button",
      type: "button",
      name: "search",
      text: "Search",
      class: "btn-action-secondary",
      icon: <SearchOutlined />,
      columnSize: {
        lg: 4,
        sm: 24,
        md: 4,
        xs: 24,
      },
    },
  ];
  // table columns definition
  const tableColumns = [
    {
      title: "#",
      dataIndex: "warrantyId",
      width: "5%",
      render: (_, record, index) => (
        <p>{record?.id}</p>
        // <p className="mb-0">{(page - 1) * 10 + (index + 1)}</p>
      ),
    },
    {
      title: "Available Date",
      dataIndex: "section_name",
      render: (_, record) => <p className="mb-0">{record?.date}</p>,
    },
    {
      title: "Time",
      dataIndex: "discription",
      render: (_, record) => <p className="mb-0">{record?.time}</p>,
    },
    {
      title: "consultant ID",
      dataIndex: "hub",
      render: (_, record) => <p className="mb-0">{record?.consultant?.id}</p>,
    },
    {
      title: "consultant name",
      dataIndex: "hub",
      render: (_, record) => <p className="mb-0">{record?.consultant?.name}</p>,
    },
    {
      title: "consultant name",
      dataIndex: "hub",
      render: (_, record) => <p className="mb-0">{record?.consultant?.mobile}</p>,
    },
    
  ];

  const handleTableRowAction = ({ data, action }) => {
    if (data) {
      switch (action) {
        case TableRowActions.ACTIVE: {
          const activateObj = { bulk: [data.uuid], status: 1 };
          //warrantyStatusChange(activateObj, message);
          break;
        }

        case TableRowActions.DEACTIVE: {
          const deactivateObj = { bulk: [data.uuid], status: 0 };
          // warrantyStatusChange(deactivateObj, message);
          break;
        }
        case TableRowActions.DELETE: {
          Modal.confirm({
            centered: true,
            title: "Delete",
            content: "Are you sure to delete this ?",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",

            onOk() {
              const arrID = { bulk: [data.uuid] };
              //   deleteWarranty(arrID, message);
            },
            onCancel() {
              console.log("Cancel");
            },
          });
          break;
        }
        case TableRowActions.EDIT: {
          history.push(`/app/warranty/edit/${data.uuid}`);
          break;
        }
        default:
          break;
      }
    }
  };

  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item
        onClick={() =>
          handleTableRowAction({ data: row, action: TableRowActions.EDIT })
        }
      >
        <Flex alignItems="center">
          <EditOutlined />
          <span className="ml-2">Edit</span>
        </Flex>
      </Menu.Item>
    </Menu>
  );

  const handleTableActionBar = (data) => {
    switch (data.action) {
      case "search":
        handleFilters();
        break;
      case "refresh":
        handleFilters(1, 0);

        break;

      default:
        return console.log(data);
    }
  };

  // const handleFilters = () => {
  //   filterForm.validateFields().then((values) => {
      
  //     const formattedDate = values.date.toISOString().split('T')[0];
    

  //     const filterd = {
  //       date:formattedDate,
  //       time:values.time
  //     };
     
  //   });
  // };
  const handleFilters = () => {
    filterForm.validateFields().then((values) => {
      const formattedDate = values.date.toISOString().split('T')[0];
      
      // Build the URL with query parameters
      const apiUrl = `http://localhost:8887/availabilities/byDateAndTime?date=${formattedDate}&time=${values.time}`;
      
      // Make an API call to apiUrl
      fetch(apiUrl, {
        method: 'GET', // Assuming you are making a GET request
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('API request failed');
          }
          return response.json(); // Parse the JSON response
        })
        .then((data) => {
          // Assuming you have a state variable to store the filtered data
          setFilteredData(data); // Update the state with the filtered data
        })
        .catch((error) => {
          console.error('Error fetching filtered data:', error);
        });
    });
  };
  

  const handlePageHeaderAction = (action) => {
    console.log(filteredData,"///////////////////////")
    switch (action) {
      case PageHeaderActions.ADD: {
        history.push(`/app/availability/add`);
        break;
      }
      case PageHeaderActions.EXPORT: {
        console.log("export");
        break;
      }
      case PageHeaderActions.UNDEFINED: {
        console.log("undefined");
        break;
      }
      default:
        break;
    }
  };

  const OnRowSelect = (selectedRows) => {
    const selected = [];
    selectedRows.map((item) => selected.push(item.uuid));
    // setSelectedRows(selected);
  };

  //pagination
  const onPageChange = (page) => {
    // getWarrantyList(page, filterObj);
  };

  //   const pagination = {
  //     pageSize: 10,
  //     total: total,
  //     current: page,
  //     showSizeChanger: false,
  //     showQuickJumper: false,
  //     onChange: onPageChange,
  //   };

  return (
    <div>
      <PageHeader
        title={"Availtability"}
        breadcrumbs={breadcrumbs}
        action={
          <ActionButtons
            buttons={pageHeaderActionButtons}
            triggerAction={handlePageHeaderAction}
          />
        }
      />
      <div className="container">
        <Tabs defaultActiveKey="1" style={{ marginTop: 51 }}>
          <Tabs.TabPane  key="1">
            {/* <AlertComp showMessage={showMessage} message={messageAlert} /> */}
            <Card>
              <Form  form={filterForm}>
                <TableActionBar
                  config={tableActionBarConfig}
                  triggerAction={handleTableActionBar}
                />
              </Form>
              <Table
                // pagination={pagination}
                columns={tableColumns}
                 dataSource={filteredData}
                // loadingStatus={loading}
                rowKey={"uuid"}
              />
            </Card>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};
export default HubList;
