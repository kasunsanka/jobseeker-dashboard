export const TableRowActions = {
  VIEW_INFO: "view info",
  ACTIVE: "active",
  DEACTIVE: "deactive",
  EDIT: "edit",
  DELETE: "delete",
  PENDING: "pending",
  PROCESSING: "processing",
  APPROVED: "approved",
  REJECTED: "rejected",
  COMPLETED: "completed",
  READY: "ready",
  CANCEL: "cancel",
  READYTOSHIP: "ready to ship",
  DISPATCH: "dispatch",
  REFUND: "refund",
  DELIVERED: "delivered",
  MENU: "menu",
  PAYMENTREF: "paymentref",
  REFUNDREQ: "refundreq",
  PRINT:'print'
};

export const TableBulkActions = {
  DELETE: "delete",
  ACTIVATE: "activate",
  DEACTIVATE: "deactivate",
  EDIT: "edit",
  PENDING: "pending",
  PROCESSING: "processing",
  APPROVED: "approved",
  REJECTED: "rejected",
  COMPLETED: "completed",
};

// export const TableRowStatus = {
//   DEACTIVE: 0,
//   ACTIVE: 1,
//   DRAF: 3,
//   ACTIVATED: 4,
//   DEACTIVATED: 5,
//   UNKNOWN: 6,
// };

//PLEASE USE INTEGER INSTEAD OF STRING AFTER MERCHANT SERVICE FIXED THE THAT STATUS ISSUE
export const TableRowStatus = {
  ACTIVE: "1",
  DEACTIVE: "0",
  DRAFT: "2",
  ACTIVATED:"3",
  DEACTIVATED: "4",
  UNKNOWN: "5",
};

export const RefundListStatus = {
  PENDING: 0,
  PROCESSING: 1,
  APPROVED: 2,
  REJECTED: 3,
  COMPLETED: 4,
};

export const RefundTableBulkActions = {
  PENDING: "pending",
  PROCESSING: "processing",
  APPROVED: "approved",
  REJECTED: "rejected",
  COMPLETED: "completed",
  DELETED: "delete",
};
