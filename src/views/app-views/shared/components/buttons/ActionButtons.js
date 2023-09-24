

import React from "react";
import { Button } from "antd";
import "./style.scss";

export default function ActionButtons(props) {
  const { buttons } = props;

  return (
    <>
      {buttons &&
        buttons.map((button, index) => (
          <Button
            disabled={button.disabled}
            htmlType="button"
            loading={button.loading}
            key={index}
            className={button.class}
            icon={button.icon}
            title={button.title}
            onClick={() => props.triggerAction(button.actionType)}
          >
            {button.text}
          </Button>
        ))}
    </>
  );
}
