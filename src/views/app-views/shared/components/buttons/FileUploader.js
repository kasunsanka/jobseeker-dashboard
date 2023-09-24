
import React, { useState } from "react";
import { Upload, message, Modal } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

export default function FileUploader(props) {
  const [state, setState] = useState({ loading: false });
  const [canShowUpload, setCanShowUpload] = useState(true);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const { text } = props;
  const { icon } = props;

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }

    const isLt2M = file.size / 1024 / 1024 < 5;

    if (!isLt2M) {
      message.error("Image must smaller than 5MB!");
    }

    props.onFileChange(file);

    return false;
  };

  const handleChange = (info) => {
    setCanShowUpload(!info.fileList.length);
  };

  const uploadButton = (
    <div>
      {state.loading ? <LoadingOutlined /> : icon ? icon : <PlusOutlined />}
      <div className="ant-upload-text">{text || "Upload"}</div>
      <div style={{ fontSize: "10px" }}>Max file size: 5MB</div>
      <div style={{ fontSize: "8px", letterSpacing:"0.3px" }}>File should be JPG/PNG</div>
    </div>
  );

  return (
    <>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={true}
        multiple={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        onPreview={handlePreview}
        // onRemove={}
      >
        {canShowUpload && uploadButton}
      </Upload>

      <Modal open={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
}
