import React from 'react';
import { FileType } from '../constants/file';
import { FileImageOutlined, FileOutlined } from '@ant-design/icons';

const FileTypeStatus = ({ status }) => {
  switch (status) {
    case FileType.IMAGE:
      return <FileImageOutlined style={{ fontSize: '3.2rem' }} />;
    case FileType.FILE:
      return <FileOutlined style={{ fontSize: '3.2rem' }} />;
  }
};

export default FileTypeStatus;
