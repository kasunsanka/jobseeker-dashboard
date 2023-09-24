import { Col, Row, Card, Avatar, Spin, Pagination, Button } from "antd";
import React, { useEffect } from "react";
import {
  PaperClipOutlined,
  ReloadOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import { useParams } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadLogHistory } from "../redux/actions/commonActions";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faPencilAlt,
  faTrash,
  faReceipt,
  faDownload,
  faDatabase,
  faExchangeAlt,
} from "@fortawesome/fontawesome-free-solid";

const LogHistory = (props) => {
  const { loadLogHistory, logHistoryLoading, logHistory, module, page, total } =
    props;
  const onChangePage = (page) => {
    loadLogHistory(page, module);
  };

  useEffect(() => {
    loadLogHistory(page, module);
  }, []);

  const refreshLogHistoryFunction = () => {
    loadLogHistory(page, module);
  };

  const timelineIconColor = (action) => {
    switch (action) {
      case "Create":
        return "ant-avatar-green";
      case "Created":
        return "ant-avatar-green";
      case "Update":
        return "ant-avatar-orange";
      case "Updated":
          return "ant-avatar-orange";
      case "Delete":
        return "ant-avatar-red";
      case "Deleted":
          return "ant-avatar-red";
      case "Status":
        return "ant-avatar-blue";
      case "Import":
        return "ant-avatar-magenta";
      case "Importd":
        return "ant-avatar-magenta";
      case "Export":
        return "ant-avatar-purple";
      case "Exported":
          return "ant-avatar-purple";
      default:
        return "ant-avatar-blue";
    }
  };

  const timelineIcon = (action) => {
    switch (action) {
      case "Create":
        return faPlusCircle;
      case "Update":
        return faPencilAlt;
      case "Updated":
          return faPencilAlt;
      case "Delete":
        return faTrash;
      case "Deleted":
          return faTrash;
      case "Status":
        return faExchangeAlt;
      case "Import":
        return faDatabase;
      case "Importe":
        return faDatabase;
      case "Export":
        return faDownload;
      case "Exported":
        return faDownload;
      default:
        return faReceipt;
    }
  };

  return (
    <>
      {logHistoryLoading === true ? (
        <Row justify="center" align="middle" style={{ height: "70vh" }}>
          <Spin
            spinning={logHistoryLoading}
            style={{ opacity: 1, color: "black" }}
            size={"large"}
          >
            <div></div>
          </Spin>
        </Row>
      ) : (
        <Row className="mt-3">
          <Col xs={24} sm={24} md={24} lg={24}>
            <Card
              extra={
                <Button
                  icon={<SyncOutlined />}
                  onClick={refreshLogHistoryFunction}
                />
              }
            >
              {logHistory?.map((log) => {
                return (
                  <>
                    <Row className="mt-1" justify="space-between">
                      <Flex>
                        <Avatar
                          className={timelineIconColor(log.actionType)}
                          size={35}
                        >
                          <FontAwesomeIcon
                            icon={timelineIcon(log.actionType)}
                          />
                        </Avatar>
                        <h5 className="ml-2">{log.action}</h5>
                        <h6>
                          <p className="ml-3">
                            {`${moment(log?.dateTime).format(
                              "DD MMM YYYY"
                            )}, ${moment(log?.dateTime).format("LT")}`}
                          </p>
                        </h6>
                      </Flex>

                      <h6>
                        <p style={{ color: "#4E89FF" }}>By {log?.actionBy}</p>
                      </h6>
                    </Row>

                    <Card style={{ marginLeft: "33px" }}>
                      <Row>
                        <h6>
                          <p>
                            {log.action} Using {log.module} Module By{" "}
                            {log.actionBy} -{" "}
                            {`${moment(log?.dateTime).format(
                              "DD MMM YYYY"
                            )}, ${moment(log?.dateTime).format("LT")}`}
                          </p>
                        </h6>
                      </Row>
                    </Card>
                  </>
                );
              })}
            </Card>
          </Col>
        </Row>
      )}
      <Row justify="end" className="mt-2">
        <Pagination
          pageSize={20}
          showQuickJumper
          defaultCurrent={1}
          current={page}
          total={total}
          onChange={onChangePage}
          showSizeChanger={false}
        />
      </Row>
    </>
  );
};

LogHistory.prototype = {
  loadLogHistory: PropTypes.func.isRequired,
  logHistory: PropTypes.object.isRequired,
  total: PropTypes.object.isRequired,
  page: PropTypes.object.isRequired,
  logHistoryLoading: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  console.log(state.common);
  return {
    total: state.common.total,
    page: state.common.page,
    logHistory: state.common.logHistory,
    logHistoryLoading: state.common.logHistoryLoading,
  };
};

export default connect(mapStateToProps, { loadLogHistory })(LogHistory);
