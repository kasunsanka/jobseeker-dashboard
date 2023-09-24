import { Tag } from "antd";
import React from "react";
import { TableRowStatus as TableRowStatusType } from "../constants/table";

export function TableRowStatus({ status }) {
  /**
   * get status of record with ui
   * @param status: status of record
   * @returns JSX.Element
   */
  const getTableRowStatus = (status) => {
    switch (status) {
      case TableRowStatusType.ACTIVE:
        return (
          <Tag className="rounded" color="green">
            Active
          </Tag>
        );
      case TableRowStatusType.DEACTIVE:
        return (
          <Tag className="rounded" color="red">
            Deactive
          </Tag>
        );
      case TableRowStatusType.DRAFT:
        return (
          <Tag className="rounded" color="blue">
            Draft
          </Tag>
        );
      case TableRowStatusType.ACTIVATED:
        return (
          <Tag className="rounded" color="orange">
            Activated
          </Tag>
        );
      default:
        return <Tag className="rounded">Unknown Status</Tag>;
    }
  };

  return <>{getTableRowStatus(status)}</>;
}
