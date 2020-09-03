import * as React from 'react';
import { Column } from 'material-table';
import { OptimizedImage } from '@0soft/optimized-image/src';

export const imgCol = (field: string, title: string, options?: Column<any>) => ({
  ...options,
  title,
  field,
  render: (rowData: any) =>
    rowData[field] != null ? (
      <OptimizedImage src={rowData[field]} width="168px" height="168px"></OptimizedImage>
    ) : null,
});
