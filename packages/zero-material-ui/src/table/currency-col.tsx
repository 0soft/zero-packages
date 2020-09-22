import { Column } from 'material-table';
import { formatter } from '@0soft/zero-lib';
import { fnCol } from './fn-col';

export const currencyCol = (
  field: string,
  title: string,
  options?: Column<any> & { helperText?: string | React.ReactNode }
) => fnCol(field, title, val => formatter.currency(val, 2, 2), options);
