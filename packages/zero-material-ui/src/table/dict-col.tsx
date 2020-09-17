import { Column } from 'material-table';

export const dictCol = (
  field: string,
  title: string,
  dict: Record<string, any>,
  options?: Column<any>
) => ({
  ...options,
  title,
  field,
  render: (rowData: any) =>
    rowData[field] != null
      ? dict[rowData[field]]
      : dict.hasOwnProperty('default')
      ? dict.default
      : null,
});
