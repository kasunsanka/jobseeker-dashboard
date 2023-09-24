
import { Checkbox, Dropdown, Table } from 'antd';
import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import Loading from 'components/shared-components/Loading';

const RadioTable = (props, ref) => {
  //props
  const {
    dataSource,
    loadingStatus,
    columns,
    bulkActionsMenu,
    scroll,
    pagination,
    rowKey,
  } = props;

  // states
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  // hooks
  useEffect(() => {
    props.triggerOnRowSelect(selectedRows);
  }, [selectedRows]);

  //call funtion from parent using ref
  useImperativeHandle(ref, () => ({
    onClear() {
      setSelectedRows([]);
      setSelectedRowKeys([]);
    },
  }));

  // variables
  const hasSelected = selectedRowKeys.length > 0;

  // clear on bulk drop down
  const onhandleCheckBox = () => {
    setSelectedRows([]);
    setSelectedRowKeys([]);
  };

  const onRowSelection = (key, rows) => {
    setSelectedRows(rows);
    setSelectedRowKeys(key);
  };

  return (
    <div className='table-responsive mt-2'>
      {columns && dataSource && (
        <Table
          pagination={pagination}
          columns={columns}
          dataSource={dataSource}
          scroll={scroll}
          rowKey={rowKey ? rowKey : '_id'}
          loading={{
            spinning: loadingStatus,
            indicator: <Loading cover='content' />,
          }}
          rowSelection={{
            selectedRowKeys: selectedRowKeys,
            type: 'radio',
            preserveSelectedRowKeys: false,
            onChange: onRowSelection,
          }}
        />
      )}
    </div>
  );
};

export default forwardRef(RadioTable);
