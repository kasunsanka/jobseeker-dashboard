import React from 'react';
import { DeleteOutlined, EyeOutlined, FileOutlined } from '@ant-design/icons';
import { Col, Row, Avatar, Button } from 'antd';
import { FileType } from '../../constants/file';
import './style.scss';

const IMAGE = FileType.IMAGE;
const AvatarButton = ({ link, type, onHandleAvatarBtnDelete }) => {
  return (
    <Row className='avatar-btn-main'>
      <div className='avatar-btn-overlay' />
      {type === IMAGE ? (
        <img className='avatar-btn-image' src={link} />
      ) : (
        <div className='avatar-file'>
          <FileOutlined className='avatar-btn-file' />
        </div>
      )}
      <Row gutter={8} className='avatar-action'>
        <Col>
          <Button
            icon={<EyeOutlined />}
            className='action-btn'
            href={link}
            target='_blank'
          />
        </Col>
        <Col>
          <Button
            icon={<DeleteOutlined style={{ color: 'red' }} />}
            className='action-btn btn-delete'
            onClick={onHandleAvatarBtnDelete}
          />
        </Col>
      </Row>
    </Row>
  );
};

export default AvatarButton;
