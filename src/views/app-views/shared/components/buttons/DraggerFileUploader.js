

import React, { useCallback, useEffect, useRef, useState } from "react";
import { message, Button } from "antd";
import Dragger from "antd/lib/upload/Dragger";
import PropTypes from "prop-types";
import { DownloadOutlined, InboxOutlined } from "@ant-design/icons";
import "./style.scss";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

/**
 * download cropped image
 * @param canvas
 * @param crop
 * @returns void
 */
const downloadCroppedImage = (canvas, crop, onFileChange, name = "banner") => {
  if (!crop || !canvas) {
    return;
  }

  canvas.toBlob(
    (blob) => {
      const croppedImage = new File(
        [blob],
        `${name}-${new Date().getTime()}.jpeg`,
        { lastModified: new Date(), type: "image/jpeg" }
      );
      onFileChange(croppedImage);
    },
    "image/jpeg",
    1
  );
};

export default function DraggerFileUploader(props) {
  const {
    text,
    subText,
    icon,
    iconClass,
    enableCrop = false,
    multiple = false,
    ratioValue,
  } = props;

  const [selectedImage, setSelectedImage] = useState(null);

  const [upImage, setUpImage] = useState();

  const [fileList, setFileList] = useState([]);

  /**
   * handle before upload
   * @param file selected file
   * @returns boolean
   */
  const beforeUpload = (file) => {
    const isPdfOrDocx =
      file.type === "application/pdf" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.type === "application/doc" ||
      file.type === "application/ms-doc" ||
      file.type === "application/msword" ||
      file.type === "image/jpeg" ||
      file.type === "image/png";
    const isImage =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/svg+xml";

    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      message.error("File must smaller than 5MB!");
      return true;
    }
    if (enableCrop) {
      if (!isImage) {
        message.error("Please Upload JPEG/PNG/SVG");
        return true;
      }
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImage(reader.result));
      reader.readAsDataURL(file);
      setSelectedImage(file);
      return false;
    } else {
      if (!isPdfOrDocx) {
        message.error("You can only upload Jpeg/PNG/Pdf/Docx/Doc file!");
        return true;
      }
      setFileList((prev) => [...prev, file]);
      props.onFileChange(file);
      return false;
    }
  };
  const onRemove = (file) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    return setFileList(newFileList);
  };

  const deleteBannerFunction = () => {
    try {
      // props.onFileChange(null);
      setSelectedImage(null);
      setUpImage();
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = () => {
    props.onFileChange(selectedImage);
  };
  const cropUI = (
    <>
      <img src={upImage} width="100%" />

      <div className="mt-4">
        <div className="mt-2">
          <Button
            type="secondary"
            onClick={uploadImage}
            icon={<DownloadOutlined />}
          >
            Upload Image
          </Button>
          <Button
            className="ml-3"
            type="primary"
            danger
            onClick={() => deleteBannerFunction()}
          >
            Clear
          </Button>
        </div>
      </div>
    </>
  );

  const uploadUI = (
    <Dragger
      name="file"
      multiple={multiple}
      beforeUpload={beforeUpload}
      onRemove={onRemove}
      fileList={fileList}
    >
      <p className="ant-upload-drag-icon">
        {icon ? icon : <InboxOutlined className={iconClass} />}
      </p>
      <p className="ant-upload-text">{text}</p>
      <p className="ant-upload-hint">{subText}</p>
    </Dragger>
  );

  return selectedImage && enableCrop === true ? cropUI : uploadUI;
}

DraggerFileUploader.propTypes = {
  text: PropTypes.string,
  subText: PropTypes.string,
  icon: PropTypes.element,
};

DraggerFileUploader.defaultProps = {
  text: "Click or drag file to this area to upload",
  subText:
    "Support for single file upload. Strictly prohibit from uploading company data or other band files",
};
