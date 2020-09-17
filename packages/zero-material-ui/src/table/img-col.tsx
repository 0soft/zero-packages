import * as React from 'react';
import { Column } from 'material-table';
import { OptimizedImage, OptimizedImageProps } from '@0soft/optimized-image';

export const imgCol = (
  field: string,
  title: string,
  imageOptions: Partial<OptimizedImageProps>,
  options?: Column<any>
) => ({
  ...options,
  title,
  field,
  render: (rowData: any) =>
    rowData[field] != null ? (
      <OptimizedImage src={rowData[field]} {...imageOptions}></OptimizedImage>
    ) : null,
});
