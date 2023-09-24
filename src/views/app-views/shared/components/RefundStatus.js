import { Tag } from 'antd';
import React from 'react';
import { RefundListStatus } from '../constants/table';

export function RefundStatus({ status }) {
  /**
   * get status of record with ui
   * @param status: status of record
   * @returns JSX.Element
   */
  const getTableRowStatus = (status) => {
    switch (status) {
      case RefundListStatus.PENDING:
        return (
          <Tag className='rounded' color='orange'>
            Pending
          </Tag>
        );
      case RefundListStatus.PROCESSING:
        return (
          <Tag className='rounded' color='blue'>
            Processing
          </Tag>
        );
      case RefundListStatus.APPROVED:
        return (
          <Tag className='rounded' color='green'>
            Approved
          </Tag>
        );
      case RefundListStatus.REJECTED:
        return (
          <Tag className='rounded' color='red'>
            Rejected
          </Tag>
        );
      case RefundListStatus.COMPLETED:
          return (
            <Tag className='rounded' color='black'>
              Completed
            </Tag>
          );
      default:
        return <Tag className='rounded'>Unknown Status</Tag>;
    }
  };

  return <>{getTableRowStatus(status)}</>;
}
