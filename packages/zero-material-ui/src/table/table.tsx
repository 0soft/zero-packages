import * as React from 'react';
import MaterialTable, { MaterialTableProps } from 'material-table';
import styled from 'styled-components';
import { Actions } from './actions';

const TableStyled = styled.div.attrs((props: any) => ({
  noPaper: false || props.noPaper,
}))`
  & > div {
    border-radius: 1rem;
    overflow: hidden;
    ${props => props.noPaper && 'box-shadow: none; border-radius: 0;'}
  }
`;

const defaultOptions = {
  search: false,
  paging: false,
  showTitle: false,
  toolbar: false,
};

interface OwnProps {
  t: any;
  noPaper?: boolean;
}

type Props = OwnProps & MaterialTableProps<any>;

export const Table: React.FC<Props> = ({ options, data, columns, noPaper, ...rest }) => {
  const opts = { ...defaultOptions, ...options };
  const components = { Actions };
  return (
    <TableStyled noPaper={noPaper}>
      <MaterialTable
        options={opts}
        columns={columns.slice(0).map(it => ({ ...it }))}
        data={Array.isArray(data) ? data.slice(0).map(it => ({ ...it })) : data}
        components={components}
        {...rest}
      />
    </TableStyled>
  );
};
