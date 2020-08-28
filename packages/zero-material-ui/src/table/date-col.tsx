import * as React from 'react';
import dayjs from 'dayjs';
import { Column } from 'material-table';

export const datetimeCol = (
  field: string,
  title: string,
  extra?: {
    format: string;
    parse?: string;
  },
  options?: Column<any> & { orderFields?: string[] }
) => ({
  ...options,
  title,
  field,
  render: (rowData: any) => (
    <span>
      {rowData[field] != null
        ? dayjs(rowData[field], extra?.parse).format(extra?.format || 'DD/MM/YYYY - HH:mm')
        : '-'}
    </span>
  ),
});
