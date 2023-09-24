import React from "react";
import { motion } from "framer-motion";
import { Alert } from "antd";
const AlertComp = ({ showMessage, message }) => {
  return (
    <motion.div
      hidden={showMessage ? false : true}
      initial={{ opacity: 0, marginBottom: 0 }}
      animate={{
        opacity: showMessage ? 1 : 0,
        marginBottom: showMessage ? 20 : 0,
      }}
    >
      <Alert type="error" showIcon message={message} />
    </motion.div>
  );
};

export default AlertComp;
