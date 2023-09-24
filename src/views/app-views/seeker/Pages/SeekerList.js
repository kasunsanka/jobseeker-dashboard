
import {Card, Form, Menu, Modal, Table, Tabs } from "antd";
import PageHeader from "components/shared-components/page-header/";
import ActionButtons from "views/app-views/shared/components/buttons/ActionButtons";
import TableActionBar from "views/app-views/shared/components/tables/TableActionBar";
import {
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { PageHeaderActions } from "views/app-views/shared/constants/page";
import { useHistory } from "react-router-dom";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import { TableRowActions } from "views/app-views/shared/constants/table";
import Flex from "components/shared-components/Flex";
import { useEffect, useState } from "react";
import { TableRowStatus } from "views/app-views/shared/components/Status";

const SectionList = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  useEffect(() => {
   // setLoading(true); // Set loading to true while fetching data
  
    // Fetch data from your API here and update the 'data' state
    fetch("http://localhost:8887/jobseekers/")
      .then((response) => response.json())
      .then((data) => {
        setData(data); // Update the 'data' state with fetched data
       // setLoading(false); // Set loading to false once data is loaded
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
       // setLoading(false); // Handle error and set loading to false
      });
  }, []); // Run this effect once when the component mounts

  



  
  console.log(data,"data;;;;;;;;;;;;;;;;;;;;;;;;;;")
  const pageHeaderActionButtons = [
    {
      class: "btn-action-primary mr-1 ml-2",
      icon: <PlusOutlined />,
      title: "Add New seeker",
      text: "Add New seeker",
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
      text: "Seecker List",
    },
  ];

  // generate table action bar dynamically
  const tableActionBarConfig = [
    {
      section: "field",
      type: "input",
      name: "name",
      action: "name",
      placeholder: "Name...",
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
      name: "status",
      placeholder: "Status...",
      options: [
        { text: "Active", value: "1" },
        { text: "Deactive", value: "0" },
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
                       <p className="mb-0">{record.id}</p>
              ),
            },
            {
              title: "Name",
              dataIndex: "section_name",
              render: (_, record) => <p className="mb-0">{record?.name}</p>,
            },
            {
              title: "Nic",
              dataIndex: "discription",
              render: (_, record) => <p className="mb-0">{record?.nic}</p>,
            },
            {
              title: "Email",
              dataIndex: "hub",
              render: (_, record) => <p className="mb-0">{record.email}</p>,
            },
            {
              title: "Mobile",
              dataIndex: "device",
              render: (_, record) => (
                <p className="mb-0">{record.mobile}</p>
              ),
            },
            {
                title: "consultant",
                dataIndex: "device",
                render: (_, record) => (
                  <p className="mb-0">{record?.consultantId}</p>
                ),
              },
              {
                title: "Status",
                dataIndex: "device",
                render: (_, record) => (
                    <TableRowStatus status={record.status && record.status} />
                ),
              },
              
              {
                title: "date",
                dataIndex: "device",
                render: (_, record) => (
                  <p className="mb-0">{record?.date}</p>
                ),
              },
              {
                title: "time",
                dataIndex: "device",
                render: (_, record) => (
                  <p className="mb-0">{record?.time}</p>
                ),
              },
              {
                title: "time",
                dataIndex: "device",
                render: (_, record) => (
                  <p className="mb-0">{record?.time}</p>
                ),
                
            
        
    
      title: "",
      dataIndex: "actions",
      render: (_, record) => (
        <div className="text-right">
          <EllipsisDropdown menu={dropdownMenu(record)} />
        </div>
      ),
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
          history.push(`app/edit/seeker/${data.id}`);
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

  const handleFilters = () => {
  };

  const handlePageHeaderAction = (action) => {
    switch (action) {
      case PageHeaderActions.ADD: {
        history.push(`/app/section/add`);
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
        title={"Seeker"}
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
              <Form>
                <TableActionBar
                  config={tableActionBarConfig}
                  triggerAction={handleTableActionBar}
                />
              </Form>
              <Table
                // pagination={pagination}
                columns={tableColumns}
                 dataSource={data}
                 //loadingStatus={loading}
                rowKey={"uuid"}
              />
            </Card>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};
export default SectionList;
