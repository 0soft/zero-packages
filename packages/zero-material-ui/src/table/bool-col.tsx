import * as React from 'react';
import { Column } from 'material-table';

export const boolCol = (
  field: string,
  title: string,
  extra?: {
    msgTrue: string | React.ReactNode;
    msgFalse: string | React.ReactNode;
    msgNull?: string | React.ReactNode;
  },
  boolFn?: (rowData: any) => boolean,
  options?: Column<any> & { orderFields?: string[] }
) => ({
  ...options,
  title,
  field,
  render: (rowData: any) => {
    const val = boolFn != null ? boolFn(rowData) : rowData[field];
    let msg = extra?.msgNull != null && val == null ? extra.msgNull : null;
    if (msg == null) {
      msg = val != null && val ? extra?.msgTrue || 'Yes' : extra?.msgFalse || 'No';
    }
    return <span>{msg}</span>;
  },
});
