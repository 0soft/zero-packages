import { Column } from 'material-table';

export const fnCol = (
  field: string,
  title: string,
  fn: (value: any, rowData: any) => any,
  options?: Column<any>
) => ({
  ...options,
  title,
  field,
  render: (rowData: any) => (rowData[field] != null ? fn(rowData[field], rowData) : null),
});
