import { Column } from 'material-table';
import { formatter } from '@0soft/zero-lib';
import { fnCol } from './fn-col';

export const phoneCol = (field: string, title: string, options?: Column<any>) =>
  fnCol(field, title, formatter.phone, options);
