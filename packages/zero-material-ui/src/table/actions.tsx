import * as React from 'react';
import { UrlAction } from './url-action';
import styled from 'styled-components';

const ActionButton = styled.div`
  margin: ${props => props.theme.spacing(0, 1)};
`;

export const Actions: React.FC = (props: any) => {
  if (props.actions != null) {
    return props.actions.map((it: any, idx: number) => {
      const comp = (
        <props.components.Action
          action={typeof it === 'function' ? it(props.data) : it}
          data={props.data}
          size={props.size}
          disabled={props.disabled}
        />
      );
      const actionVal = typeof it.action === 'function' ? it.action(props.data) : it.action;
      return (
        <ActionButton key={'action-' + idx.toString()}>
          {actionVal != null && actionVal.url != null ? (
            <UrlAction url={actionVal.url} key={'urlaction-' + idx.toString()}>
              {comp}
            </UrlAction>
          ) : (
            comp
          )}
        </ActionButton>
      );
    });
  }
  return null;
};
