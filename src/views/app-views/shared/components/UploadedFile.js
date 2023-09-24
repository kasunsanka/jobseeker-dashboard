

import {
  DeleteOutlined,
  DownloadOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { Button, Divider, Image, Tooltip } from "antd";
import React from "react";

export default function UploadedFile({ files, ...props }) {
  /**
   * on file remove call this function
   * @param file: remove file
   * @return void
   */
  const onFileRemove = (file) => {
    props.onFileRemove(file);
  };

  // console.log(files);

  return (
    <div className="mt-2">
      {files && files.length
        ? files.map((file, index) => (
            <div className={"mb-2"} key={index}>
              {file?.header && <h5 className={"mb-2"}>{file?.header}</h5>}
              {file.type === "file" ? (
                <a href={file?.url} target="_blank">
                  <FileOutlined style={{ fontSize: "80px" }} />
                </a>
              ) : (
                <Image
                  width="100%"
                  className={file?.class}
                  style={{ border: "1px solid #ccc" }}
                  src={file?.url}
                />
              )}
              {/* <FileOutlined /> */}
              <div className="d-flex justify-content-center mt-3">
                <Tooltip title="Download this uploaded file">
                  <Button
                    type="default"
                    shape="circle"
                    icon={<DownloadOutlined style={{ marginTop: "10px" }} />}
                    href={file.url}
                    target={"_blank"}
                  />
                </Tooltip>
              </div>
              <Divider />
            </div>
          ))
        : "No Uploaded Files"}
    </div>
  );
}
